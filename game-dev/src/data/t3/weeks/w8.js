// Review by Week 8: Platformer, Gravity and Jump.
// Source: game_dev/docs/2026_t3/slides/W8 - Platformer Gravity and Jump.md (section E,
// the must-do file). The second code block in section E is the Mini Challenge and
// uses JUMP = -18. The main path is -16.

import quiz from '../quizzes/w8.js'

const w8 = {
  slug: 'w8',
  title: 'Week 8 · Platformer: Gravity and Jump',
  subtitle: 'direction.y, GRAVITY, JUMP, on_floor, and landing',
  summary:
    'New game, new file, same skeleton. You started `week8_platformer.py` from scratch and the sprite class you learned on the Collector worked unchanged in a completely different game. What is new is gravity: a speed that grows every frame and pulls the player down until something solid stops it. By the end you had a player who falls, lands on a platform, walks, and jumps.',
  keyPoints: [
    {
      heading: 'Gravity is a speed that grows, not a distance',
      body: 'Two lines do the whole job. `self.direction.y += GRAVITY` makes the falling speed bigger, then `self.rect.y += self.direction.y` moves the player by that speed. Because the speed keeps growing, the drop accelerates. Start from rest with `GRAVITY = 1` and after three frames you have fallen 1 + 2 + 3 = 6 pixels, not 3. This platformer counts in pixels per frame, so `update` still takes `dt` but does not multiply by it. That is deliberate. Do not add `* dt` here.',
    },
    {
      heading: 'Landing does three things',
      body: 'Snap the feet with `self.rect.bottom = platform.rect.top`, stop the fall with `self.direction.y = 0`, and raise the flag with `self.on_floor = True`. Delete the middle one and the player **still looks fine** for about a second. The snap keeps yanking the feet back to the platform top, so it looks like standing. But `direction.y` never stopped growing, and eventually one frame moves the player further than the platform is thick. The overlap check finds nothing, and the player drops straight through and is gone.',
    },
    {
      heading: 'on_floor is the difference between a platformer and flying',
      body: '`if keys[pygame.K_SPACE] and self.on_floor:` is what makes a jump legal. Drop the `on_floor` half and Space works in mid-air, so you have written flying. The flag is set by landing and cleared at the start of the collision check every frame, which means the jump you press this frame is asking about the ground you were on last frame. That is exactly right: landing put you there, and you have not fallen yet.',
    },
    {
      heading: 'Two groups, two jobs',
      body: '`all_sprites` decides what gets **drawn**. `platforms` decides what is **solid**. The ground sprite joins both, because you want to see it and you want to stand on it. The player only joins `all_sprites`, and gets handed the `platforms` group so it knows what to check against. This is the same two-group idea as the Week 6 coin, doing a different job.',
    },
    {
      heading: 'The order inside update is the whole trick',
      body: 'Keys and jump, then gravity, then move down, then land. Reading the keys first means a jump this frame is applied before gravity fights it. Moving before checking for a landing is what puts the player **inside** the platform for a frame, which is exactly what makes the overlap detectable and the snap possible. Shuffle these four steps and you get a player who jitters, sticks, or falls through.',
    },
  ],
  code: `import pygame

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Platformer - Gravity and Jump")
clock = pygame.time.Clock()

GRAVITY = 1
JUMP = -16
MOVE = 5


class Platform(pygame.sprite.Sprite):
    def __init__(self, x, y, w, h, groups):
        super().__init__(groups)
        self.image = pygame.Surface((w, h))
        self.image.fill("sienna")
        self.rect = self.image.get_frect(topleft=(x, y))


class Player(pygame.sprite.Sprite):
    def __init__(self, pos, groups, platforms):
        super().__init__(groups)
        self.image = pygame.Surface((40, 60))
        self.image.fill("dodgerblue")
        self.rect = self.image.get_frect(midbottom=pos)
        self.platforms = platforms
        self.direction = pygame.Vector2()
        self.on_floor = False

    def update(self, dt):
        keys = pygame.key.get_pressed()
        self.direction.x = int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])
        self.rect.x += self.direction.x * MOVE

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


all_sprites = pygame.sprite.Group()
platforms = pygame.sprite.Group()

Platform(0, 520, WIDTH, 80, (all_sprites, platforms))
player = Player((120, 300), all_sprites, platforms)

running = True
while running:
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    all_sprites.update(dt)

    screen.fill("skyblue")
    all_sprites.draw(screen)
    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 't3-gravity-jump', label: 'Gravity and Jump' },
    { slug: 'rect-collision', label: 'Rects and Collision' },
    { slug: 'classes', label: 'Classes and Objects' },
    { slug: 'repair-collision-fails', label: 'My collision never fires' },
    { slug: 'repair-player-no-move', label: 'My player will not move' },
  ],
  quiz,
  takeaways: [
    'You can explain gravity as a speed that grows every frame',
    'You can name the three things landing has to do, and what breaks if you skip one',
    'You can use `on_floor` so a jump is only legal from the ground',
    'You can say which group decides what is drawn and which decides what is solid',
    'You can put the steps inside `update` in an order that actually lands',
  ],
}

export default w8
