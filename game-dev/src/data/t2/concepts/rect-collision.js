// Visual concept: Rect Collision. Demo shows two draggable rects with a live
// colliderect() readout. Grounded in game_dev/space_shooter/w9_final.py
// (spritecollide(player, meteor_sprites, True)).

const rectCollision = {
  slug: 'rect-collision',
  title: 'Rect Collision',
  subtitle: 'Overlap rects, do not compare pixels',
  recap:
    'Collision in Pygame is **rect overlap**, not exact pixel matches. Use `rect.colliderect(other_rect)` for two rects, or `pygame.sprite.spritecollide(sprite, group, dokill)` to test one sprite against every sprite in a group.',

  demo: {
    kind: 'rectCollision',
    config: {
      caption:
        'Drag either rectangle. colliderect() is True only while they overlap -- that overlap test is how Pygame decides a hit happened.',
    },
  },

  snippet: {
    code: `# 1) Compare two rects directly with colliderect
if player.rect.colliderect(meteor.rect):
    print("hit!")

# 2) Or test one sprite against a whole group with spritecollide
#    spritecollide(sprite, group, dokill) -> list of hit sprites
if pygame.sprite.spritecollide(player, meteor_sprites, True):
    running = False  # the collided meteor is auto-killed (True)`,
  },

  commonMistake: {
    why: 'Comparing `player_x == meteor_x` only matches when the two share an exact pixel column, so almost every real overlap slips through. And calling `image.get_rect()` fresh returns a rect at `(0, 0)` (it carries no position), so it "collides" with the corner instead of the sprite.',
    code: `# BUG: comparing single numbers misses almost every overlap
if player_x == meteor_x and player_y == meteor_y:
    take_damage()  # true only when pixels line up exactly

# BUG: image.get_rect() is always at (0, 0) -- it has no position
if player.rect.colliderect(meteor.image.get_rect()):
    explode()  # always overlaps the top-left corner`,
    fix: 'Compare **rects**, not coordinates: `player.rect.colliderect(meteor.rect)`. Set `self.rect = self.image.get_frect(center=...)` once in `__init__` and reuse that positioned rect.',
  },
}

export default rectCollision
