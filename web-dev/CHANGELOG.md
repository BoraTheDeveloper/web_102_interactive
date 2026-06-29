# Changelog — Web Dev 102 Interactive Review

> Built by Chanbora Seng with Claude Code.  
> Project root: `web_dev_two/interactive-course/`

---

## Summary

An interactive weekly-review website for **Web Development 102** students (10-week full-stack course: React → Node/Express → MongoDB). Each week has its own menu entry showing that week's lesson followed by interactive practice. Weeks 1–10 are now available in the same student study loop: Theory → traced Example → Practice → Feynman Check.

The guiding principle throughout: **the app is the lesson**. It is built with the exact stack students are learning (Vite + React), so the tool itself is a worked example. Content lives in plain data files — adding a week never touches app code.

---

## v0.9 — Topbar shows student completion

**User direction:** The topbar `10 / 10 weeks` looked like student completion, but it actually meant available weeks. Change it to real completion.

### What changed

- Replaced the topbar's availability count with completed-week count.
- The label now reads `0 / 10 completed`, `1 / 10 completed`, etc.
- The topbar progress bar now fills from completed weeks, not from available weeks.
- The accessible label now says "`N` of `10` weeks completed."

### Verified

- Production build: clean.
- Browser check:
  - initial topbar shows `0 / 10 completed`;
  - initial topbar fill is `0%`;
  - clicking **Mark week complete →** on Week 1 routes to Week 2;
  - topbar updates to `1 / 10 completed`;
  - topbar fill updates to `10%`.

---

## v0.8 — Expanded traced example coverage

**User direction:** One example per week is not enough when a week covers multiple contexts. Week 5, for example, needs fetch from a file, a local server, and a database-backed API.

### What changed

- Expanded examples from one broad trace into focused lesson progressions:
  - Week 1: DOM update vs React render; component render; JSX values and `className`.
  - Week 2: props flow; one component rendering many cards; prop-name mismatch bug.
  - Week 4: controlled input typing; controlled form submit; blank-submit validation.
  - Week 5: static file fetch; local Express API fetch; database-backed API fetch.
  - Week 6: Node server startup; route matching; Express JSON response.
  - Week 7: GET all/by id; POST create; PUT update; DELETE remove.
  - Week 8: MongoDB connection; schema/model; Mongoose read/create.
  - Week 9: find by `_id`; MongoDB PUT/DELETE; invalid ObjectId `400`.
  - Week 10: CORS; React load; React POST; React DELETE by `_id`.
- Added trace configs for each new focused example in `src/components/demos/traces.jsx`.
- Kept Week 3 unchanged: it already has one runnable example plus two traced debugger demos.

### Verified

- Production build: clean.
- Browser check across all 10 weeks:
  - Week 1: 3 examples;
  - Week 2: 3 examples;
  - Week 3: 3 examples;
  - Week 4: 3 examples;
  - Week 5: 3 examples;
  - Week 6: 3 examples;
  - Week 7: 4 examples;
  - Week 8: 3 examples;
  - Week 9: 3 examples;
  - Week 10: 4 examples.
- Confirmed every new non-Week-3 example renders as a traced demo.
- Smoke-tested the new Week 10 DELETE-by-`_id` trace stepper.

---

## v0.7 — Per-week completion and wider theory prose

**User direction:** Make theory paragraphs span wide like theory headings, then make progress unique for each week and advance to the next week after completion.

### What changed

- Removed `.theory-p` from the prose `max-width` cap so Theory paragraphs use the same available width as Theory headings.
- Replaced the single global `complete` flag with per-week completion state keyed by week slug.
- Changed **Mark week complete →** so it now:
  1. marks only the current week complete;
  2. advances to the next available week;
  3. preserves the completed ring when the student returns to that week.

### Verified

- Production build: clean.
- Browser check:
  - Week 1 starts incomplete at `25%`;
  - clicking **Mark week complete →** routes to Week 2;
  - Week 2 does not inherit Week 1's completion state;
  - returning to Week 1 shows `100%` and **Week marked complete**.

---

## v0.6 — Curated Week-3-style lessons for Weeks 1–10

**User direction:** "Not an exact copy paste slide structure... each week should structure like Week 3: Theory, examples with debugging trace, Practice, Feynman review."

### What changed

- Replaced the slide-by-slide generated lesson dumps with curated lessons.
- Kept `docs/slides/` as source material, but converted each week into the website's learning flow:
  1. concise Theory;
  2. traced debugger-style Example;
  3. Practice study check;
  4. Feynman review prompts.
- Added traced demo configs for the generated weeks:
  - Week 1 — component render path;
  - Week 2 — props flow;
  - Week 4 — controlled form submit;
  - Week 5 — fetch lifecycle;
  - Week 6 — Express GET route;
  - Week 7 — POST route and status codes;
  - Week 8 — Mongoose read/create;
  - Week 9 — MongoDB update flow;
  - Week 10 — React → Express → MongoDB request.
- Added generic trace-preview styling for non-Week-3 demos.

### Verified

- Production build: clean.
- Browser check across all 10 weeks:
  - sections are exactly Theory, Examples, Practice, Feynman Check;
  - no `Slide 1 —` / table-of-contents slide-dump structure remains;
  - each week has at least one traced example;
  - each week has Practice and Feynman prompts.
- Smoke-tested trace stepping on Week 1 and Week 6.

---

## v0.5 — Slide-backed Weeks 1–10

**User direction:** "Read the contents from `docs/slides/` then add those contents to each week in `interactive-course/` so that we can replace the coming soon."

### What changed

- Generated real week data files for Weeks 1, 2, and 4–10 from the revised slide decks.
- Replaced all placeholder weeks in the menu with available lessons.
- Kept Week 3 as the custom interactive vertical slice with traced demos and auto-checked exercises.
- Extended `Theory.jsx` to render slide-backed `heading` and `list` blocks in addition to prose and code.
- Added deck code snippets as read-only examples for each generated week.
- Added a lightweight study-check quiz and Feynman prompts for each generated week.
- Removed stale W11/W12 references from generated Week 10 content to match the 10-week course scope.

### Verified

- Production build: clean.
- Browser check:
  - exactly 10 week buttons;
  - no disabled weeks;
  - no `soon` labels;
  - topbar progress shows `10 / 10 weeks`;
  - Week 1 renders slide content and examples;
  - Week 10 renders slide content and examples.

---

## v0.4 — Reader redesign and Week 3 cleanup

**User direction:** "I like this design... adjust Week 3 first." Follow-up fixes: make the sidebar flush left, pin the progress rail to the right, widen the learning column, remove Check-In, and use JetBrains Mono for code.

### What changed

#### Reader-style study layout

Week 3 now uses the selected Reader design:

- Sticky topbar with current-week context and course progress.
- Sidebar pinned to the left edge of the screen.
- Main learning column fills the space between sidebar and progress rail.
- Progress rail lives outside `<main className="content">` as an `.app` grid sibling, so it no longer shifts upward before sticking.
- Progress rail sticks to the right edge and tracks four sections: Theory, Examples, Practice, and Feynman Check.

#### Full-width learning blocks

Learning blocks now use the full middle column when they need room:

- Goal card aligns with code block width.
- Feynman prompts align with the same column.
- Code blocks, traced demos, examples, quizzes, and exercises use the available learning width.
- Traced debugger demos stack before they get cramped, avoiding the cropped two-column layout.

#### Typography and code font

- Headings use Clash Display; body text uses Satoshi.
- Section numbers (`01`, `02`, etc.) now use the same display font, weight, and vertical alignment as section titles.
- Code blocks, inline code, traced-demo code, and editable code fields all use JetBrains Mono through `--mono`.

#### Progress behavior

- Scroll progress now reaches `100%` at the bottom of the page.
- Clicking **Mark week complete** fills the progress ring to a complete circle and shows `100%`.
- The rail's CTA sits directly below the section navigation.

#### Check-In removed

Before-Class Check-In was removed entirely:

- Removed the rendered section from `WeekView.jsx`.
- Removed `checkin` data from `week03.js`.
- Deleted `components/CheckIn.jsx`.
- Removed stale Check-In styles and README references.

### Verified

- Production build: clean.
- Browser layout checks:
  - sidebar flush left;
  - progress rail flush right and sticky;
  - rail is outside `main.content`;
  - goal card, code blocks, Feynman prompts, and exercises align to the learning column;
  - section number/title alignment delta is `0`;
  - scroll progress reaches `100%`;
  - Mark Complete fills the ring (`stroke-dashoffset: 0`);
  - code surfaces compute to JetBrains Mono.

---

## v0.3 — Debugger-style live demos (all interactive demos traced)

**User direction:** "This should also have that debugger style — this is a must-have for all live demos. For run & check, no need."

### What changed

#### Task-list demo converted to a traced debugger

The "Updating an array in state" demo is now a step-through debugger, matching the counter. Type a task, press **Add** (or `Step ▶`), and it walks five steps:

1. Event fires — `onClick={addTask}` highlighted
2. Handler runs — `addTask()` entry
3. Build a new array — `setTasks([...tasks, draft])`, inspector shows `tasks` as **pending** with old → new
4. Clear the input — `setDraft("")`, inspector also shows `draft` as **pending**
5. Re-render — `.map()` highlighted; both changes commit together

**The key teaching moment:** steps 3 and 4 both show as pending in the inspector *before* step 5 commits them — one click changes two pieces of state, and students can see each queued separately before the screen updates.

#### Trace engine extended (for future weeks)

- `update(partial)` — live elements can now shallow-merge into state (how the input box works before triggering the trace). Required for any demo where the student types before clicking.
- **Delta merging** — deltas accumulate across consecutive steps (`{ ...(prev || {}), ...next.delta(state) }`), then clear on `apply`. This is what lets tasks and draft both appear as pending simultaneously.
- Old non-traced `liveDemo` path removed (`components/demos/index.jsx` deleted). All live demos are now traced; the branch was dead code.

### Design choice: trace everything interactive, skip code exercises

"Run & check" exercises run in a sandboxed Web Worker and grade the student's own code — the student is the agent there, not the demo. Tracing would conflict with that. Traced demos are for *watching* how React works; exercises are for *producing* code. The distinction is load-bearing.

### Verified
- Task-list trace: `tasks → [Study JS, new item]`, `draft` cleared; both pending together at step 4.
- Counter trace: regression-free.
- Production build: clean. SSR render: all pieces mount.

---

## v0.2 — Syntax highlighting, debugger demo, quiz layout, wider content

### 1. Traced "debugger" demo (`components/TracedDemo.jsx`)

**User direction:** "What if we add live code update / value update side by side — code left, render right — so when they click they can see the function triggered, the check, the update? Like a debugger. Those websites [bbycroft.net/llm, ngrok's blog] — that interactive style."

A new component inspired by bbycroft's stepped LLM walkthrough and ngrok's reveal-one-step-at-a-time diagrams. Structure:

- **Left panel:** source code with the active line highlighted in accent colour as each step reveals it.
- **Right panel:**
  - Live interactive element (the real component, running now).
  - **State inspector** — pill badges showing current values; when a `setState` call is *queued but not yet committed*, the pill shows `old → new` in amber ("pending") so students can see the delay before the screen updates.
  - Step list — each step unlocks in sequence (pending → active → done with green tick).
  - Controls: `Step ▶`, `Auto-play` (one step/second), `Reset`.

The counter demo walks: event fires → handler runs → `setCount(count + 1)` queued (`count: 0 → 1` shown as pending) → re-render (screen finally changes). The gap between queuing and committing is the core insight this makes visible.

Trace scripts live in `components/demos/traces.jsx` keyed by name. Adding a trace for a new week is a data change, not a component change.

#### Design choice: step machine, not live annotation

An alternative would have been live source annotation (colour every line as it runs continuously). That approach loses the "pause and think" moment. The step machine forces the student to predict before revealing — same pedagogical principle as the predict-then-run exercise.

### 2. Syntax highlighting (`lib/prism.js` + `react-simple-code-editor`)

**User direction:** "Can we add language support so it shows highlighted syntax?"

- All code blocks (`CodeBlock.jsx`) render via Prism. Dark token theme matching `--code-bg`.
- All editable exercise fields (`CodeEditor.jsx`) use `react-simple-code-editor`, which layers a transparent `<textarea>` over a Prism-highlighted `<pre>`. Students type real, highlighted JS/JSX.
- **CJS interop guard** in `CodeEditor.jsx`: `react-simple-code-editor` is a CommonJS module. Under Vite SSR it resolves to `{ __esModule: true, default: <component> }` rather than the component itself. The guard (`EditorModule?.default ?? EditorModule`) is a no-op in the browser build (where the default import is the component directly) and unwraps correctly under SSR. Discovered by the SSR render smoke test — the production build alone did not catch it.

### 3. Quiz two-column layout

**User direction:** "Create a 2-grid section — one grid for the code (sticky), one for the questions (scrollable). Students shouldn't need to scroll up and down."

- `quiz-grid`: CSS Grid with two equal `1fr` columns.
- Code column: `position: sticky; top: 16px` — stays in view while questions scroll.
- Questions column: natural document flow, scrolls with the page.
- Stacks to one column below 1100px viewport.

### 4. Wider content column

**User direction:** "The content looks too small — this is causing the quiz code to collapse."

Root cause: `article.week` was locked at `max-width: 760px`. At full screen the content floated in empty margin, and inside it the quiz code pane was ~360px — causing the horizontal scrollbar and clipping.

Fix:
- Content column widened to `--content: 1080px`.
- Long-form reading text (paragraphs, goal card, feynman prompts) capped at `--measure: 74ch` — long line lengths hurt prose readability, but code and interactive blocks take the full width.
- Quiz and traced-demo grids stack at `≤1100px` (before they'd get cramped on smaller laptops) and again at `≤820px` (phones/tablets).

---

## v0.1 — Initial build (Week 3 proof-of-concept)

**Starting point:** 10-week course scope, weekly JS review markdown files, homework files, and slide decks already existed. No interactive tool.

### Project setup

- **Vite + React** (v18, JSX), no TypeScript, no UI library. Intentionally minimal — students can `npm run dev` and read every file.
- Standalone project at `web_dev_two/interactive-course/`, separate from existing course materials.
- `npm run build` produces a self-contained `dist/` for static hosting.

### Architecture: config-driven, content-as-data

Each week is a plain JS data file (`src/data/weeks/weekNN.js`) registered in `src/data/weeks/index.js`. The shared shell (`WeekView.jsx`) renders any week from its data. Adding a week means writing a data file — never touching component code.

This was an explicit design goal: the site must survive 12 weeks of live teaching without maintenance becoming a burden.

Week data shape:

| Field | Type | Content |
|---|---|---|
| `goal` | string | One-paragraph goal |
| `theory[]` | blocks | `{ kind: 'p', text }` or `{ kind: 'code', code, lang }` |
| `examples[]` | array | `runnable` JS, `tracedDemo` key, or read-only code |
| `practice[]` | array | `predict`, `code` (auto-checked), or `quiz` |
| `feynman[]` | array | `{ q, a }` reveal-on-click |

### In-browser JS sandbox (`lib/runner.js`)

Auto-checked code exercises run in a **Web Worker** via `new Function(...)` — an infinite loop or syntax error cannot freeze or crash the page. Sandboxed `console` captures logs. Timeout kills the worker after 2 seconds.

Grading: the exercise `harness` string appends `console.log('__CHECK__' + JSON.stringify(value))` after the student's code. The grader finds that line in the output, parses the JSON, and deep-compares it to `expected` (`lib/equal.js`). The `__CHECK__` line is stripped from the visible output panel.

### Week 3 content

Directly from the existing `week_03_events_state_and_array_updates.md`:

- **Theory** — events, event handlers, `useState`, spread syntax, `.map()`
- **Predict-the-output** — guess before running (active recall)
- **Exercise 1** — write `increaseCount()` (`expected: 3`)
- **Exercise 2** — `[...tasks, "Build planner"]` (`expected: [...]`)
- **Exercise 3** — immutable update with `.map()` (`expected: [{ isCompleted: true }, { isCompleted: false }]`)
- **Read-the-code quiz** — 3 questions about a `TaskList` component
- **Feynman Check** — 5 explain-it-yourself prompts with model answers

All three exercise solutions pass grading; all three starters fail — confirmed by `scripts/verify.mjs`.

### SSR smoke test (`scripts/ssr-check.mjs`)

Renders the real `<App/>` through Vite's SSR pipeline (not jsdom, not the build output — actual module eval). Checks that the sidebar, week title, Prism tokens, code editor, traced demo, and quiz grid all render without throwing. This caught the `react-simple-code-editor` CJS interop bug that the production build missed.

---

## Files reference

```
src/
  App.jsx                       Shell: sidebar + content area + progress rail
  main.jsx                      Entry point
  styles.css                    All styling (CSS custom properties, no framework)

  data/
    weeks/
      index.js                  Course menu; registers weeks 1–10
      week03.js                 Week 3 content (the only fully-built week)

  components/
    WeekView.jsx                Renders any week from its data file
    Sidebar.jsx                 Week menu
    Theory.jsx                  Prose + code block renderer
    CodeBlock.jsx               Syntax-highlighted read-only code (Prism)
    CodeEditor.jsx              Syntax-highlighted editable textarea (react-simple-code-editor)
    RunnableExample.jsx         Read-only code + Run button + output
    OutputPanel.jsx             Displays logs / errors from the sandbox
    RichText.jsx                Inline **bold** and `code` in prose strings
    FeynmanCheck.jsx            Expand/collapse explain-it prompts
    TracedDemo.jsx              Debugger-style step-through demo

    practice/
      Predict.jsx               Predict-the-output exercise
      CodeExercise.jsx          Auto-checked code exercise
      Quiz.jsx                  Multiple-choice quiz (two-column with sticky code)

    demos/
      traces.jsx                Trace configs (counter, taskList)

  lib/
    runner.js                   Web Worker JS sandbox + output capture
    equal.js                    Deep equality for grading
    prism.js                    Centralised Prism setup (JSX grammar)

scripts/
  ssr-check.mjs                 SSR render smoke test (run with `node scripts/ssr-check.mjs`)
```

---

## What's next

- **Review curated Weeks 1, 2, and 4–10** for wording and pacing against the live class plan.
- **Replace study-check quizzes** with stronger, week-specific interactive exercises where needed.
- **Add a second traced example** to weeks where one trace is not enough.
- **Hosting** — `npm run build` produces a static `dist/`; can be served from any static host or school server.
