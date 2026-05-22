# Contributing

Thanks for your interest in GhostDock. This is a small open-source project; contributions
and issues are welcome.

## Setup

See the [README](./README.md#local-development) for prerequisites and local setup. In
short: Node 24, pnpm 11, `pnpm install`, then copy `.env.example` to `.env.local` and fill
it in.

## Conventions

These are enforced by ESLint and Prettier — the pre-commit hook catches most issues.

- **Package manager:** pnpm only. Never `npm`.
- **Components** (`.tsx`): a named `function` declaration plus a separate `export default`
  at the end of the file. `export default function` is disallowed.
- **Non-component modules** (`.ts`): prefer arrow-function expressions for exports.
- **Class names:** compose with the `cn()` helper (`src/lib/utils/cn.ts`).
- **Imports:** ordered and grouped (enforced by `eslint-plugin-import`).
- **Comments:** sparingly — only where the code is genuinely non-obvious.

## Tests

Unit tests use Vitest and are co-located with their source in `__tests__/` folders. Run
them with `pnpm test`. New pure functions — especially in `src/lib/parse/` — should come
with tests.

## Before you push

The pre-commit hook runs `lint-staged` (ESLint + Prettier on changed files). CI
additionally runs `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm audit` — all must
pass.

## Pull requests

Branch off `main`, keep changes focused, and write clear, present-tense commit messages
(for example, `Add slug availability check`). Open the PR against `main`.
