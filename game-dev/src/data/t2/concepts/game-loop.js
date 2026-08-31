// Visual concept: Game Loop. The demo IS a multi-frame Trace that drives the
// built-in spaceShooter scene. Trace style: frame -> input -> update ->
// collision -> draw. Based on game_dev/space_shooter/w9_final.py.

const gameLoop = {
  slug: 'game-loop',
  title: 'Game Loop',
  subtitle: 'The same steps every frame',
  recap:
    'The game loop runs the **same steps every frame**: read input, update positions, check collisions, wipe the screen, draw everything, then push it to the monitor with `pygame.display.update()`. Understanding the order is the key to debugging Pygame.',

  demo: {
    kind: 'gameLoop',
    config: {
      code: `while running:
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    all_sprites.update(dt)
    collisions()

    display_surface.fill(BACKGROUND_COLOR)
    all_sprites.draw(display_surface)
    display_score()
    pygame.display.update()`,
      sceneKind: 'spaceShooter',
      state: {
        frame: 0,
        player: { x: 240, y: 250 },
        meteors: [{ x: 120, y: 50 }],
        lasers: [{ x: 246, y: 220 }],
        score: 0,
      },
      inspector: (s) => [
        { label: 'frame', value: s.frame },
        { label: 'player', value: `(${s.player.x}, ${s.player.y})` },
        { label: 'meteors', value: (s.meteors || []).length },
        { label: 'lasers', value: (s.lasers || []).length },
        { label: 'score', value: s.score },
      ],
      steps: [
        { lines: [1, 2], frame: 'Frame 1', label: '1 · start frame, get dt', desc: 'clock.tick(60) returns the ms since last frame; /1000 gives dt in seconds.', apply: (s) => ({ ...s, frame: 1, score: 1 }) },
        { lines: [4, 5], label: '2 · handle events', desc: 'Check the event queue. No QUIT this frame, so running stays True.' },
        { lines: [8], label: '3 · all_sprites.update(dt)', desc: 'Every sprite runs its update: the player reads keys, the meteor falls, the laser rises.', apply: (s) => ({ ...s, player: { x: 246, y: 250 }, meteors: [{ x: 120, y: 90 }], lasers: [{ x: 246, y: 190 }] }) },
        { lines: [9], label: '4 · collisions()', desc: 'Check laser-vs-meteor and player-vs-meteor. No overlap yet this frame.' },
        { lines: [11], label: '5 · fill background', desc: 'screen.fill wipes the previous frame so old drawings do not smear.' },
        { lines: [12], label: '6 · draw sprites', desc: 'all_sprites.draw blits every sprite image onto the surface.' },
        { lines: [13], label: '7 · draw score', desc: 'The score text is rendered on top of the sprites.' },
        { lines: [14], label: '8 · display.update()', desc: 'Push the finished frame to the screen. Frame 1 is complete.' },
        { lines: [1, 2], frame: 'Frame 2', label: '9 · next frame, new dt', desc: 'The loop repeats from the top with a fresh dt.', apply: (s) => ({ ...s, frame: 2, score: 2 }) },
        { lines: [8], label: '10 · update again', desc: 'The meteor keeps falling and the laser keeps rising. They are about to overlap.', apply: (s) => ({ ...s, meteors: [{ x: 120, y: 130 }], lasers: [{ x: 246, y: 130 }] }) },
        { lines: [9], label: '11 · collision! laser hits meteor', desc: 'spritecollide(laser, meteor_sprites, True) is True, so the meteor (and laser) are killed.', apply: (s) => ({ ...s, meteors: [], lasers: [] }) },
        { lines: [11, 12, 13, 14], label: '12 · draw + update', desc: 'The screen now shows no meteor. Frame 2 is complete and the loop starts Frame 3.' },
      ],
    },
  },

  snippet: {
    code: `clock = pygame.time.Clock()
running = True

while running:
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    all_sprites.update(dt)
    collisions()

    display_surface.fill(BACKGROUND_COLOR)
    all_sprites.draw(display_surface)
    display_score()
    pygame.display.update()`,
  },

  commonMistake: {
    why: 'Without `display_surface.fill()` each frame, the old drawings stay on the surface and new ones pile on top, leaving a smear or trail behind every moving object.',
    code: `while running:
    all_sprites.update(dt)
    all_sprites.draw(display_surface)  # no fill first!
    pygame.display.update()`,
    fix: 'Call `display_surface.fill(BACKGROUND_COLOR)` BEFORE `all_sprites.draw` so the previous frame is wiped clean.',
  },
}

export default gameLoop
