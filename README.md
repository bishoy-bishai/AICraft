# AICraft

Landing page for AICraft — an AI engineering discipline for coding agents.
React + TypeScript + Tailwind CSS + shadcn, with a GSAP-driven interactive loop diagram.

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **shadcn** (`style: radix-nova`, base color `neutral`) — components live in `src/components/ui/`, shared utilities in `src/lib/` (the `cn` helper is in `src/lib/utils.ts`), config in `components.json`
- **GSAP** for the hover-driven loop-stage animation (`src/components/ui/loop-stack-interactor.tsx`)
- Path alias `@/*` → `src/*` (set in `tsconfig.app.json`, `tsconfig.node.json`, and `vite.config.ts`)

## Develop

```bash
npm install
npm run dev
```

## Add more shadcn components

```bash
npx shadcn@latest add <component>
```

They'll land in `src/components/ui/`, matching this project's existing setup — keep new UI components there so shadcn's CLI, the `@/components/ui` import alias, and `cn()` usage all stay consistent.

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main` via GitHub Actions.

1. Push this repo to GitHub.
2. In the repo settings → **Pages**, set **Source** to **GitHub Actions**.
3. If this is a *project* page (`username.github.io/repo-name`), edit `base` in `vite.config.ts` to `'/repo-name/'` before pushing. Leave it as `'/'` only for a user/org page (`username.github.io`).
