// Review by Week 9: Platformer, A Complete Level.
// Source: game_dev/docs/2026_t3/slides/W9 - Platformer A Complete Level.md (section E,
// the must-do level). The later blocks in section E are the Mini Challenge and the
// bonus enemy.

import quiz from '../quizzes/w9.js'

const w9 = {
  slug: 'w9',
  title: 'Week 9 · Platformer: A Complete Level',
  subtitle: 'More platforms, a goal flag, and a game that actually ends',
  summary:
    'Last week you had a hop. This week you have a level: three platforms to climb, a green flag at the top to reach, and a gap in the ground to fall through. More importantly, the game now **ends**. One `state` variable holds `"playing"`, `"win"` or `"lose"`, and reaching the flag or falling off the bottom moves you between them. With Pong finished for homework, that is three complete games.',
  keyPoints: [
    {
      heading: 'A new platform costs one line',
      body: 'The `Platform` class you wrote last week is still paying you back. `Platform(250, 430, 170, 24, (all_sprites, platforms))` is a whole new ledge: position, size, and the two groups it joins. Three of those lines build the entire level. This is the payoff you were promised back in Week 5 when a class first looked like extra typing.',
    },
    {
      heading: 'Every sprite joins the groups that match its jobs',
      body: 'The platforms join `all_sprites` so they are drawn and `platforms` so they are solid. The flag joins `all_sprites` so it is drawn and `goals` so it can be asked about. One group to show it, one group to answer a question about it. `spritecollide(player, goals, False)` asks "am I touching a goal?" and the `False` keeps the flag alive, since deleting the thing you just won on would be strange.',
    },
    {
      heading: 'Winning is a state change, not an overlap',
      body: 'Touching the flag is not a win by itself. It is a win because the touch runs `state = "win"`. If you only add a score there, the player overlaps the flag and absolutely nothing happens, which is the most common way this exercise breaks. Coming from the Collector, adding to a score is the habit your fingers already have. **The flag needs a door, not a counter.**',
    },
    {
      heading: 'A game only ends when you stop updating it',
      body: 'Reach the flag. "You win!" appears. Now keep holding Right, walk off the high platform and fall past the bottom of the window. The banner flips to "You lose!" You won, and then you lost the level you had already won. Nothing was broken: `all_sprites.update(dt)` never stopped, so the player kept moving, kept falling, and the lose check kept running and overwrote `state`. The game never ended. It printed a word. Putting update and the checks **inside** `if state == "playing":` is what actually ends it.',
    },
    {
      heading: 'Messages are drawn every frame, like everything else',
      body: 'There is no such thing as putting text on the screen once. The window is repainted from scratch every frame, so `screen.fill` wipes the last frame away and the win or lose message has to be blitted again on this one. Draw it after `all_sprites.draw(screen)` so it sits on top, and before `pygame.display.update()` so it is on the frame that gets shown.',
    },
  ],
  code: `import pygame

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Platformer - A Complete Level")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 48)

GRAVITY = 1
JUMP = -16
MOVE = 5


class Platform(pygame.sprite.Sprite):
    def __init__(self, x, y, w, h, groups):
        super().__init__(groups)
        self.image = pygame.Surface((w, h))
        self.image.fill("sienna")
        self.rect = self.image.get_frect(topleft=(x, y))


class Goal(pygame.sprite.Sprite):
    def __init__(self, pos, groups):
        super().__init__(groups)
        self.image = pygame.Surface((28, 48))
        self.image.fill("limegreen")
        self.rect = self.image.get_frect(midbottom=pos)


class Player(pygame.sprite.Sprite):
    def __init__(self, pos, groups, platforms):
        super().__init__(groups)
        self.image = pygame.Surface((40, 60))
        self.image.fill("dodgerblue")
        self.rect = self.image.get_frect(midbottom=pos)
        self.direction = pygame.Vector2()
        self.on_floor = False
        self.platforms = platforms

    def update(self, dt):
        keys = pygame.key.get_pressed()
        self.rect.x += (int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])) * MOVE

        if keys[pygame.K_SPACE] and self.on_floor:
            self.direction.y = JUMP

        self.direction.y += GRAVITY
        self.rect.y += self.direction.y

        self.on_floor = False
        hits = pygame.sprite.spritecollide(self, self.platforms, False)
        for platform in hits:
            if self.direction.y >= 0:
                self.rect.bottom = platform.rect.top
                self.direction.y = 0
                self.on_floor = True

        self.rect.x = max(0, min(self.rect.x, WIDTH - self.rect.width))


all_sprites = pygame.sprite.Group()
platforms = pygame.sprite.Group()
goals = pygame.sprite.Group()

Platform(0, 520, 360, 80, (all_sprites, platforms))
Platform(250, 430, 170, 24, (all_sprites, platforms))
Platform(500, 340, 170, 24, (all_sprites, platforms))
Goal((585, 340), (all_sprites, goals))
player = Player((80, 520), all_sprites, platforms)

state = "playing"

running = True
while running:
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    if state == "playing":
        all_sprites.update(dt)
        if pygame.sprite.spritecollide(player, goals, False):
            state = "win"
        if player.rect.top > HEIGHT:
            state = "lose"

    screen.fill("skyblue")
    all_sprites.draw(screen)
    if state == "win":
        screen.blit(font.render("You win!", True, "white"), (300, 40))
    elif state == "lose":
        screen.blit(font.render("You lose!", True, "white"), (300, 40))
    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 't3-game-states', label: 'Game States' },
    { slug: 'rect-collision', label: 'Rects and Collision' },
    { slug: 'draw-order', label: 'Draw Order' },
    { slug: 'classes', label: 'Classes and Objects' },
    { slug: 'repair-collision-fails', label: 'My collision never fires' },
  ],
  quiz,
  takeaways: [
    'You can add a platform to a level in one line',
    'You can put a sprite in the groups that match the jobs it has',
    'You can explain why touching the flag is only a win if it changes `state`',
    'You can stop a finished game from carrying on underneath the message',
    'You can build a level with a goal, a way to win and a way to lose',
  ],
}

export default w9
