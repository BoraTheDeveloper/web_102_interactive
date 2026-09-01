// Review by Week 5: Classes, a Blueprint for Game Objects.
// Source: game_dev/docs/2026_t3/slides/W5 - Classes Blueprint for Game Objects.md (section E).
// Plain classes only. Sprites are Week 6.

import quiz from '../quizzes/w5.js'

const w5 = {
  slug: 'w5',
  title: 'Week 5 · Classes: Blueprint for Game Objects',
  subtitle: 'class, __init__, self, methods, and speed in pixels per second',
  summary:
    'The game on screen did not change this week. That is the point. You rebuilt the exact same Collector using classes, so the file is organized instead of scattered. A `Player` class and a `Coin` class each hold their own data and their own actions. The payoff is immediate: a second coin now costs one line instead of four scattered edits.',
  keyPoints: [
    {
      heading: 'Four loose lines become one blueprint',
      body: 'In Week 4 a player was a rect here, a speed there, movement somewhere else and a draw call at the bottom. Ask what a **second** player would cost and the answer is four more scattered lines. A class gathers all of it into one place.',
    },
    {
      heading: 'A class is a blueprint, an object is a stamped copy',
      body: 'The class is the drawing. The object is a thing built from it. `class Coin:` is the blueprint. `coin = Coin()` stamps one out. Data the thing **has** goes on `self` inside `__init__`. Actions the thing **does** become methods.',
    },
    {
      heading: 'self. is what makes the data stick',
      body: 'Write `rect = pygame.FRect(...)` instead of `self.rect = ...` and `__init__` runs perfectly. No error. The name was just a local variable and it vanished the moment `__init__` finished. The crash arrives later, on the first `player.draw(screen)`, as `AttributeError: Player object has no attribute rect`. The crash never lands on the guilty line.',
    },
    {
      heading: 'Speed in pixels per second',
      body: '`dt = clock.tick(60) / 1000` is the seconds since the last frame. Multiply movement by it and speed stops depending on the machine. That is why the number changed from 5 to 300: at 60 frames a second, `300 * dt` is about 4.8, almost exactly last week\'s 5. Keep `speed = 5` **and** multiply by dt and the player crawls.',
    },
    {
      heading: 'The loop still decides when each object acts',
      body: 'Classes do not run themselves. The loop calls `player.update(dt)` and `coin.respawn()`. What changed is that the loop no longer knows the screen edges exist, because `clamp_ip` moved inside `Player.update`. That tidying is what Week 6 builds on.',
    },
  ],
  code: `import pygame
from random import randint

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Collector - Classes")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 40)


class Player:
    def __init__(self, x, y):
        self.rect = pygame.FRect(x, y, 40, 40)
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.rect.x -= self.speed * dt
        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed * dt
        if keys[pygame.K_UP]:
            self.rect.y -= self.speed * dt
        if keys[pygame.K_DOWN]:
            self.rect.y += self.speed * dt
        self.rect.clamp_ip(screen.get_frect())

    def draw(self, surface):
        pygame.draw.rect(surface, "dodgerblue", self.rect)


class Coin:
    def __init__(self):
        self.rect = pygame.FRect(200, 150, 30, 30)

    def respawn(self):
        self.rect.x = randint(0, WIDTH - self.rect.width)
        self.rect.y = randint(0, HEIGHT - self.rect.height)

    def draw(self, surface):
        pygame.draw.rect(surface, "gold", self.rect)


player = Player(380, 280)
coin = Coin()
score = 0

running = True
while running:
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    player.update(dt)

    if player.rect.colliderect(coin.rect):
        score += 1
        coin.respawn()

    screen.fill("midnightblue")
    player.draw(screen)
    coin.draw(screen)

    score_surf = font.render(f"Score: {score}", True, "white")
    screen.blit(score_surf, (20, 20))

    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'classes', label: 'Classes and Objects' },
    { slug: 'delta-time', label: 'Delta Time' },
    { slug: 'repair-missing-self', label: 'AttributeError on a line that looks fine' },
    { slug: 'repair-player-too-fast', label: 'My player is too fast or too slow' },
  ],
  quiz,
  takeaways: [
    'You can explain the difference between a blueprint and a stamped copy',
    'You can write a class with `__init__`, `self.` attributes and methods',
    'You can call an object\'s methods from the game loop',
    'You can rebuild a working procedural file as classes without changing how it plays',
    'You can stamp a second object from the same blueprint in one line',
  ],
}

export default w5
