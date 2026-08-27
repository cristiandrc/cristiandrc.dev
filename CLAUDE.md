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

## Git Workflow

If the current branch is `main` (or `master`) when starting new work, create a new branch before making any changes. If already on a feature branch, continue working there.

Branch names must follow the pattern `<type>/<short-description>` using kebab-case, where `<type>` matches the conventional commit type:

| Type | When to use |
|---|---|
| `feat` | New feature or visible addition |
| `fix` | Bug fix |
| `chore` | Maintenance, config, dependencies |
| `refactor` | Code restructure with no behavior change |
| `style` | Visual/CSS-only changes |
| `docs` | Documentation only |
| `test` | Adding or updating tests |

Examples: `feat/terminal-animation`, `fix/menu-scroll`, `chore/update-deps`

## Architecture

Personal portfolio — **single-page Astro 4** site with a dark/dev aesthetic. React is used only for interactive islands via `client:load`.

The site builds in `hybrid` mode: every public page is prerendered to static HTML exactly as before, and only the private `/notes` area runs as a Vercel serverless function. See [Private Notes Section](#private-notes-section-notes).

### Structure

- `src/layouts/Layout.astro` — root layout: SEO metadata, fonts, GTM, Background + Header islands, Footer slot.
- `src/pages/index.astro` — single page composing all sections in order: Hero → About → Skills → Experience → Projects → Contact.
- `src/pages/404.astro` — not-found page.
- `src/components/` — one directory per component. Static sections use `.astro` files; interactive ones use `.tsx` (React islands).
- `src/scss/` — `globals.scss` (imports + base styles), `_variables.scss` (design tokens + animation mixins), `_normalize.scss` (reset).
- `src/assets/img/` — project screenshots and CV photo.
- `src/content/notes/` — markdown source for the private notes area.
- `src/scripts/quickNav.ts` — keyboard shortcut shared by both layouts.

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

## Private Notes Section (`/notes`)

A PIN-gated area for personal cheat sheets. Not linked from anywhere on the site, not indexed, and absent from `sitemap.xml`. **There is no database and no admin UI** — every note is a markdown file in the repo, versioned with git like any other code.

### Adding a note

Create a file in `src/content/notes/`. The filename becomes the URL: `docker.md` → `/notes/docker`. Nothing else needs touching — it appears in the sidebar and on the index automatically.

```markdown
---
title: 'Docker: comandos que siempre olvido'
description: 'Frase corta para la card del índice y el subtítulo de la ficha.'
tags: ['docker', 'cli']
updated: 2026-08-27
order: 3
---

## Primera sección

Texto normal. Los atajos con <kbd>Ctrl+b</kbd>, los comandos con `backticks`.
```

Frontmatter is validated by `src/content/config.ts`. A missing or malformed field fails the build with a named error rather than breaking at runtime.

| Field | Required | What it does |
|---|---|---|
| `title` | yes | Sidebar entry, page heading, `<title>` |
| `description` | yes | Index card text and page subtitle |
| `tags` | no | Blue pills; the sidebar filter searches title + tags. Defaults to `[]` |
| `updated` | yes | `YYYY-MM-DD`, coerced to a `Date` by zod |
| `order` | no | Ascending position in sidebar and index. Defaults to `0` |

Markdown accepts inline HTML, so `<kbd>` works. Tables, fenced code (Shiki-highlighted) and blockquotes are all styled in `NotesLayout.astro` under `.notes-prose`; wide tables get wrapped in a horizontal scroll container by a small script in that layout.

### How the pieces connect

```
src/content/config.ts          zod schema for the 'notes' collection
src/content/notes/*.md         the content itself
        │
        ▼
src/pages/notes/index.astro    getCollection('notes') → grid of cards
src/pages/notes/[slug].astro   getEntry('notes', slug) → renders one note
        │
        ▼
src/layouts/NotesLayout.astro  own <head> (noindex, no GTM, no Header/Footer),
                               loads the sidebar and the .notes-prose styles
src/components/NotesSidebar/   note list + text filter
```

The markdown is bundled into the serverless function, never published as a static asset, so the `.md` files cannot be fetched directly.

### The gate

| File | Role |
|---|---|
| `src/lib/auth.ts` | Reads the PIN and defines the cookie name/options |
| `src/middleware.ts` | Runs on every request; redirects `/notes/*` to the login unless the cookie matches |
| `src/pages/notes/login.astro` | Renders the form on `GET`, validates on `POST`, sets the cookie |
| `src/pages/notes/logout.ts` | Clears the cookie |

The cookie stores the PIN itself, `httpOnly` and `secure`, for a year. That is deliberate: the cookie is exactly as secret as the PIN the browser already holds, so signing it would add nothing. A useful side effect is that **changing `ADMIN_PIN` invalidates every existing session**, since the comparison is against the live env value.

There is no rate limiting — in serverless an in-memory counter does not hold across instances. Brute force is handled by PIN length instead, so **use 8+ alphanumeric characters, never a 4-digit number**.

`login` and `logout` are exempt in the middleware; gating them would redirect the login to itself.

### Rendering mode

Every route under `/notes` must declare `export const prerender = false`. Without it the page is prerendered at build time, the middleware never runs per-request, and the gate silently does nothing. This is the only way to break the module, and it is visible in the build output: prerendered routes are listed, gated ones are not.

### Environment

`ADMIN_PIN` is required, in `.env` locally (gitignored — see `.env.example`) and in the Vercel project for **both Production and Preview**. If it is missing the module fails closed: nobody gets in and the login says so.

It is read via `process.env` at runtime. `src/lib/auth.ts` also falls back to `import.meta.env` because `astro dev` does not populate `process.env`, but that fallback sits behind `import.meta.env.DEV` so the bundler strips it — otherwise Vite would inline the PIN as a literal into the function bundle.

### Keyboard shortcut

Typing `nvim` outside a text field jumps to `/notes` from the public site, and back home from anywhere under `/notes` (`src/scripts/quickNav.ts`, loaded by both layouts). Keystrokes are ignored while an input has focus, so the sidebar filter and the PIN field behave normally.

Trade-off worth knowing: this puts the string `/notes` in the public JS bundle. It is not a link and crawlers cannot follow it, but the path is no longer invisible to someone reading the source.

### Build caveat

`scripts/vercel-runtime.mjs` runs after `astro build` and rewrites the function runtime to `nodejs22.x`. The reason: `@astrojs/vercel` v7 — the only line compatible with Astro 4 — knows only Node 18 and 20, so building on Node 24 makes it fall back to the retired `nodejs18.x` and the deploy fails. **Migrating to Astro 5 + adapter v8 makes this script unnecessary; delete it and drop it from the `build` script.**
