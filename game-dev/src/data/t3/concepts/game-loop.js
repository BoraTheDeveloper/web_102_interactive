// Visual concept: Game Loop, traced on the Collector.
// Source: game_dev/docs/2026_t3/slides/W4 - Game Mechanics and Logic.md (section E).
// W4's loop, not W5's, because W4 is the loop every student has actually typed
// line by line. Classes arrive a week later and change the shape, not the order.

const gameLoop = {
  slug: 'game-loop',
  title: 'Game Loop',
  subtitle: 'The same five jobs, in the same order, every frame',
  recap:
    'A game loop does the **same five jobs every frame**: read events, read input, update positions, check collisions, then wipe and draw. The order is not a style choice. Move one job and the game breaks in a way that looks like a different bug entirely.',

  demo: {
    kind: 'gameLoop',
    config: {
      code: `while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]:
        player_rect.x += player_speed

    player_rect.clamp_ip(screen.get_frect())

    if player_rect.colliderect(item_rect):
        score += 1
        item_rect.x = randint(0, WIDTH - item_rect.width)

    screen.fill("midnightblue")
    pygame.draw.rect(screen, "dodgerblue", player_rect)
    pygame.draw.rect(screen, "gold", item_rect)
    pygame.display.update()`,
      sceneKind: 'collector',
      state: {
        frame: 0,
        player: { x: 380, y: 280, width: 40, height: 40 },
        item: { x: 425, y: 285, width: 30, height: 30 },
        score: 0,
      },
      inspector: (s) => [
        { label: 'frame', value: s.frame },
        { label: 'player_rect.x', value: Math.round(s.player.x) },
        { label: 'item_rect.x', value: Math.round(s.item.x) },
        { label: 'score', value: s.score },
      ],
      steps: [
        {
          lines: [1],
          frame: 'Frame 1',
          label: '1 · top of the loop',
          desc: 'running is still True, so the body runs again. One trip through this body is one frame.',
          apply: (s) => ({ ...s, frame: 1 }),
        },
        {
          lines: [2, 3, 4],
          label: '2 · read the event queue',
          desc: 'Every click and key press since the last frame is waiting here. No QUIT this frame, so running stays True.',
        },
        {
          lines: [6, 7, 8],
          label: '3 · read the keys and move',
          desc: 'get_pressed() is a snapshot of what is held down right now. Right is held, so x goes up by player_speed.',
          delta: (s) => ({ 'player_rect.x': { from: Math.round(s.player.x), to: Math.round(s.player.x) + 5 } }),
          apply: (s) => ({ ...s, player: { ...s.player, x: s.player.x + 5 } }),
        },
        {
          lines: [10],
          label: '4 · clamp back inside the screen',
          desc: 'clamp_ip corrects what the movement just did, so it has to run after it. The player is nowhere near an edge, so nothing changes this frame.',
        },
        {
          lines: [12],
          label: '5 · check the collision',
          desc: 'player_rect right edge is 425 and the item starts at 425. Edges that only touch do not overlap, so colliderect is False.',
        },
        {
          lines: [16],
          label: '6 · wipe the screen',
          desc: 'fill paints over the whole previous frame. Skip it and last frame stays behind, so the player smears into a stripe.',
        },
        {
          lines: [17, 18],
          label: '7 · draw everything',
          desc: 'Player first, then item. Whatever is drawn last sits on top.',
        },
        {
          lines: [19],
          label: '8 · show the frame',
          desc: 'Everything so far was painted on a hidden page. update() flips it to the monitor. Frame 1 is done.',
        },
        {
          lines: [1],
          frame: 'Frame 2',
          label: '9 · straight back to the top',
          desc: 'No pause, no waiting. The loop just starts again from line 1.',
          apply: (s) => ({ ...s, frame: 2 }),
        },
        {
          lines: [6, 7, 8],
          label: '10 · move again',
          desc: 'Right is still held. x goes up by another 5, so the player right edge is now 430 and it is inside the item.',
          delta: (s) => ({ 'player_rect.x': { from: Math.round(s.player.x), to: Math.round(s.player.x) + 5 } }),
          apply: (s) => ({ ...s, player: { ...s.player, x: s.player.x + 5 } }),
        },
        {
          lines: [12, 13, 14],
          label: '11 · collision fires',
          desc: 'colliderect is True. The if only answers a question. The two lines inside it are what actually score and respawn.',
          delta: () => ({ score: { from: 0, to: 1 } }),
          apply: (s) => ({ ...s, score: 1, item: { ...s.item, x: 620, y: 120 } }),
        },
        {
          lines: [16, 17, 18, 19],
          label: '12 · wipe, draw, show',
          desc: 'The item is drawn at its new spot, so on screen it looks like it teleported. Frame 2 is done and frame 3 starts.',
        },
      ],
    },
  },

  snippet: {
    code: `running = True

while running:
    # 1. events: what happened since last frame
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 2. input: what is held down right now
    keys = pygame.key.get_pressed()

    # 3. update: move things

    # 4. collisions: ask what is touching

    # 5. draw: wipe, then paint, then show
    screen.fill("midnightblue")
    pygame.display.update()

pygame.quit()`,
  },

  commonMistake: {
    why: 'Putting `pygame.quit()` inside the loop instead of after it. Nothing looks wrong when you read the file, because the indentation is only one level off. The program shuts Pygame down at the end of frame one, so the window dies immediately and every later drawing call fails.',
    code: `while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill("darkblue")
    pygame.display.update()
    pygame.quit()  # inside the loop: runs on frame 1`,
    fix: '`pygame.quit()` belongs flush left, **after** the loop. It is the very last thing the program does, not something that happens every frame.',
  },
}

export default gameLoop
