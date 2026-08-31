// Space Shooter repair: the player will not move. Based on Player.update in
// game_dev/space_shooter/w9_final.py.

const playerNoMove = {
  slug: 'repair-player-no-move',
  title: 'My player will not move',
  symptom:
    'I press the arrow keys but my player sprite sits in the middle of the screen and never moves.',
  likelyCause:
    'The movement code reads the keys but **never writes to the rect**. In w9_final.py the player moves because `self.rect.center += self.direction * self.speed * dt`. If you only read `keys` and forget to update the rect, nothing on screen changes. It can also be that `all_sprites.update(dt)` is never called, or the player was never added to `all_sprites`.',
  whereToCheck: [
    'In Player.update, confirm you actually change self.rect (center, centerx, x, or y). Reading keys alone does not move anything.',
    'Check the main loop calls all_sprites.update(dt) every frame. Without it, update() never runs.',
    'Confirm the player was added to all_sprites: Player(all_sprites), so it is in the group that gets updated.',
    'Make sure Player.update(self, dt) takes dt, and the loop passes it: all_sprites.update(dt).',
  ],
  checklist: [
    { id: 'pnm-1', label: 'Read the keys with pygame.key.get_pressed()', hint: 'keys = pygame.key.get_pressed()' },
    { id: 'pnm-2', label: 'Build a direction from the arrow keys', hint: 'self.direction.x = int(keys[K_RIGHT]) - int(keys[K_LEFT])' },
    { id: 'pnm-3', label: 'Update self.rect with the movement', hint: 'self.rect.center += self.direction * self.speed * dt' },
    { id: 'pnm-4', label: 'Add the player to all_sprites', hint: 'player = Player(all_sprites)' },
    { id: 'pnm-5', label: 'Call all_sprites.update(dt) in the loop', hint: 'This is what actually calls Player.update each frame.' },
  ],
  fixCode: `class Player(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)
        self.image = pygame.image.load(join("images", "player.png")).convert_alpha()
        self.rect = self.image.get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))
        self.direction = pygame.math.Vector2()
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        self.direction.x = int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])
        self.direction.y = int(keys[pygame.K_DOWN]) - int(keys[pygame.K_UP])
        if self.direction.length() > 0:
            self.direction = self.direction.normalize()
        self.rect.center += self.direction * self.speed * dt

# main loop:
all_sprites.update(dt)`,
}

export default playerNoMove
