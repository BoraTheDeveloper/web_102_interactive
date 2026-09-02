// Review by Week 7: Game Anatomy and the One-Sentence Pitch.
// Source: game_dev/docs/2026_t3/slides/W7 - Game Anatomy and the One-Sentence Pitch.md
// (section H, Exercise 4: the must-do end state, before the Make features).

import quiz from '../quizzes/w7.js'

const w7 = {
  slug: 'w7',
  title: 'Week 7 · Game Anatomy and the One-Sentence Pitch',
  subtitle: 'Vector2 and normalize, the Game Anatomy, and three rooms',
  summary:
    'Two things changed in the Collector this week. Diagonal movement stopped being faster than straight movement, because a `Vector2` direction gets `normalize()` before it is used. And the game gained a start screen and an ending, because one `state` variable now decides which lines are allowed to run. You also got a name for the whole shape: the Game Anatomy, seven pieces that every game you build has.',
  keyPoints: [
    {
      heading: 'A direction is a vector, and normalize makes it one step',
      body: 'Pressing Left and Up together used to move you further than pressing Left alone, because you got a full step on each axis. Collect the keys into a `pygame.Vector2` and `normalize()` shortens any direction back to one step long, so every direction costs the same. It is only legal on a vector with length, which is why the call sits behind `if direction.length() > 0`. Normalizing `(0, 0)` raises an error.',
    },
    {
      heading: 'The seven-piece Game Anatomy',
      body: 'Loop, `dt`, input, classes and sprites, collisions, score, and **states**. You could already point at six of those in your own file. States was the missing one, and that gap is the whole reason for this week. The same seven pieces describe the Collector, the Platformer you start next week, and Pong. An FRect keeps decimals, so `rect.center += direction * speed * dt` is exact and needs no separate position variable.',
    },
    {
      heading: 'One variable, three rooms',
      body: 'States are **rooms**. The game stands in exactly one at a time, and `state` is the sign on the door. `==` asks which room you are in. `=` moves you to a new one. Mixing those two up is the most common way this breaks. Notice which input each room needs: SPACE to start is a `KEYDOWN` **event**, because you want the moment it was pressed, while arrow keys use `get_pressed()`, because you want to know if it is held right now.',
    },
    {
      heading: 'Not being drawn is not the same as not running',
      body: 'Move `all_sprites.update(dt)` outside the `"playing"` block and everything still looks fine. Hold Left on the title screen for five seconds and nothing visible happens, because the start room draws no sprites. Then press SPACE and your player has already walked into the left wall. It was moving the whole time. **Ask which room you are in, then ask which lines are allowed in that room.**',
    },
    {
      heading: 'Any game fits in one sentence',
      body: 'The formula is: in this game you ___, the challenge is ___, and you win or lose when ___. If you cannot fill the three blanks, the idea is not finished yet. This is the same test you will run on your own final project in Week 10, so practise it on games you already know.',
    },
  ],
  code: `import pygame
from random import randint

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Collector - States")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 40)
small_font = pygame.font.Font(None, 32)

all_sprites = pygame.sprite.Group()
coin_group = pygame.sprite.Group()


class Player(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)
        self.image = pygame.Surface((40, 40))
        self.image.fill("dodgerblue")
        self.rect = self.image.get_frect(center=(400, 300))
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        direction = pygame.Vector2(0, 0)
        if keys[pygame.K_LEFT]:
            direction.x -= 1
        if keys[pygame.K_RIGHT]:
            direction.x += 1
        if keys[pygame.K_UP]:
            direction.y -= 1
        if keys[pygame.K_DOWN]:
            direction.y += 1

        if direction.length() > 0:
            direction = direction.normalize()

        self.rect.center += direction * self.speed * dt
        self.rect.clamp_ip(screen.get_frect())


class Coin(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)
        self.image = pygame.Surface((30, 30))
        self.image.fill("gold")
        self.rect = self.image.get_frect(
            center=(randint(40, WIDTH - 40), randint(40, HEIGHT - 40))
        )

    def respawn(self):
        self.rect.center = (
            randint(40, WIDTH - 40),
            randint(40, HEIGHT - 40),
        )


player = Player(all_sprites)
Coin((all_sprites, coin_group))
score = 0
state = "start"

running = True
while running:
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if state == "start" and event.key == pygame.K_SPACE:
                state = "playing"

    if state == "playing":
        all_sprites.update(dt)
        hits = pygame.sprite.spritecollide(player, coin_group, False)
        for hit in hits:
            score += 1
            hit.respawn()
            if score >= 10:
                state = "gameover"

    screen.fill("midnightblue")
    if state == "start":
        title = font.render("COLLECTOR", True, "white")
        hint = small_font.render("Press SPACE to start", True, "gold")
        screen.blit(title, title.get_frect(center=(WIDTH // 2, 250)))
        screen.blit(hint, hint.get_frect(center=(WIDTH // 2, 320)))
    elif state == "playing":
        all_sprites.draw(screen)
        score_surf = font.render(f"Score: {score}", True, "white")
        screen.blit(score_surf, (20, 20))
    elif state == "gameover":
        all_sprites.draw(screen)
        msg = font.render("You win!", True, "gold")
        screen.blit(msg, msg.get_frect(center=(WIDTH // 2, 250)))
    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'game-loop', label: 'Game Loop' },
    { slug: 't3-vector-direction', label: 'Vectors and Direction' },
    { slug: 't3-game-states', label: 'Game States' },
    { slug: 'input', label: 'Keyboard and Mouse Input' },
    { slug: 'delta-time', label: 'Delta Time' },
  ],
  quiz,
  takeaways: [
    'You can name the seven pieces of the Game Anatomy without looking',
    'You can use a `Vector2` direction and say why `normalize()` makes diagonal fair',
    'You can hold three rooms in one `state` variable and move between them',
    'You can explain why code that is not drawn is still running',
    'You can pitch any game in one sentence, including your own',
  ],
}

export default w7
