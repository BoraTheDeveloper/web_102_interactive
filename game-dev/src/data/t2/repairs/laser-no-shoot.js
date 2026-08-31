// Space Shooter repair: pressing space fires no laser. Based on the firing
// code in Player.update (game_dev/space_shooter/w9_final.py).

const laserNoShoot = {
  slug: 'repair-laser-no-shoot',
  title: 'Pressing space does not shoot',
  symptom:
    'I press the space bar to fire a laser but nothing comes out of my ship. Sometimes I hear the laser sound, but no laser sprite appears.',
  likelyCause:
    'Space was checked with `pygame.key.get_pressed()[K_SPACE]`, which is True every frame the key is held and is the wrong tool for firing once on press. w9_final.py uses `pygame.key.get_just_pressed()[pygame.K_SPACE]`. It can also be that the Laser is created but **not added to both groups** `(all_sprites, laser_sprites)`, so it never draws and never collides.',
  whereToCheck: [
    'Check how space is read. get_just_pressed() fires once on the press; get_pressed() repeats every frame.',
    'When you create the Laser, confirm it is added to all_sprites AND laser_sprites, e.g. Laser((all_sprites, laser_sprites), ...).',
    'Make sure the Laser class calls super().__init__(groups) so it actually joins the groups.',
    'If the sound plays but no sprite appears, the Laser is being created but not added to a drawn group.',
  ],
  checklist: [
    { id: 'lns-1', label: 'Read space with get_just_pressed()', hint: 'recent_keys = pygame.key.get_just_pressed()' },
    { id: 'lns-2', label: 'Create the Laser only when space is just pressed', hint: 'if recent_keys[pygame.K_SPACE]:' },
    { id: 'lns-3', label: 'Add the Laser to both groups', hint: 'Laser((all_sprites, laser_sprites), laser_surf, self.rect.midtop)' },
    { id: 'lns-4', label: 'Call super().__init__(groups) in Laser', hint: 'Otherwise it is not a real group member.' },
    { id: 'lns-5', label: 'Play the sound at the same time', hint: 'laser_sound.play() next to the Laser(...) line.' },
  ],
  fixCode: `# inside Player.update(self, dt):
recent_keys = pygame.key.get_just_pressed()
if recent_keys[pygame.K_SPACE]:
    Laser((all_sprites, laser_sprites), laser_surf, self.rect.midtop)
    laser_sound.play()`,
}

export default laserNoShoot
