# Web Dev 102 — Interactive Review

A single-page app where each week of **Web Development 102** has its own menu
entry, opening that week's lesson followed by interactive practice.

Built with **React + Vite** — the same stack students learn in the course, so
the app itself doubles as a worked example.

## Run it

```bash
npm install
npm run dev      # open the URL it prints (usually http://localhost:5173)
```

Build for sharing / hosting:

```bash
npm run build    # output in dist/
npm run preview  # serve the production build locally
```

## What's built so far

Weeks **1–10** are available in the course menu.

- **Weeks 1, 2, and 4–10** are curated from `docs/slides/` into the same learning flow as Week 3: Theory → traced Example → Practice → Feynman Check.
- **Week 3 — State & User Interaction** remains the richer hand-built vertical slice with multiple traced demos and auto-checked code exercises.
- Every available week uses the same student study loop, not the original slide order.

## How week content works

Weeks are **plain data** in `src/data/weeks/`. The shared components in
`src/components/` render any week from its data file. Content shape:

| Section   | Field      | Notes |
|-----------|------------|-------|
| Goal      | `goal`     | one-paragraph string |
| Theory    | `theory[]` | blocks: `heading`, `p`, `list`, or `code` |
| Examples  | `examples[]` | `runnable` JS, a `tracedDemo` key, or a read-only code block |
| Practice  | `practice[]` | `type: 'predict' \| 'code' \| 'quiz'` |
| Feynman   | `feynman[]`  | `{ q, a }` |

Auto-checked `code` exercises: `starter` seeds the editor, `harness` logs the
graded value as `__CHECK__<json>`, and `expected` is deep-compared to it.

Code editors and code blocks are syntax-highlighted with Prism (`src/lib/prism.js`).

### Traced "debugger" demos

A `tracedDemo: '<name>'` example renders `TracedDemo` — code on the left with the
active line highlighted, and a live element + **state inspector** + step list on
the right. Stepping (or clicking the element) walks the interaction:
event → handler → `setState` (shows `count: 0 → 1`) → re-render → UI updates.

Trace scripts live in `src/components/demos/traces.jsx`, keyed by name. Each has
`code`, initial `state`, a `live(...)` render, an `inspector(state)`, and ordered
`steps` (each highlights `lines`, with optional `delta` to show a pending value
and `apply` to commit the new state).

## Project layout

```
src/
  data/weeks/        week content (the only files you edit per week)
  components/         shared UI: sidebar, week renderer, sections
  components/practice/  Predict, CodeExercise, Quiz
  components/demos/   live React demos used in Examples
  lib/runner.js       sandboxed in-browser JS runner (Web Worker)
  lib/equal.js        deep equality used for grading
```
