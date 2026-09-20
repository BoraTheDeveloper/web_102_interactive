// Review by Week 8: Platformer, Gravity and Jump.
// Source: game_dev/docs/2026_t3/slides/W8 - Platformer Gravity and Jump.md (section E,
// the must-do file). Every number is per second and every position line is
// multiplied by dt: MOVE = 300, GRAVITY = 3600, JUMP = -960. The second code block in
// section E is the Mini Challenge and raises JUMP to -1080 so the player can reach the
// stretch platform.
// The one deliberate difference from the deck listing: the deck writes its em dashes as
// "  -  " in set_caption, as every other deck does; the code students read here uses " - ",
// matching w6.js, w7.js and w9.js.

import quiz from '../quizzes/w8.js'

const w8 = {
  slug: 'w8',
  title: 'Week 8 · Platformer: Gravity and Jump',
  subtitle: 'direction.y, GRAVITY, JUMP, on_floor, and landing',
  summary:
    'New game, new file, same sprite shape. You started `week8_platformer.py` from the given stub, and the shape you learned on the Collector carried over unchanged into a completely different game. What is new is gravity: a speed that grows every frame and pulls the player down until something solid stops it. By the end you had a player who falls, lands on a platform, walks, and jumps.',
  keyPoints: [
    {
      heading: 'Gravity is a speed that grows, not a distance',
      body: 'Two lines do the whole job. `self.direction.y += GRAVITY * dt` makes the falling speed bigger, then `self.rect.y += self.direction.y * dt` moves the player by that speed. Because the speed keeps growing, the drop accelerates. Start from rest with `GRAVITY = 3600` px/s² and at 60 fps the speed gains 60 px/s each frame, so after three frames the player has fallen 1 + 2 + 3 = 6 pixels, not 3. Gravity is an *acceleration*: pixels per second squared, not pixels per frame. The `* dt` is what keeps the fall the same on a slow computer - a slow frame adds a bigger slice of speed and moves a bigger step, in the same ratio - which is the same `speed * dt` the Collector walked with last week.',
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

GRAVITY = 3600        # Mini Challenge 3: tune these two until the hop feels right
JUMP = -960
MOVE = 300


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
        self.rect.x += self.direction.x * MOVE * dt

        if keys[pygame.K_SPACE] and self.on_floor:
            self.direction.y = JUMP

        self.direction.y += GRAVITY * dt
        self.rect.y += self.direction.y * dt

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
