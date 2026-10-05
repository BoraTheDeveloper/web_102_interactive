// Visual concept: the camera, from the W9 platformer.
// Source: game_dev/docs/2026_t3/slides/W9 - Platformer A Complete Level.md
// slides 25 to 29 and section E. The camera is the reference project's
// AllSprites group (5 games/Platformer/Platform 1 logic/code/groups.py) with the
// vertical offset line removed. The demo is the class visualizer, tab 1:
// public/visualizers/w9-platformer.html is a copy of
// docs/2026_t3/slides/W9 - Platformer Visualizer.html, so re-copy it after
// editing the original.

const t3Camera = {
  slug: 't3-camera',
  title: 'The Camera',
  subtitle: 'World position, screen position, and the offset between them',
  recap:
    'The level is **1600** pixels wide and the window is **800**, so the window can only show half of it. The window becomes a **camera**, and every sprite now has two positions. Its **world position** is where it lives in the level: `player.rect.x` can be 1200. Its **screen position** is where it is drawn, always between 0 and 800. One number turns the first into the second: `screen position = world position + offset`, with `offset.x = -(player x - WIDTH / 2)`. With the player at world x 1000 the offset is -600, so a platform at world x 1240 is drawn at 640 and the player is drawn at 400, the middle. Walk right and the offset gets more negative: the player stays in the middle and the **world slides left** under them. The camera never touches `rect`. Landing, the win check and the lose check all keep using world positions. Only drawing adds the offset, and the "You win!" text skips it, because text belongs to the window, not the level.',

  demo: {
    kind: 'embed',
    config: {
      page: 'visualizers/w9-platformer.html',
      tab: 'camera',
      title: 'Camera visualizer',
      hint: 'Click the game first, then use ← → and Space. Untick "Camera on" and walk right to see the player leave the window. Tick "Side clamp uses WIDTH" to see the invisible wall.',
    },
  },

  snippet: {
    code: `class AllSprites(pygame.sprite.Group):
    def __init__(self):
        super().__init__()
        self.display_surface = pygame.display.get_surface()
        self.offset = pygame.Vector2()

    def draw(self, target_pos):
        # how far right of the middle the player is, slid back the other way
        self.offset.x = -(target_pos[0] - WIDTH / 2)

        for sprite in self:
            # world position + offset = screen position
            self.display_surface.blit(sprite.image, sprite.rect.topleft + self.offset)


all_sprites = AllSprites()  # was pygame.sprite.Group()

# in the game loop
all_sprites.draw(player.rect.center)  # was all_sprites.draw(screen)

# in Player.update: the side clamp now uses the level's width, not the window's
self.rect.x = max(0, min(self.rect.x, LEVEL_WIDTH - self.rect.width))`,
  },

  commonMistake: {
    why: 'Leaving the old `all_sprites.draw(screen)` line in the game loop next to the new one. The game crashes on the first frame with `TypeError: \'pygame.surface.Surface\' object is not subscriptable`, and the error points at `target_pos[0]`. The new `draw` expects a position. Handed `screen` instead, it tries to read item `[0]` of a Surface, and a Surface is not a list.',
    code: `    screen.fill("skyblue")
    all_sprites.draw(screen)  # the old line, still running
    all_sprites.draw(player.rect.center)`,
    fix: 'Comment out the old line. Exercise 6 has **two** old lines tagged `EXERCISE 6: comment this out`, far apart in the file, so search for the tag to find both. Once it runs, the next trap is the side clamp: with `WIDTH` the player stops at an invisible wall at world x 760. `WIDTH` is the window. `LEVEL_WIDTH` is the world.',
  },
}

export default t3Camera
