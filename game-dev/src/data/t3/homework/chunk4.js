// Pong homework, chunk 4 of 5. Set after Week 8.
// Source: game_dev/docs/2026_t3/homeworks/W8 - Pong Chunk 4.md
//
// `rescueCode` is starters/pong_chunk4.py verbatim. It is the complete answer,
// so the page holds it back until the week it is handed out in class.
//
// The sheet's optional stretch is a paste-only AI paddle from the instructor
// notes. It is not taught and the notes are not for the student handout, so
// the page points at the sheet rather than carrying the snippet.

const chunk4 = {
  slug: 'pong-4',
  title: 'Pong 4 · States and Game Over',
  chunk: 4,
  setAfter: 'w8',
  rescueAfter: 'w9',
  file: 'pong.py',

  goal:
    "Pong waits for a key to start, plays, and ends on a miss. That is last week's Collector rooms, moved into Pong.",

  building:
    'Open `pong.py`. Add a `state` variable with three values: `"start"`, `"playing"`, `"gameover"`. SPACE leaves start. A miss on your side now ends the game instead of a free reset.',

  requirements: [
    {
      id: 'p4-start',
      label: 'Start screen until SPACE',
      hint: 'Create `state = "start"` before the loop, next to `score`. One `if` reads the key and changes the string. Nothing else changes yet.',
    },
    {
      id: 'p4-playing',
      label: 'Movement, bounce, and score run only while `state == "playing"`',
      hint: 'Indent `all_sprites.update(dt)` and the two miss checks under one `if`. If the ball keeps bouncing on the start screen, `update` is still outside the door.',
    },
    {
      id: 'p4-gameover',
      label: 'A miss sets `state = "gameover"`',
      hint: "Chunk 3's left-side miss called `ball.reset()`. Replace that one line. The right-side score check stays as it was.",
    },
    {
      id: 'p4-quit',
      label: 'The window still closes on X from every room',
      hint: 'The event loop stays above the state checks, not inside any of them. If X only works while playing, it moved.',
    },
    {
      id: 'p4-save',
      label: 'Saved as `pong.py`',
      hint: 'Chunk 5 finishes the game from this exact file.',
    },
  ],

  workingMeans: `python pong.py
The window waits. SPACE starts play. Missing the ball shows the game is over.
The ball does not keep bouncing in the game-over room.`,

  optional:
    'Replace the static right paddle with an AI paddle. The snippet is on the homework sheet from class. Paste only, this is not taught.',

  related: [
    { slug: 't3-game-states', label: 'Game States' },
    { slug: 'input', label: 'Keyboard and Mouse Input' },
    { slug: 'game-loop', label: 'Game Loop' },
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
state = "start"

running = True
while running:
    dt = clock.tick(60) / 1000
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if state == "start" and keys[pygame.K_SPACE]:
        state = "playing"

    if state == "playing":
        all_sprites.update(dt)
        if ball.rect.left > WIDTH:
            score += 1
            ball.reset()
        if ball.rect.right < 0:
            state = "gameover"

    screen.fill("black")
    all_sprites.draw(screen)
    if state == "start":
        screen.blit(font.render("SPACE to start", True, "white"), (240, 280))
    elif state == "gameover":
        screen.blit(font.render("Miss - game over", True, "white"), (240, 280))
    else:
        screen.blit(font.render(str(score), True, "white"), (WIDTH // 2 - 10, 20))
    pygame.display.update()

pygame.quit()`,
}

export default chunk4
