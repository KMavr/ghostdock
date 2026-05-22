# Architecture

GhostDock turns a public GitHub repository into a polished landing page. This document
describes how the pieces fit together.

## Overview

A signed-in user pastes a GitHub URL on **The Dock** (`/dock`). GhostDock fetches and
parses the repo, stores the result, and lets the user edit and publish a public page at
`/p/<slug>`. Public pages are cached and revalidated on demand.

There is no AI. All content extraction is deterministic parsing — fast, predictable, and
cheap to run.

## Ingestion & parsing pipeline

This is the heart of the project. Source lives in `src/lib/github/` and `src/lib/parse/`.

### Ingestion — `src/lib/github/`

- `urls.ts` — validates a GitHub URL and extracts `{ owner, repo }`.
- `fetch.ts` — `fetchRepoData()` queries GitHub via Octokit for repo metadata, the
  README, and `package.json` in parallel (`Promise.allSettled`, so a missing
  `package.json` is not fatal). Failures surface as a typed `GithubFetchError`
  (`not_found` / `private` / `rate_limited` / `unknown`).
- `ingest.ts` — `ingestRepo()` orchestrates fetch → parse → database upsert, and resolves
  an available slug on first ingest.

### Parsing — `src/lib/parse/`

`parseRepoData()` (`index.ts`) composes four pure functions:

- `markdown.ts` — `parseMarkdown()` turns the README into an mdast tree (`unified` +
  `remark-parse` + `remark-gfm`).
- `sections.ts` — `parseSections()` walks the tree's top-level headings, matches each
  against alias lists (`Features`, `Installation`, `Usage`, `Contributing`), and collects
  the content under matched headings back into markdown strings.
- `tech.ts` + `known-packages.ts` — `parseTechStack()` maps `package.json` dependencies,
  GitHub topics, and the repo language to display names, sorts priority technologies
  first, de-duplicates, and falls back to the raw language when nothing else is found.
- `demo.ts` — `parseDemoUrl()` returns the repo homepage, or scans the README for a
  labeled live-demo link.

These functions are pure and have no I/O — which is why they carry the project's
unit-test coverage (see [Testing](#testing)).

## Data model

`src/lib/db/schema.ts` — two tables, Drizzle ORM on Neon Postgres.

- **`users`** — one row per Clerk user, provisioned by the Clerk webhook.
- **`projects`** — one row per imported repo. Each editable field exists as a **pair**:
  - `*Parsed` — the value produced by the pipeline. Regenerated on every re-fetch.
  - `*Override` — the user's manual edit. Preserved across re-fetches.

  The public page renders `override ?? parsed`, so re-importing a repo refreshes the
  source data without discarding the user's edits. A unique index on `(userId, repoUrl)`
  prevents importing the same repo twice.

### Reserved columns

`users.plan` and `users.stripeCustomerId` exist in the schema but are unused. They are a
deliberate, documented hook for a possible future paid tier; the current product has no
monetization.

## Rendering & caching

- `/dock/*` — the authenticated app. Server Components, with Server Actions for mutations
  (`updateProject`, `publishProject`, `checkSlugAvailability`).
- `/p/[slug]` — the public page. The project lookup is wrapped in `unstable_cache` (key
  `project-by-slug`), so published pages are served from cache. Publishing or updating a
  project calls `revalidatePath` to refresh the cached page on demand. Unpublished or
  missing slugs call `notFound()`.
- `/p/[slug]/opengraph-image.tsx` generates the social preview image.

## Dual-theme system

GhostDock runs two visually distinct surfaces from one stylesheet (`globals.css`):

- **`--gd-*`** — a dark "ghost-pirate" palette for `/dock` and marketing pages. This is
  GhostDock's own identity.
- **`--pp-*`** — a neutral, professional palette for public project pages (`/p/*`).
  Public pages carry no GhostDock branding — they belong to the developer whose project
  they present.

Public pages respect the visitor's light/dark preference. An inline script (`themeScript`)
reads the saved choice from `localStorage` and sets `data-pp-theme` before first paint,
avoiding a flash of the wrong theme.

## Auth

- Authentication is handled by **Clerk**. The middleware lives in `src/proxy.ts` (Next.js
  16's `proxy` convention) and protects every route under `/dock`.
- Sign-in and sign-up pages are in the `(auth)` route group.
- `src/app/api/webhooks/clerk/route.ts` receives Clerk's `user.created` webhook (verified
  with `svix`) and provisions a matching row in the `users` table.
- `getCurrentUser()` resolves the Clerk session to the local `users` row.

## Route-level UX

Each route segment ships `not-found` and `error` boundaries themed for its surface — dark
for `/dock` and the root, neutral for `/p/*`. `global-error.tsx` covers failures in the
root layout, and `/p/[slug]` has a loading skeleton. See
`src/app/**/{not-found,error,loading}.tsx`.

## Testing

`pnpm test` runs **Vitest**. Coverage focuses on the pure functions — the entire parsing
engine plus the `slug`, `cn`, and GitHub-URL utilities. Tests are co-located in
`__tests__/` folders. The impure layer (`fetch.ts`, `ingest.ts` — network and database
I/O) is left for a future integration-test pass.

## Supply-chain policy

`pnpm-workspace.yaml` sets `minimumReleaseAge`, so newly published package versions are
quarantined for 24 hours before they can be installed — a mitigation against compromised
releases. A small set of `overrides` pins transitive dependencies to patched versions for
known advisories. CI runs `pnpm audit`.

## CI

`.github/workflows/ci.yml` runs lint, type-check, tests, and the dependency audit on
every push and pull request. Production builds are handled by Vercel.
