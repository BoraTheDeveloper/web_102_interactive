// T3 repair. Source: W5 §C and W5 slide 13. Three causes, one symptom pair.

const playerTooFast = {
  slug: 'repair-player-too-fast',
  title: 'My player is too fast or too slow',
  game: 'Collector',
  symptom:
    'After adding dt the player crawls across the screen, or it shoots off the edge in a blink. On my friend\'s laptop it moves at a different speed to mine, with the same file.',
  likelyCause:
    'Three causes, all about what the speed number **means**. Keeping `speed = 5` while multiplying by dt gives about 0.08 pixels a frame, so the player crawls: 5 was a per frame number and dt needs a per second one. Removing the `* dt` and keeping 300 sends it flying. And computing dt once before the loop freezes it at whatever the first frame took, so nothing corrects for a fast or slow machine.',
  whereToCheck: [
    'Find the speed value. With `* dt` it is pixels per second, so it should be in the hundreds, not single digits.',
    'Check the dt line is inside the loop. Computed once above it, dt is a fixed number and the whole point is lost.',
    'Check `clock = pygame.time.Clock()` exists before the loop, and that the loop calls `clock.tick(60)` exactly once per frame.',
    'Check every movement line multiplies by dt, not just some of them. A mix gives a player that is fast one way and slow the other.',
    'Diagonal movement being faster than straight movement is correct at this stage. Do not chase it.',
  ],
  workingMeans:
    'The player crosses the window in about the same time on any machine, and holding two arrows still moves it in both directions.',
  checklist: [
    { id: 'ptf-1', label: 'Make a Clock once, before the loop', hint: 'Something on `pygame.time`, stored in a variable.' },
    { id: 'ptf-2', label: 'Compute dt at the top of every frame', hint: 'Tick the clock at 60, then convert milliseconds to seconds.' },
    { id: 'ptf-3', label: 'Set the speed as pixels per second', hint: 'Roughly sixty times the old per frame number.' },
    { id: 'ptf-4', label: 'Multiply every movement by dt', hint: 'All four directions, not just the two you tested.' },
    { id: 'ptf-5', label: 'Pass dt into update from the loop', hint: 'The method takes it as an argument, so the call must supply it.' },
  ],
  fixCode: `clock = pygame.time.Clock()          # once, before the loop

class Player:
    def __init__(self, x, y):
        self.rect = pygame.FRect(x, y, 40, 40)
        self.speed = 300                 # pixels per SECOND, not per frame

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.rect.x -= self.speed * dt
        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed * dt

while running:
    dt = clock.tick(60) / 1000       # EVERY frame, inside the loop
    player.update(dt)`,
}

export default playerTooFast
