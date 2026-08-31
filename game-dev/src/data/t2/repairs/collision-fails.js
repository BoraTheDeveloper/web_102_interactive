// Space Shooter repair: collisions do not register. Based on the collisions()
// function in game_dev/space_shooter/w9_final.py.

const collisionFails = {
  slug: 'repair-collision-fails',
  title: 'Things pass through each other',
  symptom:
    'My laser hits a meteor but nothing happens. Or the meteor overlaps the player and the game does not end. The sprites just slide right through each other.',
  likelyCause:
    'The collision check uses the **wrong group or wrong rect**, or it runs before positions update. w9_final.py calls `pygame.sprite.spritecollide(player, meteor_sprites, True)` and `pygame.sprite.spritecollide(laser, meteor_sprites, True)`. If you swap the group (for example checking all_sprites) or call collisions() before all_sprites.update(dt), the rects have not moved yet so nothing overlaps.',
  whereToCheck: [
    'Confirm collisions() is called AFTER all_sprites.update(dt), so positions are current.',
    'Check the group in spritecollide: player checks meteor_sprites, lasers check meteor_sprites, not all_sprites.',
    'Confirm the third argument (dokill) is True so the hit meteor is removed: spritecollide(..., True).',
    'Make sure meteors and lasers are in the right groups, so spritecollide can actually find them.',
  ],
  checklist: [
    { id: 'cf-1', label: 'Update positions before checking collisions', hint: 'all_sprites.update(dt) then collisions().' },
    { id: 'cf-2', label: 'Check the player against meteor_sprites', hint: 'spritecollide(player, meteor_sprites, True)' },
    { id: 'cf-3', label: 'Check each laser against meteor_sprites', hint: 'for laser in laser_sprites: spritecollide(laser, meteor_sprites, True)' },
    { id: 'cf-4', label: 'Use dokill=True to remove the hit meteor', hint: 'The True flag kills the meteor on contact.' },
    { id: 'cf-5', label: 'Kill the laser and play a sound on a hit', hint: 'laser.kill(); explosion_sound.play()' },
  ],
  fixCode: `def collisions():
    global running
    if pygame.sprite.spritecollide(player, meteor_sprites, True):
        running = False
    for laser in laser_sprites:
        if pygame.sprite.spritecollide(laser, meteor_sprites, True):
            laser.kill()
            explosion_sound.play()

# in the loop, AFTER update:
all_sprites.update(dt)
collisions()`,
}

export default collisionFails
