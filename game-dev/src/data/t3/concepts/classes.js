// Visual concept: Classes and Objects.
// Source: game_dev/docs/2026_t3/slides/W5 - Classes Blueprint for Game Objects.md (section E).
// Plain classes only. No pygame.sprite.Sprite, no super(), no groups: those are
// Week 6, and W5 and W6 each spend a bug demo drawing that line.

const classes = {
  slug: 'classes',
  title: 'Classes and Objects',
  subtitle: 'A blueprint you write once, and copies you stamp out',
  recap:
    'A class is a **blueprint**. An object is a copy stamped from it. `class Player:` is the drawing. `player = Player(380, 280)` builds one real player from it. Data the object **has** goes on `self` inside `__init__`. Actions it **does** become methods. Nothing in the class runs until you stamp a copy.',

  demo: {
    kind: 'classes',
    config: {
      code: `class Player:
    def __init__(self, x, y):
        self.rect = pygame.FRect(x, y, 40, 40)
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed * dt
        self.rect.clamp_ip(screen.get_frect())

    def draw(self, surface):
        pygame.draw.rect(surface, "dodgerblue", self.rect)


player = Player(380, 280)

while running:
    dt = clock.tick(60) / 1000
    player.update(dt)

    screen.fill("midnightblue")
    player.draw(screen)
    pygame.display.update()`,
      sceneKind: 'collector',
      state: { frame: 0, player: null, dt: 0, speed: null, score: 0 },
      inspector: (s) => [
        { label: 'player', value: s.player ? 'a Player object' : 'does not exist yet' },
        { label: 'self.rect.x', value: s.player ? Math.round(s.player.x * 10) / 10 : '-' },
        { label: 'self.speed', value: s.speed ?? '-' },
        { label: 'dt', value: s.dt || '-' },
      ],
      steps: [
        {
          lines: [1, 2, 6, 12],
          label: '1 · Python reads the blueprint',
          desc: 'It notes that a Player has an __init__, an update and a draw. It does not build anything. The screen is still empty, and that is correct.',
        },
        {
          lines: [16],
          label: '2 · stamp one copy',
          desc: 'Player(380, 280) makes a blank object, then calls __init__ on it. self is that new object. x and y are 380 and 280.',
        },
        {
          lines: [3],
          label: '3 · self.rect sticks to the object',
          desc: 'The word self. is what makes it stick. Write rect = ... without it and this line still runs fine, but the box vanishes the moment __init__ ends.',
          apply: (s) => ({ ...s, player: { x: 380, y: 280, width: 40, height: 40 } }),
        },
        {
          lines: [4],
          label: '4 · self.speed sticks too',
          desc: '300 pixels per second, not per frame. That is why the number jumped from last week\'s 5.',
          delta: () => ({ 'self.speed': { from: '-', to: 300 } }),
          apply: (s) => ({ ...s, speed: 300 }),
        },
        {
          lines: [19],
          frame: 'Frame 1',
          label: '5 · how long was the last frame?',
          desc: 'clock.tick(60) returns milliseconds. Divided by 1000 that is 0.016 seconds at 60 frames per second.',
          apply: (s) => ({ ...s, frame: 1, dt: 0.016 }),
        },
        {
          lines: [20],
          label: '6 · player.update(dt)',
          desc: 'You pass one argument. The method takes two. Python fills self in for you: it is the object left of the dot.',
        },
        {
          lines: [7, 8, 9],
          label: '7 · inside update, self is this player',
          desc: 'self.speed * dt is 300 * 0.016, so 4.8 pixels. Not 300. Speed is per second and this frame was a sixtieth of one.',
          delta: (s) => ({ 'self.rect.x': { from: 380, to: 384.8 } }),
          apply: (s) => ({ ...s, player: { ...s.player, x: 384.8 } }),
        },
        {
          lines: [10],
          label: '8 · clamp, still inside the class',
          desc: 'The loop no longer knows the screen has edges. Keeping a player on screen is now the player\'s own job.',
        },
        {
          lines: [22],
          label: '9 · player.draw(screen)',
          desc: 'Same trick as update. The object supplies self, you supply the surface.',
        },
        {
          lines: [23],
          label: '10 · show the frame',
          desc: 'The player has moved 4.8 pixels. Frame 1 is done.',
        },
        {
          lines: [19, 20],
          frame: 'Frame 2',
          label: '11 · a second frame, same object',
          desc: 'Same player, same self.rect, another 4.8 pixels. After 60 frames, one second, it has moved 300 pixels. That is what "per second" means.',
          delta: () => ({ 'self.rect.x': { from: 384.8, to: 389.6 } }),
          apply: (s) => ({ ...s, frame: 2, player: { ...s.player, x: 389.6 } }),
        },
      ],
    },
  },

  snippet: {
    code: `class Coin:
    def __init__(self):
        self.rect = pygame.FRect(200, 150, 30, 30)

    def respawn(self):
        self.rect.x = randint(0, WIDTH - self.rect.width)
        self.rect.y = randint(0, HEIGHT - self.rect.height)

    def draw(self, surface):
        pygame.draw.rect(surface, "gold", self.rect)


coin = Coin()          # one copy
second_coin = Coin()   # a second copy, one line, its own rect`,
  },

  commonMistake: {
    why: 'Forgetting `self.` inside `__init__`. `rect = pygame.FRect(...)` runs with no error at all. The name was a local variable and it disappeared the second `__init__` finished. The crash lands much later, on the first `player.draw(screen)`, and reads `AttributeError: Player object has no attribute rect`. The line Python blames is not the line that is wrong.',
    code: `class Player:
    def __init__(self, x, y):
        rect = pygame.FRect(x, y, 40, 40)   # no self. -> gone at the end of __init__
        self.speed = 300

    def draw(self, surface):
        pygame.draw.rect(surface, "dodgerblue", self.rect)  # AttributeError here`,
    fix: 'When an AttributeError names an attribute, do not read the line it points at. Go to `__init__` and check that every piece of data the object needs starts with `self.`.',
  },
}

export default classes
