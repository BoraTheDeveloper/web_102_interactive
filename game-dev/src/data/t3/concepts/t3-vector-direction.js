// Visual concept: Vectors and Direction, the W7 fix for W3's diagonal bug.
// Source: game_dev/docs/2026_t3/slides/W7 - Game Anatomy and the One-Sentence Pitch.md
// slides 10 to 12, and W3 slide 15 where the bug was planted on purpose.
// No vector maths beyond length and direction. No self.pos: the FRect is the box.

const t3VectorDirection = {
  slug: 't3-vector-direction',
  title: 'Vectors and Direction',
  subtitle: 'Why diagonal was faster, and the one line that makes it fair',
  recap:
    'Since Week 3, holding Right and Down together moved you **1.41 steps**, not 1. Each `if` added a whole step of its own, and the corner of a square is longer than its side. A `pygame.Vector2` holds x and y **together**, so the four `if`s build **one arrow** instead of making four moves. `direction.length()` is how long the arrow is. `direction.normalize()` shrinks it to length exactly **1**, same direction. Then one line moves the box: `self.rect.center += direction * self.speed * dt`. The box is an FRect, so it keeps the decimals.',

  demo: {
    kind: 'vectorDirection',
    config: {},
  },

  snippet: {
    code: `def update(self, dt):
    keys = pygame.key.get_pressed()
    direction = pygame.Vector2(0, 0)
    if keys[pygame.K_LEFT]:          # four separate ifs, still not elif
        direction.x -= 1
    if keys[pygame.K_RIGHT]:
        direction.x += 1
    if keys[pygame.K_UP]:
        direction.y -= 1
    if keys[pygame.K_DOWN]:
        direction.y += 1

    if direction.length() > 0:       # standing still has length 0
        direction = direction.normalize()

    self.rect.center += direction * self.speed * dt
    self.rect.clamp_ip(screen.get_frect())   # still last`,
  },

  commonMistake: {
    why: 'Calling `normalize()` with no guard. The moment you let go of every key, `direction` is `(0, 0)`, its length is 0, and there is no direction to keep. Python stops the game with `ValueError: Can\'t normalize Vector of length zero`. The message names the fix.',
    code: `    direction = direction.normalize()     # crashes when nothing is held

    self.rect.center += direction * self.speed * dt`,
    fix: 'Wrap it: `if direction.length() > 0: direction = direction.normalize()`. The guard is not decoration. Without it, standing still crashes the game. And delete the old four `self.rect.x +=` lines, or the player moves twice.',
  },
}

export default t3VectorDirection
