// Space Shooter repair: an image does not appear on screen. Based on the asset
// loading in game_dev/space_shooter/w9_final.py.

const imageMissing = {
  slug: 'repair-image-missing',
  title: 'My image does not show up',
  symptom:
    'I load an image with pygame.image.load but nothing appears in the window. I do not get an error, the screen is just empty.',
  likelyCause:
    'The image was loaded into a surface but it was **never drawn**. `pygame.image.load` only creates a surface in memory; nothing shows until you `blit` it or add the sprite to a group that `all_sprites.draw` blits for you. It can also be the wrong path in `join("images", "meteor.png")`, or forgetting `.convert_alpha()` so the transparency is wrong (though that usually shows a black box, not nothing).',
  whereToCheck: [
    'Print the path you pass to pygame.image.load and confirm the file really exists there. In w9_final.py it is join("images", "player.png").',
    'Check that .convert_alpha() is called on the loaded surface, e.g. pygame.image.load(...).convert_alpha().',
    'If the image belongs to a Sprite, confirm the sprite was added to all_sprites (passed into groups).',
    'Make sure all_sprites.draw(display_surface) runs every frame, AFTER display_surface.fill(...).',
  ],
  checklist: [
    { id: 'im-1', label: 'Load the surface once before the loop', hint: 'meteor_surf = pygame.image.load(join("images", "meteor.png")).convert_alpha()' },
    { id: 'im-2', label: 'Use the exact file path and name', hint: 'Pygame is case sensitive: meteor.png is not Meteor.png.' },
    { id: 'im-3', label: 'Add .convert_alpha() for transparency', hint: 'Without it the image may show a black box around it.' },
    { id: 'im-4', label: 'Add the sprite to all_sprites', hint: 'Meteor((all_sprites, meteor_sprites), meteor_surf), so the group draws it.' },
    { id: 'im-5', label: 'Call all_sprites.draw(display_surface) each frame', hint: 'draw blits every sprite image in the group onto the surface.' },
  ],
  fixCode: `# load once, before the loop
meteor_surf = pygame.image.load(join("images", "meteor.png")).convert_alpha()

# ...inside the loop, after fill:
all_sprites.draw(display_surface)
pygame.display.update()`,
}

export default imageMissing
