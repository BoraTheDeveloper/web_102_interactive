// Visual concept: Delta Time. Demo runs two players -- one with speed, one
// with speed * dt -- at a slider-controlled FPS. Grounded in
// game_dev/space_shooter/w9_final.py (dt = clock.tick(60) / 1000; * dt).

const deltaTime = {
  slug: 'delta-time',
  title: 'Delta Time',
  subtitle: 'Movement that ignores frame rate',
  recap:
    '`clock.tick(60)` returns the milliseconds since the last frame; dividing by `1000` gives `dt` in **seconds**. Multiply every movement by `dt` so a speed in pixels-per-second stays the same real-world speed no matter how fast or slow the computer is.',

  demo: {
    kind: 'deltaTime',
    config: {
      caption:
        'Change the frame rate. The red player (no dt) speeds up at high FPS and slows at low FPS. The green player (speed * dt) moves at the same real speed regardless.',
    },
  },

  snippet: {
    code: `clock = pygame.time.Clock()

while running:
    dt = clock.tick(60) / 1000  # seconds since the last frame

    # speed is pixels-per-second; * dt gives this frame's move
    player.rect.centerx += player.speed * dt
    meteor.rect.y += meteor.speed * dt`,
  },

  commonMistake: {
    why: 'Without `dt`, speed becomes "pixels per frame", so it depends on the frame rate: the same game blazes on a fast PC (144 FPS) and crawls on a slow one (30 FPS). Multiplying by `dt` converts pixels-per-second into the correct per-frame step.',
    code: `# BUG: no dt -> speed is "pixels per frame", tied to the frame rate
# fast PC (144 FPS) -> meteor blazes across; slow PC (30 FPS) -> meteor crawls
while running:
    clock.tick(60)
    meteor.rect.y += 400  # 400 px every frame, not every second`,
    fix: 'Compute `dt = clock.tick(60) / 1000` each frame and always move by `speed * dt`, with `speed` in pixels-per-second.',
  },
}

export default deltaTime
