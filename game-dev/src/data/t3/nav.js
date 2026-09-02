// The Term 3 course menu. Weeks carry an unlocksAt and open the Sunday their
// class is taught. Concepts and repairs are never gated: a student poking at
// the delta-time demo early is learning, not skipping ahead.

import weeks from './weeks/index.js'
import homework from './homework/index.js'
import { UNLOCKS_AT } from './schedule.js'

import gameLoop from './concepts/game-loop.js'
import coordinates from './concepts/coordinates.js'
import drawOrder from './concepts/draw-order.js'
import input from './concepts/input.js'
import rectCollision from './concepts/rect-collision.js'
import classes from './concepts/classes.js'
import deltaTime from './concepts/delta-time.js'
import t3Inheritance from './concepts/t3-inheritance.js'
import t3VectorDirection from './concepts/t3-vector-direction.js'
import t3GameStates from './concepts/t3-game-states.js'
import t3GravityJump from './concepts/t3-gravity-jump.js'

import windowOpensCloses from './repairs/window-opens-closes.js'
import blackWindow from './repairs/black-window.js'
import nothingDraws from './repairs/nothing-draws.js'
import movesOnceThenFreezes from './repairs/moves-once-then-freezes.js'
import playerNoMove from './repairs/player-no-move.js'
import scoreResets from './repairs/score-resets.js'
import collisionFails from './repairs/collision-fails.js'
import itemSpawnsOffScreen from './repairs/item-spawns-off-screen.js'
import missingSelf from './repairs/missing-self.js'
import playerTooFast from './repairs/player-too-fast.js'

// Vite statically replaces import.meta.env.DEV at build time. The typeof guard
// keeps this module importable from plain node, so the data layer can be
// checked without a browser.
const DEV = typeof import.meta.env !== 'undefined' && import.meta.env.DEV

// Concepts in teaching order, so the sidebar reads like the term.
// The t3- prefixed four are the ideas this term adds after week 5; weeks and
// Pong chunks already link to them by these slugs.
const concepts = [
  gameLoop,
  coordinates,
  drawOrder,
  input,
  rectCollision,
  classes,
  deltaTime,
  t3Inheritance,
  t3VectorDirection,
  t3GameStates,
  t3GravityJump,
]

// Repairs in the order the bugs first bite, which is also roughly week order.
const repairs = [
  windowOpensCloses,
  blackWindow,
  nothingDraws,
  movesOnceThenFreezes,
  playerNoMove,
  scoreResets,
  collisionFails,
  itemSpawnsOffScreen,
  missingSelf,
  playerTooFast,
]

const page = (slug, title, kind, data, unlocksAt) => ({ slug, title, kind, data, unlocksAt })

// A week opens on its own class date unless it names another week in
// `unlocksWith`. W11 and W12 do: they are a work session and a demo day with no
// deck, so their pages are read before class, and they open with W10.
const weekPages = weeks.map((w) => {
  const key = w.unlocksWith ?? w.slug
  // Fail open is the safe direction for a student, but it should not be silent.
  if (DEV && !UNLOCKS_AT[key]) {
    console.warn(`[t3] week "${w.slug}" has no unlocksAt entry for "${key}", so it renders unlocked.`)
  }
  return page(w.slug, w.title, 'week', w, UNLOCKS_AT[key])
})

// A chunk names the week that sets it and the week its rescue file opens,
// rather than carrying two timestamps of its own. A cancelled class then moves
// one line in schedule.js and the homework follows it.
const homeworkPages = homework.map((c) => {
  if (DEV && (!UNLOCKS_AT[c.setAfter] || !UNLOCKS_AT[c.rescueAfter])) {
    console.warn(`[t3] homework "${c.slug}" names a week with no unlocksAt entry.`)
  }
  const data = { ...c, rescueUnlocksAt: UNLOCKS_AT[c.rescueAfter] }
  return page(c.slug, c.title, 'homework', data, UNLOCKS_AT[c.setAfter])
})

const NAV = [
  { section: 'Review by Week', pages: weekPages },
  { section: 'Pong Homework', pages: homeworkPages },
  { section: 'Visual Concepts', pages: concepts.map((c) => page(c.slug, c.title, 'concept', c)) },
  { section: 'Repair Center', pages: repairs.map((r) => page(r.slug, r.title, 'repair', r)) },
]

// Weeks link out to concept and repair pages that are authored later in the
// term. WeekView renders a "Go deeper" button for every entry in `related`
// without checking it exists, so filter against the pages this term actually
// has. That removes the ordering constraint: a week can ship before the pages
// it points at, and the links appear on their own once those pages land.
const known = new Set(NAV.flatMap((g) => g.pages).map((p) => p.slug))
for (const group of NAV) {
  for (const p of group.pages) {
    if (!p.data.related) continue
    const kept = p.data.related.filter((r) => known.has(r.slug))
    if (DEV && kept.length !== p.data.related.length) {
      const missing = p.data.related.filter((r) => !known.has(r.slug)).map((r) => r.slug)
      console.warn(`[t3] "${p.slug}" links to pages that do not exist yet: ${missing.join(', ')}`)
    }
    p.data = { ...p.data, related: kept }
  }
}

export default NAV
