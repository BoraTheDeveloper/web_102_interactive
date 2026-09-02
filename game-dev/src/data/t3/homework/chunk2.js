// Pong homework, chunk 2 of 5. Set after Week 6.
// Source: game_dev/docs/2026_t3/homeworks/W6 - Pong Chunk 2.md
//
// `rescueCode` is starters/pong_chunk2.py verbatim. It is the complete answer,
// so the page holds it back until the week it is handed out in class.

const chunk2 = {
  slug: 'pong-2',
  title: 'Pong 2 · Sprites and a Vector2 Ball',
  chunk: 2,
  setAfter: 'w6',
  rescueAfter: 'w7',
  file: 'pong.py',

  goal:
    "Turn last night's paddle into a sprite, add a `Ball` sprite, and let a group update and draw them. The ball's direction is a `pygame.Vector2`.",

  building:
    'Open `pong.py`. Convert `Paddle` to `pygame.sprite.Sprite`. Add a `Ball` sprite with `self.direction = pygame.Vector2(...)`. Put both in a group. The ball bounces off the top and bottom walls.',

  requirements: [
    {
      id: 'p2-sprites',
      label: '`class Paddle(pygame.sprite.Sprite)` and `class Ball(pygame.sprite.Sprite)`',
      hint: 'Same conversion you did to the Collector in class. The class line changes, and every sprite needs an `image` and a `rect`.',
    },
    {
      id: 'p2-super',
      label: '`super().__init__(groups)` in both',
      hint: 'First line inside each `__init__`. It is what puts the sprite into the group. Forget it and the group is empty.',
    },
    {
      id: 'p2-group',
      label: 'The loop calls `all_sprites.update(dt)` and `all_sprites.draw(screen)`',
      hint: 'Delete the hand-drawn `pygame.draw.rect` for the paddle. The group draws everything now, or you get two paddles.',
    },
    {
      id: 'p2-bounce',
      label: 'Bounce is `self.direction.y *= -1` when the ball hits the top or bottom',
      hint: 'Compare `rect.top` and `rect.bottom` against the screen edges inside `Ball.update`. Only y flips. Do not use an int `direction`, and do not hunt for the W6 bonus Enemy.',
    },
    {
      id: 'p2-save',
      label: 'Saved as `pong.py`',
      hint: 'Chunk 3 starts from this exact file.',
    },
  ],

  workingMeans: `python pong.py
The paddle still moves. A ball travels on a diagonal and bounces off the top and bottom.
It may still leave through the left or right. That is next chunk.`,

  optional: 'If the ball starts too fast or too slow, change one speed constant. Do not add a second paddle yet.',

  related: [
    { slug: 't3-inheritance', label: 'Inheritance and Sprites' },
    { slug: 't3-vector-direction', label: 'Vectors and Direction' },
    { slug: 'repair-sprite-never-joined', label: 'My sprite never joined the group' },
    { slug: 'repair-missing-self', label: 'AttributeError on a line that looks fine' },
  ],

  rescueCode: `import pygame
from random import choice, uniform

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong")
clock = pygame.time.Clock()


class Paddle(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)
        self.image = pygame.Surface((12, 100))
        self.image.fill("white")
        self.rect = self.image.get_frect(midleft=(40, HEIGHT // 2))
        self.speed = 400

    def update(self, dt):
        keys = pygame.key.get_pressed()
        self.direction = int(keys[pygame.K_DOWN]) - int(keys[pygame.K_UP])
        self.rect.y += int(self.direction * self.speed * dt)
        self.rect.clamp_ip(screen.get_frect())


class Ball(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)
        self.image = pygame.Surface((16, 16))
        self.image.fill("white")
        self.rect = self.image.get_frect(center=(WIDTH // 2, HEIGHT // 2))
        self.speed = 350
        self.direction = pygame.Vector2(choice((1, -1)), uniform(0.6, 0.9) * choice((-1, 1)))

    def update(self, dt):
        self.rect.center += self.direction * self.speed * dt
        if self.rect.top <= 0 or self.rect.bottom >= HEIGHT:
            self.direction.y *= -1
            self.rect.clamp_ip(screen.get_frect())


all_sprites = pygame.sprite.Group()
paddle = Paddle(all_sprites)
ball = Ball(all_sprites)

running = True
while running:
    dt = clock.tick(60) / 1000
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    all_sprites.update(dt)

    screen.fill("black")
    all_sprites.draw(screen)
    pygame.display.update()

pygame.quit()`,
}

export default chunk2
