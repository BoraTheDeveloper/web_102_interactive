// Space Shooter repair: a sprite is created but never drawn. Based on the
// groups + all_sprites.draw in game_dev/space_shooter/w9_final.py.

const spriteGroupNoDraw = {
  slug: 'repair-sprite-group-no-draw',
  title: 'My sprite exists but never appears',
  symptom:
    'I create a sprite and update its position in code, but it never shows up on the screen. No error, just an invisible object.',
  likelyCause:
    'The sprite was created but **not added to the all_sprites group**, so `all_sprites.draw(display_surface)` has nothing to draw for it. In w9_final.py every sprite is passed its groups, e.g. `Star(all_sprites, star_surf)`. It can also be that `all_sprites.draw(display_surface)` is missing, or that draw is called BEFORE `display_surface.fill(...)`, so the fill paints over the sprites.',
  whereToCheck: [
    'When you create the sprite, confirm all_sprites is in the groups: Star(all_sprites, star_surf).',
    'Check the loop has all_sprites.draw(display_surface) every frame.',
    'Make sure draw runs AFTER display_surface.fill(BACKGROUND_COLOR), not before.',
    'Confirm the sprite class calls super().__init__(groups) so it actually joins the group.',
  ],
  checklist: [
    { id: 'sgnd-1', label: 'Pass all_sprites when creating the sprite', hint: 'Star(all_sprites, star_surf)' },
    { id: 'sgnd-2', label: 'Call super().__init__(groups) in the class', hint: 'Otherwise it is not really in the group.' },
    { id: 'sgnd-3', label: 'Fill the screen first', hint: 'display_surface.fill(BACKGROUND_COLOR)' },
    { id: 'sgnd-4', label: 'Draw all_sprites after the fill', hint: 'all_sprites.draw(display_surface)' },
    { id: 'sgnd-5', label: 'End the frame with display.update()', hint: 'Push the drawn frame to the monitor.' },
  ],
  fixCode: `# creating sprites with the group:
for i in range(20):
    Star(all_sprites, star_surf)
player = Player(all_sprites)

# inside the loop, in this order:
display_surface.fill(BACKGROUND_COLOR)
all_sprites.draw(display_surface)
pygame.display.update()`,
}

export default spriteGroupNoDraw
