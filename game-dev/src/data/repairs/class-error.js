// Space Shooter repair: a Sprite class throws or does nothing. Based on the
// sprite classes in game_dev/space_shooter/w9_final.py.

const classError = {
  slug: 'repair-class-error',
  title: 'My sprite class errors or does nothing',
  symptom:
    'I get an error like "AttributeError: Player object has no attribute rect", or my sprite class runs without errors but the sprite never shows up and never moves.',
  likelyCause:
    'The Sprite class is missing `super().__init__(groups)` as the FIRST line of `__init__`. Without it the object never joins the groups, so `all_sprites.update` and `all_sprites.draw` skip it. It can also be an `update(self)` signature with no `dt` parameter, so `all_sprites.update(dt)` passes an argument the method does not accept and crashes.',
  whereToCheck: [
    'In every Sprite __init__, confirm the first line is super().__init__(groups).',
    'Check update has the dt parameter: def update(self, dt):, matching all_sprites.update(dt).',
    'Make sure __init__ takes self: def __init__(self, groups):.',
    'Confirm you create the sprite with the groups, e.g. Player(all_sprites), not Player().',
  ],
  checklist: [
    { id: 'ce-1', label: 'Call super().__init__(groups) first', hint: 'This is what makes it a real Sprite and adds it to the groups.' },
    { id: 'ce-2', label: 'Define __init__(self, groups)', hint: 'Do not forget self as the first parameter.' },
    { id: 'ce-3', label: 'Set self.image and self.rect in __init__', hint: 'image = loaded surface; rect = image.get_frect(...).' },
    { id: 'ce-4', label: 'Give update a dt parameter', hint: 'def update(self, dt): so the loop can pass dt in.' },
    { id: 'ce-5', label: 'Create the sprite with its groups', hint: 'player = Player(all_sprites) actually adds it.' },
  ],
  fixCode: `class Player(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)  # MUST be first
        self.image = pygame.image.load(join("images", "player.png")).convert_alpha()
        self.rect = self.image.get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))
        self.speed = 300

    def update(self, dt):  # dt must be here
        keys = pygame.key.get_pressed()
        self.rect.centerx += keys[pygame.K_RIGHT] * self.speed * dt`,
}

export default classError
