// Visual concept: Classes / Objects. The demo IS a Trace (no canvas) that
// shows a Player object being created and updated. Based on the Player class
// in game_dev/space_shooter/w9_final.py.

const classes = {
  slug: 'classes',
  title: 'Classes & Objects',
  subtitle: 'Data and behavior bundled together',
  recap:
    'A **class** bundles data (`self.rect`, `self.speed`) with the functions that act on it (`update`). `__init__` runs once when you create the object; `update` runs every frame. A Sprite class also plugs into sprite groups.',

  demo: {
    kind: 'classes',
    config: {
      code: `class Player(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)
        self.image = pygame.image.load("images/player.png")
        self.rect = self.image.get_frect(center=(640, 360))
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        self.rect.centerx += keys[pygame.K_RIGHT] * self.speed * dt

player = Player(all_sprites)
player.update(0.02)`,
      state: { stage: 'start', rectCenterx: null, speed: null, moved: null },
      inspector: (s) => [
        { label: 'stage', value: s.stage },
        { label: 'self.rect.centerx', value: s.rectCenterx === null ? '—' : s.rectCenterx },
        { label: 'self.speed', value: s.speed === null ? '—' : s.speed },
        { label: 'after update', value: s.moved === null ? '—' : s.moved },
      ],
      steps: [
        { lines: [12], label: '1 · create a Player', desc: 'player = Player(all_sprites) calls __init__.', apply: (s) => ({ ...s, stage: '__init__ running' }) },
        { lines: [3], label: '2 · super().__init__(groups)', desc: 'Registers this sprite into the groups so all_sprites knows about it.' },
        { lines: [5], label: '3 · set self.rect', desc: 'self.rect = image.get_frect(center=(640, 360)). centerx starts at 640.', apply: (s) => ({ ...s, rectCenterx: 640 }) },
        { lines: [6], label: '4 · set self.speed', desc: 'self.speed = 300.', apply: (s) => ({ ...s, speed: 300 }) },
        { lines: [13], label: '5 · call update', desc: 'player.update(0.02) runs the update method with dt = 0.02 seconds.', apply: (s) => ({ ...s, stage: 'update running' }) },
        { lines: [9], label: '6 · read keys', desc: 'keys = pygame.key.get_pressed(); the Right arrow is held, so keys[K_RIGHT] is 1.' },
        { lines: [10], label: '7 · move', desc: 'self.rect.centerx += 1 * 300 * 0.02 = 6. New centerx: 640 -> 646.', delta: () => ({ rectCenterx: { from: 640, to: 646 } }), apply: (s) => ({ ...s, rectCenterx: 646, moved: '640 -> 646' }) },
      ],
    },
  },

  snippet: {
    code: `class Player(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)
        self.image = pygame.image.load("images/player.png")
        self.rect = self.image.get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        self.direction.x = int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])
        self.rect.center += self.direction * self.speed * dt`,
  },

  commonMistake: {
    why: 'A Sprite that does not call `super().__init__(groups)` is never added to the groups, so `all_sprites.draw` never draws it and `all_sprites.update` never updates it. The object exists but is invisible.',
    code: `class Player(pygame.sprite.Sprite):
    def __init__(self, groups):
        self.image = pygame.image.load("images/player.png")  # no super().__init__!
        self.rect = self.image.get_frect(center=(640, 360))`,
    fix: 'Call `super().__init__(groups)` FIRST inside __init__ so the sprite joins the groups.',
  },
}

export default classes
