// Pong homework, chunk 3 of 5. Set after Week 7.
// Source: game_dev/docs/2026_t3/homeworks/W7 - Pong Chunk 3.md
//
// `rescueCode` is starters/pong_chunk3.py verbatim. It is the complete answer,
// so the page holds it back until the week it is handed out in class.

const chunk3 = {
  slug: 'pong-3',
  title: 'Pong 3 · Collision, Static Paddle, Score',
  chunk: 3,
  setAfter: 'w7',
  rescueAfter: 'w8',
  file: 'pong.py',

  goal: 'The ball bounces off your paddle, a static paddle sits on the right, and a score counts.',

  building:
    'Open `pong.py`. When the ball hits the player paddle, reverse `direction.x`. Stamp a second paddle on the right that does not move. When the ball passes the static paddle, add 1 to score and reset the ball. When the ball passes your paddle, reset the ball with no penalty.',

  requirements: [
    {
      id: 'p3-bounce',
      label: 'Bounce off both paddles',
      hint: '`colliderect` or `spritecollide`, either is fine. On a paddle only x flips. On a wall only y flips. That is the whole bounce, no swept collision needed.',
    },
    {
      id: 'p3-static',
      label: 'Static right paddle: drawn, no `update` movement',
      hint: 'Easiest is a second `Paddle` with a flag that makes `update` return early. It still sits in the group so it still draws.',
    },
    {
      id: 'p3-score',
      label: 'Score starts at 0, created **before** the loop, drawn with `font.render` every frame',
      hint: 'Same score you built in Week 6. If it keeps snapping back to 0, the `score = 0` line is inside the loop.',
    },
    {
      id: 'p3-miss',
      label: 'A miss on your side resets the ball. It does not end the game yet',
      hint: 'Check `ball.rect.right < 0` after the update. Put the ball back in the middle. Game over is next chunk.',
    },
    {
      id: 'p3-save',
      label: 'Saved as `pong.py`',
      hint: 'Chunk 4 adds states to this exact file.',
    },
  ],

  workingMeans: `python pong.py
Ball bounces off your paddle and the right wall-paddle. Score goes up when you get it
past the right paddle. Missing on the left just serves again.`,

  optional: 'Reset the ball to a new `Vector2` direction each serve so it does not repeat the same path.',

  related: [
    { slug: 'rect-collision', label: 'Rects and Collision' },
    { slug: 't3-inheritance', label: 'Inheritance and Sprites' },
    { slug: 'repair-collision-fails', label: 'My collision never fires' },
    { slug: 'repair-score-resets', label: 'My score keeps resetting' },
  ],

  rescueCode: `import pygame
from random import choice, uniform

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 48)


class Paddle(pygame.sprite.Sprite):
    def __init__(self, groups, midleft):
        super().__init__(groups)
        self.image = pygame.Surface((12, 100))
        self.image.fill("white")
        self.rect = self.image.get_frect(midleft=midleft)
        self.speed = 400
        self.can_move = True

    def update(self, dt):
        if not self.can_move:
            return
        keys = pygame.key.get_pressed()
        self.direction = int(keys[pygame.K_DOWN]) - int(keys[pygame.K_UP])
        self.rect.y += int(self.direction * self.speed * dt)
        self.rect.clamp_ip(screen.get_frect())


class Ball(pygame.sprite.Sprite):
    def __init__(self, groups, paddles):
        super().__init__(groups)
        self.paddles = paddles
        self.image = pygame.Surface((16, 16))
        self.image.fill("white")
        self.speed = 350
        self.reset()

    def reset(self):
        self.rect = self.image.get_frect(center=(WIDTH // 2, HEIGHT // 2))
        self.direction = pygame.Vector2(choice((1, -1)), uniform(0.6, 0.9) * choice((-1, 1)))

    def update(self, dt):
        self.rect.center += self.direction * self.speed * dt
        if self.rect.top <= 0 or self.rect.bottom >= HEIGHT:
            self.direction.y *= -1
            self.rect.clamp_ip(screen.get_frect())
        if pygame.sprite.spritecollide(self, self.paddles, False):
            self.direction.x *= -1
            self.rect.centerx += self.direction.x * 8


all_sprites = pygame.sprite.Group()
paddles = pygame.sprite.Group()
player = Paddle((all_sprites, paddles), (40, HEIGHT // 2))
static = Paddle((all_sprites, paddles), (WIDTH - 52, HEIGHT // 2))
static.can_move = False
ball = Ball(all_sprites, paddles)
score = 0

running = True
while running:
    dt = clock.tick(60) / 1000
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    all_sprites.update(dt)

    if ball.rect.left > WIDTH:
        score += 1
        ball.reset()
    if ball.rect.right < 0:
        ball.reset()

    screen.fill("black")
    all_sprites.draw(screen)
    screen.blit(font.render(str(score), True, "white"), (WIDTH // 2 - 10, 20))
    pygame.display.update()

pygame.quit()`,
}

export default chunk3
