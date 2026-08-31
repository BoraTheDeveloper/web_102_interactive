// Visual concept: Collision Groups. spritecollide and groupcollide check
// one sprite (or a whole group) against every sprite in another group.
// Based on the collisions() function in game_dev/space_shooter/w9_final.py.

const collisionGroups = {
  slug: 'collision-groups',
  title: 'Collision Groups',
  subtitle: 'Check one sprite against a whole group',
  recap:
    'When you have many lasers and many meteors, checking them one by one with `colliderect` is tedious. `pygame.sprite.spritecollide(sprite, group, True)` checks one sprite against **every** sprite in a group and removes the hit ones when `True` (dokill). `groupcollide(group1, group2, True, True)` checks two entire groups against each other.',

  demo: {
    kind: 'collisionGroups',
    config: {
      caption:
        'Click Fire Laser to shoot. Meteors spawn automatically. When a laser overlaps a meteor, both are removed — that is spritecollide(laser, meteor_sprites, True) in action. Watch the collision counter.',
    },
  },

  snippet: {
    code: `def collisions():
    global running
    # Player vs meteor group: dokill=True removes the meteor
    if pygame.sprite.spritecollide(player, meteor_sprites, True):
        running = False

    # Laser vs meteor group: check each laser
    for laser in laser_sprites:
        if pygame.sprite.spritecollide(laser, meteor_sprites, True):
            laser.kill()
            explosion_sound.play()`,
  },

  commonMistake: {
    why: 'Forgetting `dokill=True` (the third argument). Without it, the meteor is **detected** but **not removed**, so the same collision fires every frame.',
    code: `# WRONG: meteor is detected but never removed
if pygame.sprite.spritecollide(player, meteor_sprites, False):
    running = False  # the meteor is still there next frame`,
    fix: 'Pass `True` as the third argument to remove the hit sprite from the group: `spritecollide(sprite, group, True)`.',
  },
}

export default collisionGroups
