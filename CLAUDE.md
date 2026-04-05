# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:4321)
npm run build    # Build for production (output: dist/)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

Commits must follow conventional commit format (`feat:`, `fix:`, `chore:`, etc.) — enforced by commitlint via Husky. The `npm run build` must pass before any deploy.

## Architecture

Personal portfolio — **single-page Astro 4** site with a dark/dev aesthetic. React is used only for interactive islands via `client:load`.

### Structure

- `src/layouts/Layout.astro` — root layout: SEO metadata, fonts, GTM, Background + Header islands, Footer slot.
- `src/pages/index.astro` — single page composing all sections in order: Hero → About → Skills → Experience → Projects → Contact.
- `src/pages/404.astro` — not-found page.
- `src/components/` — one directory per component. Static sections use `.astro` files; interactive ones use `.tsx` (React islands).
- `src/scss/` — `globals.scss` (imports + base styles), `_variables.scss` (design tokens + animation mixins), `_normalize.scss` (reset).
- `src/assets/img/` — project screenshots and CV photo.

### React Islands (client:load)

Only these components ship JS to the browser:
- `Header/Header.tsx` — scroll-aware sticky header.
- `Menu/Menu.tsx` — hamburger menu with `IntersectionObserver`-based active section tracking; nav links are `#anchor` links.
- `Background/Background.tsx` — floating SVG icon particles.
- `Hero/TerminalHero.tsx` — typed terminal animation sequence.

### Design Tokens (`_variables.scss`)

| Variable | Value | Use |
|---|---|---|
| `$bg-color` | `#0d1117` | page background |
| `$bg-surface` | `#161b22` | cards, terminal window |
| `$accent-green` | `#00e676` | primary accent, active states |
| `$accent-blue` | `#58a6ff` | secondary links |
| `$font-mono` | JetBrains Mono | labels, prompts, nav |

### Key Patterns

- **CSS Modules** — every component has a co-located `.module.scss` file.
- **`@import` SCSS** — `silenceDeprecations` is set in `astro.config.mjs`; migration to `@use` can happen incrementally.
- **Path alias** — `@/*` → `./src/*` (configured in both `tsconfig.json` and `astro.config.mjs` via Vite resolve alias).
- **Single-page navigation** — all nav links point to `#section-id` anchors; `html { scroll-behavior: smooth }` handles scrolling.
- **Content to personalize** — work history is in `src/components/Experience/Experience.astro`; bio text is in `src/components/About/About.astro`.
