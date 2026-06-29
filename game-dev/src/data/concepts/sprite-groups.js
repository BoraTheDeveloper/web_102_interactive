// Visual concept: Sprite Groups. Demo shows one sprite belonging to several
// groups. Grounded in game_dev/space_shooter/w9_final.py (all_sprites,
// meteor_sprites, laser_sprites; all_sprites.update(dt) / .draw(surface)).

const spriteGroup = {
  slug: 'sprite-groups',
  title: 'Sprite Groups',
  subtitle: 'Update and draw many sprites at once',
  recap:
    'A `pygame.sprite.Group` holds many sprites. One call, `all_sprites.update(dt)`, runs every sprite `update`, and `all_sprites.draw(surface)` blits them all. A single sprite can live in **multiple groups** -- `all_sprites` for drawing plus a `meteor_sprites` group for collision.',

  demo: {
    kind: 'spriteGroup',
    config: {
      caption:
        'Pick a sprite. It can be in more than one group: all_sprites drives update() and draw() for everything, while collision_groups hold only what can hit.',
    },
  },

  snippet: {
    code: `# a sprite can join MORE than one group at creation
all_sprites = pygame.sprite.Group()
meteor_sprites = pygame.sprite.Group()

Meteor((all_sprites, meteor_sprites), meteor_surf)  # in BOTH groups

# one call updates -- and draws -- every sprite in the group
all_sprites.update(dt)
all_sprites.draw(display_surface)`,
  },

  commonMistake: {
    why: 'A sprite added to `meteor_sprites` but not `all_sprites` is never drawn, because `all_sprites.draw` does not know about it. And calling `update` or `draw` on a single sprite instead of the group either runs one sprite or throws, since `Sprite` has no `draw` method.',
    code: `# BUG: added to meteor_sprites but not all_sprites -> never drawn
Meteor(meteor_sprites, meteor_surf)

# BUG: calling update/draw on a single sprite instead of the group
meteor.update(dt)     # only this one meteor updates; the rest freeze
meteor.draw(screen)   # AttributeError: Sprite has no .draw()`,
    fix: 'Add sprites to `all_sprites` (so they draw) plus any extra groups they need, then call `all_sprites.update(dt)` and `all_sprites.draw(surface)` on the **group**, not on individual sprites.',
  },
}

export default spriteGroup
