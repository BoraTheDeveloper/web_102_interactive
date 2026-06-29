// Final project cards + the project builder. Plain data only. The generate
// function returns { name, checklist, stretch } from the choices object,
// where the keys are the step ids (type, action, objective, scoring).
// Based on the skills practiced in game_dev/space_shooter/w9_final.py.

const projects = [
  {
    id: 'collector',
    name: 'Collector Game',
    level: 'Beginner',
    skills: ['Sprite groups', 'Keyboard input', 'Rect collision', 'Score tracking', 'Game loop'],
    minimum: [
      'Open a window and run a game loop with pygame.event.get()',
      'Move a player sprite with the arrow keys',
      'Spawn collectible items in the play area',
      'Increase the score with spritecollide when the player grabs an item',
      'End the game when all items are collected',
    ],
    stretch: [
      'Add a timer that ends the game if it runs out',
      'Play a sound on each collect',
      'Add slowly moving collectibles',
    ],
  },
  {
    id: 'dodge',
    name: 'Dodge Game',
    level: 'Beginner',
    skills: ['Sprite groups', 'Delta time movement', 'Custom timer events', 'Rect collision', 'Game loop'],
    minimum: [
      'Move the player with the arrow keys using dt',
      'Spawn falling hazards on a timer event',
      'Detect a hit with spritecollide',
      'Lose a life or end the game on a hit',
      'Track survival time with pygame.time.get_ticks()',
    ],
    stretch: [
      'Increase the spawn rate over time',
      'Add lives and a game-over screen',
      'Add a shield power-up',
    ],
  },
  {
    id: 'shooter-variant',
    name: 'Space Shooter Variant',
    level: 'Beginner',
    skills: ['Sprite classes', 'get_just_pressed for firing', 'Laser and meteor groups', 'Collision with dokill', 'Score and sound'],
    minimum: [
      'Move a ship with the arrow keys',
      'Fire lasers on space with get_just_pressed()[K_SPACE]',
      'Spawn meteors on a timer event',
      'Kill meteors with laser-vs-meteor collision',
      'Track the score and end on a player hit',
    ],
    stretch: [
      'Add different meteor sizes with different speeds and scores',
      'Add an explosion sound on each hit',
      'Keep a high score across runs',
    ],
  },
  {
    id: 'maze-escape',
    name: 'Maze Escape',
    level: 'Beginner',
    skills: ['Rect collision', 'Wall tiles', 'Keyboard input', 'Win condition', 'Game loop'],
    minimum: [
      'Build the maze from wall rects',
      'Move the player with the arrow keys',
      'Stop the player from passing through walls',
      'Draw a start point and an exit',
      'End with a win when the player reaches the exit rect',
    ],
    stretch: [
      'Add collectible keys that unlock the exit',
      'Add a move counter',
      'Generate a random maze each run',
    ],
  },
  {
    id: 'clicker',
    name: 'Clicker Game',
    level: 'Medium',
    skills: ['Mouse input', 'collidepoint', 'Spawning', 'Score tracking', 'Game loop'],
    minimum: [
      'Spawn clickable targets at random spots',
      'Detect clicks with pygame.MOUSEBUTTONDOWN',
      'Confirm the hit with rect.collidepoint(event.pos)',
      'Increase the score on each hit',
      'End after a set number of misses',
    ],
    stretch: [
      'Make targets shrink over time',
      'Add combo multipliers for fast clicks',
      'Add sound and a high-score screen',
    ],
  },
  {
    id: 'falling-objects',
    name: 'Falling Objects Game',
    level: 'Medium',
    skills: ['Sprite groups', 'Custom timer events', 'Delta time', 'Rect collision', 'Score and lives'],
    minimum: [
      'Spawn objects that fall using dt',
      'Move a basket or player with the arrow keys',
      'Catch good objects with spritecollide',
      'Lose points or lives on bad objects',
      'Track score and lives until game over',
    ],
    stretch: [
      'Vary the fall speed by object type',
      'Add a combo streak counter',
      'Add a difficulty ramp over time',
    ],
  },
  {
    id: 'platform-avoider',
    name: 'Platform Avoider',
    level: 'Medium',
    skills: ['Sprite classes', 'Gravity and jumping', 'Delta time', 'Rect collision', 'Game loop'],
    minimum: [
      'Add a player with gravity and a jump',
      'Spawn moving hazards',
      'Detect a hit with spritecollide',
      'Lose the game on a hit',
      'Survive as long as possible',
    ],
    stretch: [
      'Add scrolling platforms',
      'Add a double jump',
      'Add particle effects on a hit',
    ],
  },
  {
    id: 'boss-fight',
    name: 'Boss Fight',
    level: 'Medium',
    skills: ['Sprite classes', 'Health bars', 'Firing patterns', 'Collision with dokill', 'Phases and timers'],
    minimum: [
      'Add a player that moves and shoots',
      'Add a boss with a health value',
      'Damage the boss on laser hits',
      'Give the boss a firing pattern',
      'Win when boss health hits 0 and lose on a player hit',
    ],
    stretch: [
      'Add multiple boss attack phases',
      'Draw a boss health bar UI',
      'Add a brief invincibility flash after a hit',
    ],
  },
]

export const builder = {
  steps: [
    { id: 'type', label: 'Choose game type', options: ['Collector', 'Dodge', 'Space Shooter Variant', 'Maze'] },
    { id: 'action', label: 'Choose the player action', options: ['Move with arrows', 'Click to collect', 'Ship shoots'] },
    { id: 'objective', label: 'Choose the objective', options: ['Survive as long as possible', 'Reach a score', 'Reach the exit'] },
    { id: 'scoring', label: 'Choose win/lose', options: ['Timer', 'Lives', 'Score target'] },
  ],
  generate: (c) => {
    const shooting = c.action === 'Ship shoots'
    const clicking = c.action === 'Click to collect'
    const reachExit = c.objective === 'Reach the exit'
    const lives = c.scoring === 'Lives'
    const timer = c.scoring === 'Timer'

    const checklist = []

    checklist.push('Open a window with pygame.display.set_mode and run a while running loop that polls pygame.event.get().')

    if (clicking) {
      checklist.push('Detect mouse clicks with pygame.MOUSEBUTTONDOWN and check them against target rects.')
    } else if (shooting) {
      checklist.push('Add a ship that moves with the arrow keys and fires lasers with get_just_pressed()[K_SPACE].')
    } else {
      checklist.push('Add a player sprite that moves with the arrow keys and multiplies movement by dt.')
    }

    if (c.type === 'Maze') {
      checklist.push('Build the maze as a grid of wall rects the player must navigate around.')
    } else if (c.type === 'Space Shooter Variant') {
      checklist.push('Spawn meteors on a timer using pygame.event.custom_type() and pygame.time.set_timer(...).')
    } else if (c.type === 'Dodge') {
      checklist.push('Spawn falling hazards on a timer so there is always something to avoid.')
    } else {
      checklist.push('Spawn collectible items on a timer or at fixed spots for the player to grab.')
    }

    if (clicking) {
      checklist.push('Confirm each click with rect.collidepoint(event.pos) on a target.')
    } else {
      checklist.push('Use pygame.sprite.spritecollide against the right group with dokill=True.')
    }

    if (lives) {
      checklist.push('Track lives, lose one on a bad collision, and end the game when lives hit 0.')
    } else if (timer) {
      checklist.push('Track elapsed time with pygame.time.get_ticks() and use it as the win/lose clock.')
    } else {
      checklist.push('Keep a score that increases on each grab or kill and end the game at the target.')
    }

    if (reachExit) {
      checklist.push('End with a win when the player sprite reaches the exit rect.')
    } else if (c.objective === 'Reach a score') {
      checklist.push('End with a win when the score target is met.')
    } else {
      checklist.push('End the game (running = False) when the player loses all lives or the timer runs out.')
    }

    const stretch = []
    stretch.push('Add a start screen and a game-over screen that lets the player press R to restart.')
    stretch.push('Add sound effects with pygame.mixer.Sound on key events.')
    if (shooting) {
      stretch.push('Add different meteor sizes with different speeds and scores.')
    } else {
      stretch.push('Add power-ups that change player speed or grant extra lives.')
    }
    if (c.type === 'Maze') {
      stretch.push('Generate a new maze layout each run.')
    } else {
      stretch.push('Increase the spawn rate over time so the game gets harder the longer you survive.')
    }

    const name = `${c.type}: ${c.objective}`
    return { name, checklist, stretch }
  },
}

export default projects
