import weeks from './weeks/index.js'
import { UNLOCKS_AT } from './schedule.js'

// Vite statically replaces import.meta.env.DEV at build time. The typeof guard
// keeps this module importable from plain node, so the data layer can be
// checked without a browser.
const DEV = typeof import.meta.env !== 'undefined' && import.meta.env.DEV

const page = (slug, title, kind, data, unlocksAt) => ({ slug, title, kind, data, unlocksAt })

const weekPages = weeks.map((w) => {
  // Fail open is the safe direction for a student, but it should not be silent.
  if (DEV && !UNLOCKS_AT[w.slug]) {
    console.warn(`[t3] week "${w.slug}" has no unlocksAt entry, so it renders unlocked.`)
  }
  return page(w.slug, w.title, 'week', w, UNLOCKS_AT[w.slug])
})

const NAV = [{ section: 'Review by Week', pages: weekPages }]

// Weeks link out to concept and repair pages that are authored later in the
// term. WeekView renders a "Go deeper" button for every entry in `related`
// without checking it exists, so filter against the pages this term actually
// has. That removes the ordering constraint: a week can ship before the pages
// it points at, and the links appear on their own once those pages land.
const known = new Set(NAV.flatMap((g) => g.pages).map((p) => p.slug))
for (const group of NAV) {
  for (const p of group.pages) {
    if (!p.data.related) continue
    p.data = { ...p.data, related: p.data.related.filter((r) => known.has(r.slug)) }
  }
}

export default NAV
