# GhostDock

Turn any public GitHub repo into a clean, shareable product landing page — in seconds.

[![CI](https://github.com/KMavr/ghostdock/actions/workflows/ci.yml/badge.svg)](https://github.com/KMavr/ghostdock/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

GhostDock takes a public GitHub repository URL, reads its README and metadata, and
generates a polished public page at `/p/<slug>` — no configuration, no AI, no manual
content entry. Paste a URL, tweak a few fields, publish.

<!-- Add a screenshot at docs/screenshot.png and reference it here. -->

## How it works

The core of GhostDock is a deterministic parsing pipeline. There is no AI in the loop,
so the output is fast, predictable, and free to run:

1. **Ingest** — the repo URL is validated and GitHub is queried (via Octokit) for repo
   metadata, the README, and `package.json`.
2. **Parse to an AST** — the README markdown is parsed into an
   [mdast](https://github.com/syntax-tree/mdast) syntax tree with `unified` + `remark`.
3. **Extract sections** — headings are matched against known aliases (`Features`,
   `Installation`, `Usage`, …) and the content under each is collected back into markdown.
4. **Derive the tech stack** — dependencies from `package.json`, GitHub topics, and the
   repo's primary language are mapped to display names, prioritized, and de-duplicated.
5. **Find a demo link** — the repo homepage and README are scanned for a live demo URL.
6. **Render** — the parsed data (with any user overrides) is rendered as a themed public
   page with on-demand revalidation.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full design.

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4**
- **Drizzle ORM** + **Neon Postgres** (via the Vercel Marketplace)
- **Clerk** — authentication
- **Octokit** — GitHub API
- **unified / remark** — markdown AST parsing
- **Vitest** — unit testing
- Hosted on **Vercel**

## Local development

**Prerequisites:** Node 24 (see `.nvmrc`), pnpm 11.

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm db:push                 # apply the schema to your database
pnpm dev
```

The app runs at `http://localhost:3000`.

### Environment variables

Every variable is listed in [`.env.example`](./.env.example). You will need:

- A **Neon** Postgres database (`DATABASE_URL`)
- A **Clerk** application — publishable and secret keys, plus a webhook secret used to
  provision users
- A **GitHub** personal access token (`GITHUB_TOKEN`) for repo fetching — public read
  scope is enough

## Scripts

| Command          | Description                             |
| ---------------- | --------------------------------------- |
| `pnpm dev`       | Start the dev server                    |
| `pnpm build`     | Production build                        |
| `pnpm test`      | Run the unit tests                      |
| `pnpm typecheck` | Type-check without emitting             |
| `pnpm lint`      | Lint with ESLint                        |
| `pnpm db:push`   | Push the Drizzle schema to the database |
| `pnpm db:studio` | Open Drizzle Studio                     |

## Status

GhostDock is an open-source project built as a portfolio piece. It is deliberately
scoped to a free, single-purpose tool — there is no paid tier or monetization.
Contributions are welcome; see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) © 2026 Konstantinos Mavrikas
