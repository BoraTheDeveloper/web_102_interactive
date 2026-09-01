// Visual concept: Delta Time.
// Source: game_dev/docs/2026_t3/slides/W5 - Classes Blueprint for Game Objects.md.
// Introduced in W5 alongside classes, which is why speed changed from 5 to 300.

const deltaTime = {
  slug: 'delta-time',
  title: 'Delta Time',
  subtitle: 'Speed in pixels per second, not pixels per frame',
  recap:
    '`dt = clock.tick(60) / 1000` is how many **seconds** the last frame took. Multiply every movement by it and speed stops depending on the computer. Without dt, `rect.x += 5` means five pixels per frame, so a fast machine runs the game fast and a slow one runs it in slow motion.',

  demo: {
    kind: 'deltaTime',
    config: {
      caption:
        'Drag the FPS slider. The red square uses rect.x += speed and its real speed follows the frame rate. The green one multiplies by dt and covers the same ground per second no matter what the slider says.',
    },
  },

  snippet: {
    code: `clock = pygame.time.Clock()

while running:
    dt = clock.tick(60) / 1000   # seconds since the last frame, about 0.016

    # 300 pixels per SECOND. At 60 fps that is 300 * 0.016, about 4.8 a frame.
    if keys[pygame.K_RIGHT]:
        self.rect.x += self.speed * dt`,
  },

  commonMistake: {
    why: 'Adding `* dt` but leaving last week\'s speed number alone. `self.speed = 5` with `* dt` is 5 * 0.016, about 0.08 pixels a frame, so roughly five pixels a **second**. The player crawls and it looks like dt broke the movement. It did not: 5 was a per frame number and dt needs a per second one.',
    code: `self.speed = 5                          # a per-frame number from Week 4
self.rect.x += self.speed * dt          # 0.08 px a frame: it crawls`,
    fix: 'When you multiply by dt, the speed becomes pixels per second. Multiply the old number by roughly 60: `5` a frame is about `300` a second.',
  },
}

export default deltaTime
