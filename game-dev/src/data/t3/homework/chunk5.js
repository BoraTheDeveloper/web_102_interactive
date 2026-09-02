// Pong homework, chunk 5 of 5. Set after Week 9.
// Source: game_dev/docs/2026_t3/homeworks/W9 - Pong Chunk 5.md
//
// `rescueCode` is starters/pong_chunk5.py verbatim. It is the complete answer,
// so the page holds it back until the week it is handed out in class.

const chunk5 = {
  slug: 'pong-5',
  title: 'Pong 5 · Win, Restart, Done',
  chunk: 5,
  setAfter: 'w9',
  rescueAfter: 'w10',
  file: 'pong.py',

  goal: 'Finish Pong. Win at 5 points, show a game-over screen, and let R restart. This is your third complete game.',

  building:
    'Open `pong.py`. Hitting 5 points wins. The game-over room shows who won, or that you missed. R sets `state` back to `"start"` or `"playing"`, resets the ball, and resets the score.',

  requirements: [
    {
      id: 'p5-win',
      label: 'Win when score reaches 5',
      hint: 'Right after the `score += 1` line, one more `if`. Same room change as a miss, different message.',
    },
    {
      id: 'p5-lose',
      label: 'A miss still loses, from chunk 4',
      hint: 'Do not break it while adding the win. Two ways into the game-over room, one way out.',
    },
    {
      id: 'p5-restart',
      label: 'R works **outside** the playing block, or it can never run',
      hint: 'You press R in the game-over room, so the check cannot sit under `if state == "playing":`. Same trap as the Week 9 restart in class.',
    },
    {
      id: 'p5-clean',
      label: 'Restart clears leftover ball direction so the next serve is not already flying off-screen',
      hint: "A restart is three resets: `state`, `score`, and the ball's position plus direction. `ball.reset()` already does the last two together.",
    },
    {
      id: 'p5-done',
      label: 'Pong is complete. Bring `pong.py`, the Collector, and the Platformer to Week 10',
      hint: 'Week 10 plans your final project. Three finished games are the evidence for what you can already build.',
    },
  ],

  workingMeans: `python pong.py
Play to 5, or miss and lose. The message stays until R. R brings a fresh serve.
You can play again without restarting Python.`,

  optional: 'Speed the ball up a little after each paddle hit. Cap it so it stays hittable.',

  related: [
    { slug: 't3-game-states', label: 'Game States' },
    { slug: 'repair-score-resets', label: 'My score keeps resetting' },
    { slug: 'input', label: 'Keyboard and Mouse Input' },
  ],

  rescueCode: `import pygame
from random import choice, uniform

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 48)
WIN_AT = 5


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
message = ""

running = True
while running:
    dt = clock.tick(60) / 1000
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if state == "start" and keys[pygame.K_SPACE]:
        state = "playing"
    if state != "playing" and keys[pygame.K_r]:
        score = 0
        message = ""
        ball.reset()
        state = "start"

    if state == "playing":
        all_sprites.update(dt)
        if ball.rect.left > WIDTH:
            score += 1
            ball.reset()
            if score >= WIN_AT:
                message = "You win - R to restart"
                state = "gameover"
        if ball.rect.right < 0:
            message = "Miss - R to restart"
            state = "gameover"

    screen.fill("black")
    all_sprites.draw(screen)
    if state == "start":
        screen.blit(font.render("SPACE to start", True, "white"), (240, 280))
    elif state == "gameover":
        screen.blit(font.render(message, True, "white"), (180, 280))
    else:
        screen.blit(font.render(str(score), True, "white"), (WIDTH // 2 - 10, 20))
    pygame.display.update()

pygame.quit()`,
}

export default chunk5
