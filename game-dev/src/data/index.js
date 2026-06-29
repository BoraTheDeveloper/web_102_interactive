// The course menu. Pages are grouped into sections: Visual Concepts,
// Space Shooter Repair Center, and Final Project (builder + ideas).

import gameLoop from './concepts/game-loop.js'
import coordinates from './concepts/coordinates.js'
import rectCollision from './concepts/rect-collision.js'
import input from './concepts/input.js'
import deltaTime from './concepts/delta-time.js'
import classes from './concepts/classes.js'
import spriteGroups from './concepts/sprite-groups.js'

import windowOpens from './repairs/window-opens-closes.js'
import imageMissing from './repairs/image-missing.js'
import playerNoMove from './repairs/player-no-move.js'
import playerTooFast from './repairs/player-too-fast.js'
import laserNoShoot from './repairs/laser-no-shoot.js'
import meteorNoSpawn from './repairs/meteor-no-spawn.js'
import collisionFails from './repairs/collision-fails.js'
import scoreResets from './repairs/score-resets.js'
import gameLags from './repairs/game-lags.js'
import classError from './repairs/class-error.js'
import spriteGroupNoDraw from './repairs/sprite-group-no-draw.js'

import projects, { builder } from './projects.js'

const concepts = [gameLoop, coordinates, rectCollision, input, deltaTime, classes, spriteGroups]
const repairs = [
  windowOpens,
  imageMissing,
  playerNoMove,
  playerTooFast,
  laserNoShoot,
  meteorNoSpawn,
  collisionFails,
  scoreResets,
  gameLags,
  classError,
  spriteGroupNoDraw,
]

const page = (slug, title, kind, data) => ({ slug, title, kind, data })

const conceptPages = concepts.map((c) => page(c.slug, c.title, 'concept', c))
const repairPages = repairs.map((r) => page(r.slug, r.title, 'repair', r))

export const NAV = [
  { section: 'Visual Concepts', pages: conceptPages },
  { section: 'Space Shooter Repair Center', pages: repairPages },
  {
    section: 'Final Project',
    pages: [
      page('project-builder', 'Project Builder', 'builder', builder),
      page('project-ideas', 'Final Project Ideas', 'projects', projects),
    ],
  },
]

const ALL = NAV.flatMap((g) => g.pages)

export function getPage(slug) {
  return ALL.find((p) => p.slug === slug)
}
