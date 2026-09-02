// Visual concept: Game States, traced on the W7 Collector.
// Source: game_dev/docs/2026_t3/slides/W7 - Game Anatomy and the One-Sentence Pitch.md
// (slides 14 to 21) and W9 slide 23 for the "inside changes, outside shows" rule.
// The scene is the collector with a `state`, so the canvas text follows the
// same three branches the code does. One analogy only: rooms.

const t3GameStates = {
  slug: 't3-game-states',
  title: 'Game States',
  subtitle: 'One variable, three rooms, and a door that asks before it opens',
  recap:
    'A game stands in **one room at a time**: `"start"`, `"playing"` or `"gameover"`. One variable, `state`, says which. `==` **asks** which room you are in. `=` **moves** you to a new one. Everything that **changes** the game goes inside `if state == "playing":`. Everything that **shows** the game stays outside, so the window keeps drawing and keeps closing in every room.',

  demo: {
    kind: 'trace',
    config: {
      code: `state = "start"
score = 0

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if state == "start" and event.key == pygame.K_SPACE:
                state = "playing"

    if state == "playing":
        all_sprites.update(dt)
        hits = pygame.sprite.spritecollide(player, coin_group, False)
        for hit in hits:
            score += 1
            hit.respawn()
            if score >= 10:
                state = "gameover"

    screen.fill("midnightblue")
    all_sprites.draw(screen)
    if state == "start":
        screen.blit(font.render("SPACE to start", True, "white"), (300, 300))
    elif state == "gameover":
        screen.blit(font.render("You collected 10!", True, "white"), (280, 300))
    else:
        screen.blit(font.render(f"Score: {score}", True, "white"), (20, 20))
    pygame.display.update()`,
      sceneKind: 'collector',
      state: {
        frame: 0,
        state: 'start',
        player: { x: 380, y: 280, width: 40, height: 40 },
        item: { x: 445, y: 285, width: 30, height: 30 },
        score: 9,
      },
      inspector: (s) => [
        { label: 'frame', value: s.frame },
        { label: 'state', value: `"${s.state}"` },
        { label: 'score', value: s.score },
        { label: 'player.x', value: Math.round(s.player.x) },
      ],
      steps: [
        {
          lines: [4],
          frame: 'Frame 1',
          label: '1 · top of the loop, in the start room',
          desc: 'state is "start". The window is open and the player is drawn, but nothing has moved yet.',
          apply: (s) => ({ ...s, frame: 1 }),
        },
        {
          lines: [5, 6, 7, 8],
          label: '2 · read events: nothing pressed',
          desc: 'No QUIT and no KEYDOWN this frame. The event loop is outside every room, so it runs no matter where the game stands.',
        },
        {
          lines: [12],
          label: '3 · the door asks: are we playing?',
          desc: 'Two equals signs. state == "playing" is False, so the whole block under it is skipped. update never runs, so the player is frozen.',
        },
        {
          lines: [20, 21, 22, 23],
          label: '4 · draw the start room',
          desc: 'fill and draw run in every room. Then the if picks the text: "SPACE to start". Frame 1 done, and the player is exactly where it began.',
        },
        {
          lines: [4],
          frame: 'Frame 2',
          label: '5 · back to the top',
          desc: 'Still "start". Hold Left as much as you like: nothing under the door runs.',
          apply: (s) => ({ ...s, frame: 2 }),
        },
        {
          lines: [8, 9, 10],
          label: '6 · KEYDOWN SPACE: move rooms',
          desc: 'KEYDOWN fires once per press, so a finger resting on SPACE at launch does not skip the start room. One equals sign: state is now "playing".',
          delta: () => ({ state: { from: '"start"', to: '"playing"' } }),
          apply: (s) => ({ ...s, state: 'playing' }),
        },
        {
          lines: [12, 13],
          label: '7 · the door opens',
          desc: 'state == "playing" is True this time. all_sprites.update(dt) runs and the player moves right.',
          delta: (s) => ({ 'player.x': { from: Math.round(s.player.x), to: Math.round(s.player.x) + 5 } }),
          apply: (s) => ({ ...s, player: { ...s.player, x: s.player.x + 5 } }),
        },
        {
          lines: [14, 15],
          label: '8 · ask the team who touched you',
          desc: 'spritecollide returns an empty list. The player right edge is at 425 and the coin starts at 445. No hit, so the for loop body never runs.',
        },
        {
          lines: [20, 21, 27, 28],
          label: '9 · draw the playing room',
          desc: 'Same fill, same draw. The else branch shows the score. Nothing about drawing changed, only which text.',
        },
        {
          lines: [4],
          frame: 'Frame 3',
          label: '10 · top again, still playing',
          apply: (s) => ({ ...s, frame: 3 }),
          desc: 'No key this frame. state is still "playing" because nothing moved it.',
        },
        {
          lines: [12, 13],
          label: '11 · door open, update runs',
          desc: 'Right is still held. Another 5 px and the player right edge is 430, inside the coin. Let the trace jump ahead to the frame it actually touches.',
          delta: (s) => ({ 'player.x': { from: Math.round(s.player.x), to: 445 } }),
          apply: (s) => ({ ...s, player: { ...s.player, x: 445 } }),
        },
        {
          lines: [14, 15, 16, 17],
          label: '12 · a hit: score and respawn',
          desc: 'hits has one coin in it. score goes to 10 and hit.respawn() moves the coin. False kept the coin alive, so there is still one to move.',
          delta: (s) => ({ score: { from: s.score, to: s.score + 1 } }),
          apply: (s) => ({ ...s, score: s.score + 1, item: { ...s.item, x: 620, y: 120 } }),
        },
        {
          lines: [18, 19],
          label: '13 · 10 or more: move rooms again',
          desc: 'Inside the for loop, so it only runs on a hit, not sixty times a second. >= not ==, in case two coins land in one frame. state is now "gameover".',
          delta: () => ({ state: { from: '"playing"', to: '"gameover"' } }),
          apply: (s) => ({ ...s, state: 'gameover' }),
        },
        {
          lines: [20, 21, 24, 25],
          label: '14 · draw the gameover room',
          desc: 'The player is still drawn where it stopped. The elif picks the message. From the next frame on, the door stays shut and nothing moves. Same variable, one line of text decides what you see.',
        },
      ],
    },
  },

  snippet: {
    code: `state = "start"

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if state == "start" and event.key == pygame.K_SPACE:
                state = "playing"

    # inside the door: everything that CHANGES the game
    if state == "playing":
        all_sprites.update(dt)
        hits = pygame.sprite.spritecollide(player, coin_group, False)
        for hit in hits:
            score += 1
            hit.respawn()
            if score >= 10:
                state = "gameover"

    # outside the door: everything that SHOWS the game
    screen.fill("midnightblue")
    all_sprites.draw(screen)
    if state == "start":
        screen.blit(font.render("SPACE to start", True, "white"), (300, 300))
    elif state == "gameover":
        screen.blit(font.render("You collected 10!", True, "white"), (280, 300))
    else:
        screen.blit(font.render(f"Score: {score}", True, "white"), (20, 20))
    pygame.display.update()`,
  },

  commonMistake: {
    why: 'Leaving `all_sprites.update(dt)` outside the door. The start screen still shows and the player is still drawn, so it looks fine. But hold Left on the title screen and the player is moving the whole time. You cannot see it move because the start branch is drawing, not the score branch. Press SPACE and the player is already across the room. Not being drawn is not the same as not running.',
    code: `    all_sprites.update(dt)          # outside: runs in every room

    if state == "playing":
        hits = pygame.sprite.spritecollide(player, coin_group, False)
        for hit in hits:
            score += 1
            hit.respawn()`,
    fix: 'Indent `all_sprites.update(dt)` one level, under `if state == "playing":`. The rule is the same for every line that changes the game: inside the door. Drawing and the event loop stay outside, so the window still closes when you have won.',
  },
}

export default t3GameStates
