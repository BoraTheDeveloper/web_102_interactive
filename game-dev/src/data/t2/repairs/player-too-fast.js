// Space Shooter repair: the player zooms across the screen. Based on the dt
// movement in game_dev/space_shooter/w9_final.py.

const playerTooFast = {
  slug: 'repair-player-too-fast',
  title: 'My player moves way too fast',
  symptom:
    'The player shoots across the screen the moment I touch an arrow key. On a fast computer it is even worse, and I can barely control it.',
  likelyCause:
    'The movement does not multiply by `dt`. In w9_final.py the line is `self.rect.center += self.direction * self.speed * dt`. If you write `self.rect.centerx += self.speed` instead, the player moves the same number of pixels every frame, so a faster frame rate (more frames per second) means a faster player.',
  whereToCheck: [
    'Look at the movement line in Player.update. It must end with * dt (delta time in seconds).',
    'Confirm dt is computed at the top of the loop: dt = clock.tick(60) / 1000.',
    'Check that all_sprites.update(dt) actually passes dt into update. A signature of update(self) drops it.',
    'Make sure self.speed is a per-second value (like 300), not a per-frame value (like 5).',
  ],
  checklist: [
    { id: 'ptf-1', label: 'Create a clock and get dt each frame', hint: 'dt = clock.tick(60) / 1000  # seconds since last frame' },
    { id: 'ptf-2', label: 'Give update() a dt parameter', hint: 'def update(self, dt):' },
    { id: 'ptf-3', label: 'Multiply movement by dt', hint: 'self.rect.center += self.direction * self.speed * dt' },
    { id: 'ptf-4', label: 'Pass dt when you call update', hint: 'all_sprites.update(dt)' },
    { id: 'ptf-5', label: 'Use a per-second speed', hint: 'self.speed = 300 means 300 pixels per second, not per frame.' },
  ],
  fixCode: `clock = pygame.time.Clock()
# ...
while running:
    dt = clock.tick(60) / 1000  # seconds since last frame

    all_sprites.update(dt)

# in Player:
def update(self, dt):
    keys = pygame.key.get_pressed()
    self.direction.x = int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])
    self.rect.center += self.direction * self.speed * dt`,
}

export default playerTooFast
