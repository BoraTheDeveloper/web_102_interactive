# TKA Interactive Courses

Three interactive course review sites, built with **React + Vite**, hosted as
sub-paths on a single Vercel project. Each course is a standalone SPA; a root
build script compiles all three into one `dist/` with a shared landing page.

## Courses

| Path | Course | Pages | Highlights |
|------|--------|-------|------------|
| `/web-dev/` | Web Dev 102 | 10 weeks | Traced debugger demos, auto-checked JS exercises, quizzes, Feynman checks |
| `/intro-python/` | Intro Python | 19 pages | 6 skill reviews, 2 game reviews, 9 bug-fix labs (real Python via Pyodide), project readiness checklist, 10 project ideas |
| `/game-dev/` | Game Dev | 20 pages | 7 canvas-based visual concepts, 11 Space Shooter repair pages, stepped project builder, 8 project ideas |

## Project layout

```
interactive_course/
  package.json          root scripts (build all, dev per course)
  build-all.js          builds each site with its --base path into dist/
  vercel.json           SPA rewrites for each sub-path
  root-index.html       landing page with three course links
  web-dev/              Web Dev 102 site (React + Vite)
  intro-python/         Intro Python site (React + Vite + Pyodide)
  game-dev/             Game Dev site (React + Vite + Canvas)
```

Each subdirectory is an independent Vite project with its own `package.json`,
`src/`, and `vite.config.js`. Course content is plain data in `src/data/` —
shared components render pages from data files, so adding or editing content
does not require touching component code.

## Run locally

Each course runs independently on its own dev server:

```bash
npm run dev:web-dev          # http://localhost:5173
npm run dev:intro-python     # http://localhost:5174 (or next available)
npm run dev:game-dev         # http://localhost:5175 (or next available)
```

Or run directly inside a course folder:

```bash
cd intro-python
npm install
npm run dev
```

> **Note:** Intro Python's BugFix labs download Pyodide (~10 MB) from CDN on
> first Run, so the first execution needs internet.

## Build all three

```bash
npm run build
```

This runs `build-all.js`, which installs dependencies and builds each site with
its sub-path base (`/web-dev/`, `/intro-python/`, `/game-dev/`) into a single
`dist/` directory:

```
dist/
  index.html              landing page
  web-dev/
    index.html
    assets/
  intro-python/
    index.html
    assets/
  game-dev/
    index.html
    assets/
```

Preview the full build locally:

```bash
cd dist && python3 -m http.server 8000
# open http://localhost:8000/web-dev/ etc.
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import it as a Vercel project (root directory = repo root).
3. Vercel reads `vercel.json` automatically:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Rewrites:** deep links under each sub-path fall back to that course's `index.html`

Courses go live at `https://<project>.vercel.app/web-dev/`, `/intro-python/`,
`/game-dev/`, with the landing page at `/`.

## Tech notes

- **Shared architecture:** all three sites use the same React + Vite +
  Prism stack, data-driven page rendering, and `localStorage`-persisted
  progress tracking.
- **Intro Python BugFix:** real Python execution via a lazy Pyodide Web Worker
  with stdin piping and separate load (45 s) vs execution (4 s) timeouts.
- **Game Dev visual demos:** HTML5 Canvas with draggable rects, FPS sliders,
  multi-frame trace stepping, and a Space Shooter scene renderer.
- **No backend, no login.** Each class gets a direct link to their course.
