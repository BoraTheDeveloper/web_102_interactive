// The course menu. Every page the app knows about is registered here.
// Pages are grouped into sections (Review by Skill, Game Reviews, Debug
// Common Bugs, Project Readiness, Final Project Ideas).

import conditionals from './skills/conditionals.js'
import loops from './skills/loops.js'
import functions from './skills/functions.js'
import lists from './skills/lists.js'
import dictionaries from './skills/dictionaries.js'
import tryexcept from './skills/tryexcept.js'

import numberGuessing from './reviews/number-guessing.js'
import rockPaperScissors from './reviews/rock-paper-scissors.js'

import inputString from './bugs/input-is-string.js'
import infiniteLoop from './bugs/infinite-loop.js'
import scoreResets from './bugs/score-resets.js'
import printsVsReturns from './bugs/prints-vs-returns.js'
import indexOutOfRange from './bugs/index-out-of-range.js'
import keyError from './bugs/key-error.js'
import valueErrorIntInput from './bugs/valueerror-int-input.js'
import outsideLoop from './bugs/outside-loop.js'
import indentation from './bugs/indentation.js'

import readiness from './readiness.js'
import projects from './projects.js'

const skills = [conditionals, loops, functions, lists, dictionaries, tryexcept]
const reviews = [numberGuessing, rockPaperScissors]
const bugs = [
  inputString,
  infiniteLoop,
  scoreResets,
  printsVsReturns,
  indexOutOfRange,
  keyError,
  valueErrorIntInput,
  outsideLoop,
  indentation,
]

const page = (slug, title, kind, data) => ({ slug, title, kind, data })

const skillPages = skills.map((s) => page(s.slug, s.title, 'skill', s))
const reviewPages = reviews.map((r) => page(r.slug, r.title, 'review', r))
const bugPages = bugs.map((b) => page(b.slug, b.title, 'bug', b))

export const NAV = [
  { section: 'Review by Skill', pages: skillPages },
  { section: 'Game Reviews', pages: reviewPages },
  { section: 'Debug Common Bugs', pages: bugPages },
  {
    section: 'Project Readiness',
    pages: [page('tic-tac-toe-readiness', 'Tic-Tac-Toe Readiness', 'readiness', readiness)],
  },
  {
    section: 'Final Project Ideas',
    pages: [page('final-projects', 'Final Project Ideas', 'projects', projects)],
  },
]

const ALL = NAV.flatMap((g) => g.pages)

export function getPage(slug) {
  return ALL.find((p) => p.slug === slug)
}
