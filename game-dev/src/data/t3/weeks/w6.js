// Review by Week 6: Sprites and Groups.
// Source: game_dev/docs/2026_t3/slides/W6 - Sprites and Groups.md (section E).
// Sprites and groups only. States are Week 7.

import quiz from '../quizzes/w6.js'

const w6 = {
  slug: 'w6',
  title: 'Week 6 · Sprites and Groups',
  subtitle: 'Inheritance, super().__init__(groups), image and rect, and spritecollide',
  summary:
    'The Collector plays exactly the same as last week. What changed is who does the work. `Player` and `Coin` now inherit from `pygame.sprite.Sprite`, so they can join a group. Your loop stopped naming objects one at a time: `all_sprites.update(dt)` and `all_sprites.draw(screen)` handle the whole team, however many are on it. Twenty coins cost one number instead of sixty lines.',
  keyPoints: [
    {
      heading: 'Twenty coins, or two lines',
      body: 'Last week the loop named every object out loud: `player.update(dt)`, `player.draw(screen)`, `coin.draw(screen)`. Ask what **twenty** coins would cost and the answer is twenty draw calls, twenty collision blocks, and one coin forgotten every time. A group is a team roster. One whistle moves everyone on it, so `all_sprites.update(dt)` and `all_sprites.draw(screen)` are the whole loop no matter how many are on the team.',
    },
    {
      heading: 'A sprite starts from a blueprint Pygame already wrote',
      body: '`class Player(pygame.sprite.Sprite):` is **inheritance**. Your class begins with everything Pygame already built, then adds its own parts. In exchange the team asks for two things by name: `self.image` is what to draw, and `self.rect` is where to draw it. That is all `group.draw(screen)` looks for, which is why a sprite with no `image` crashes on the draw line and not on the line that built it.',
    },
    {
      heading: 'super().__init__(groups) is the line that joins the team',
      body: 'Delete it and nothing breaks. No error, no traceback, no red text. The window opens, the coin is there, the score is there, and your player is simply gone. Arrow keys do nothing. An object that never joined is still a perfectly good object. It is just not on anybody\'s list, so nothing updates it and nothing draws it. **The group is not magic. It is a list**, and that one line is what puts you on it.',
    },
    {
      heading: 'The coin joins two teams, for two different jobs',
      body: '`Coin((all_sprites, coin_group))` hands the sprite a tuple, and that tuple **is** the list of teams. `all_sprites` is who gets updated and drawn. `coin_group` is the shortlist the collision check searches. Same sprite, two lists, two jobs. Drop the brackets and you get `TypeError: __init__() takes 2 positional arguments but 3 were given`, because the tuple became two separate arguments.',
    },
    {
      heading: 'spritecollide hands back a list, and False means keep it',
      body: '`pygame.sprite.spritecollide(player, coin_group, False)` gives you a **list** of everything the player is touching, so you loop over it. The third argument is `dokill`. `True` would delete every coin it found, so you collect once and the board is empty forever. `False` plus `hit.respawn()` is what keeps the game going. Search `coin_group`, not `all_sprites`: the player is in `all_sprites`, so it would collide with itself and the score would climb forever.',
    },
  ],
  code: `import pygame
from random import randint

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Collector - Sprites")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 40)

all_sprites = pygame.sprite.Group()
coin_group = pygame.sprite.Group()


class Player(pygame.sprite.Sprite):
    def __init__(self, x, y, groups):
        super().__init__(groups)
        self.image = pygame.Surface((40, 40))
        self.image.fill("dodgerblue")
        self.rect = self.image.get_frect(topleft=(x, y))
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


class Coin(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)
        self.image = pygame.Surface((30, 30))
        self.image.fill("gold")
        self.rect = self.image.get_frect(topleft=(200, 150))

    def respawn(self):
        self.rect.x = randint(0, WIDTH - self.rect.width)
        self.rect.y = randint(0, HEIGHT - self.rect.height)


player = Player(380, 280, all_sprites)
coin = Coin((all_sprites, coin_group))
score = 0

running = True
while running:
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    all_sprites.update(dt)

    hits = pygame.sprite.spritecollide(player, coin_group, False)
    for hit in hits:
        score += 1
        hit.respawn()

    screen.fill("midnightblue")
    all_sprites.draw(screen)

    score_surf = font.render(f"Score: {score}", True, "white")
    screen.blit(score_surf, (20, 20))

    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'classes', label: 'Classes and Objects' },
    { slug: 't3-inheritance', label: 'Inheritance and Sprites' },
    { slug: 'rect-collision', label: 'Rects and Collision' },
    { slug: 'repair-nothing-draws', label: 'Nothing I draw shows up' },
    { slug: 'repair-collision-fails', label: 'My collision never fires' },
  ],
  quiz,
  takeaways: [
    'You can explain inheritance as starting from a blueprint someone else wrote',
    'You can write a sprite class with `self.image` and `self.rect`',
    'You can update and draw a whole group in two lines',
    'You can say why a sprite that never joined its group shows no error at all',
    'You can check one sprite against a group with `spritecollide` and choose whether what you hit is deleted',
  ],
}

export default w6
