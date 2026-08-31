// Space Shooter repair: the game stutters / lags. Based on asset loading in
// game_dev/space_shooter/w9_final.py (load once, before the loop).

const gameLags = {
  slug: 'repair-game-lags',
  title: 'My game lags and stutters',
  symptom:
    'The game runs but it is choppy. The frame rate drops, movement is jerky, and it gets worse the longer I play.',
  likelyCause:
    'Expensive work is happening **inside the loop every frame**. w9_final.py loads every image and font ONCE, before the loop. If `pygame.image.load(...)`, `font.Font(...)`, or `.convert_alpha()` is inside `while running:`, the computer reloads the file 60 times a second and the game chokes. It can also be sprites that fly off screen and are never killed with `self.kill()`, so the group grows forever.',
  whereToCheck: [
    'Search the loop body for pygame.image.load, font.Font, or mixer.Sound. They must be BEFORE while running.',
    'Confirm .convert_alpha() is called once at load time, not inside the loop.',
    'Check that off-screen sprites call self.kill() in update so groups do not grow forever.',
    'Make sure pygame.display.update() is called exactly once per frame, not many times.',
  ],
  checklist: [
    { id: 'gl-1', label: 'Load all images before the loop', hint: 'meteor_surf = pygame.image.load(...).convert_alpha()  # once' },
    { id: 'gl-2', label: 'Create the font before the loop', hint: 'font = pygame.font.Font(join("images", "Oxanium-Bold.ttf"), 40)' },
    { id: 'gl-3', label: 'Load sounds before the loop', hint: 'laser_sound = pygame.mixer.Sound(join("audio", "laser.wav"))' },
    { id: 'gl-4', label: 'Kill sprites that leave the screen', hint: 'if self.rect.top > WINDOW_HEIGHT: self.kill()' },
    { id: 'gl-5', label: 'Call display.update() once per frame', hint: 'A single update at the end of the loop, not per sprite.' },
  ],
  fixCode: `# load ONCE, before the loop:
meteor_surf = pygame.image.load(join("images", "meteor.png")).convert_alpha()
font = pygame.font.Font(join("images", "Oxanium-Bold.ttf"), 40)
laser_sound = pygame.mixer.Sound(join("audio", "laser.wav"))

# inside Meteor.update, clean up off-screen sprites:
def update(self, dt):
    self.rect.y += self.speed * dt
    if self.rect.top > WINDOW_HEIGHT:
        self.kill()`,
}

export default gameLags
