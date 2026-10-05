// Review by Week 9: Platformer, A Complete Level.
// Source: game_dev/docs/2026_t3/slides/W9 - Platformer A Complete Level.md
// (October 2026 rework: camera, pictures, animation, commented-answer starter).
// `code` is section E's first block, the required level. The Make features
// (restart, camera ends, coins, worm) are the Mini Challenge and stay out.

import quiz from '../quizzes/w9.js'

const w9 = {
  slug: 'w9',
  title: 'Week 9 · Platformer: A Complete Level',
  subtitle: 'A level wider than the window, a camera that follows, and a player that walks',
  summary:
    'Last week you had a hop. This week you have a level: six platforms across a world **1600** pixels wide, a flag at the far end, and a gap to fall through. The game now **ends**: one `state` variable holds `"playing"`, `"win"` or `"lose"`. The window only shows half the level, so it became a **camera** that follows you. The boxes became pictures, and the player walks with moving legs. Every answer except two is still in your starter file, hidden in `EXERCISE` comments. Uncomment one exercise at a time and run it. With Pong finished for homework, that is three complete games.',
  keyPoints: [
    {
      heading: 'A new platform costs one line',
      body: 'The `Platform` class you wrote last week keeps paying you back. `Platform(1000, 360, 160, 24, (all_sprites, platforms))` is a whole new ledge: position, size, and the two groups it joins. Six of those lines build the entire level. The platforms join `all_sprites` so they are drawn and `platforms` so they are solid. The flag joins `all_sprites` and `goals`, so `spritecollide(player, goals, False)` can ask "am I touching a goal?"',
    },
    {
      heading: 'Winning is a state change, not an overlap',
      body: 'Touching the flag is not a win by itself. It is a win because the touch runs `state = "win"`. If you only add a score there, the player overlaps the flag and nothing happens. Adding to a score is the habit your fingers have from the Collector. **The flag needs a door, not a counter.**',
    },
    {
      heading: 'A game only ends when you stop updating it',
      body: 'Reach the flag and "You win!" appears. Now keep holding Right, walk off the platform and fall past the bottom. The banner flips to "You lose!" `all_sprites.update(dt)` never stopped, so the player kept falling and the lose check overwrote `state`. Putting the update and both checks **inside** `if state == "playing":` is what actually ends the game. That line is one of the two you type yourself.',
    },
    {
      heading: 'The camera moves the drawing, never the sprite',
      body: 'Every sprite now has a **world position**, where it lives in the level, and a **screen position**, where it is drawn. `screen position = world position + offset`, and `offset.x = -(player x - WIDTH / 2)`. With the player at world x 1000 the offset is -600, so the player is drawn at 400, the middle, and the world slides left under them. `AllSprites` replaces the plain group only to add that offset when drawing. `rect` never changes, so landing and the win and lose checks keep working untouched. The "You win!" text is drawn without the offset because it belongs to the window.',
    },
    {
      heading: 'I can see it. I cannot reach it.',
      body: 'With the camera working, the far platforms are on screen, but the player stops dead at world x 760. The side clamp from Week 8 still says `WIDTH - self.rect.width`. That kept you inside the **window**, but `rect.x` is a **world** position now. Change `WIDTH` to `LEVEL_WIDTH` and the player walks to the flag. That one word is the second line you type yourself.',
    },
    {
      heading: 'A picture is a Surface. The rect is still the rect.',
      body: '`pygame.image.load("images/player/0.png")` returns a Surface, the same kind of thing as `pygame.Surface((40, 60))`, so it replaces both the `Surface` line and the `fill` line. `get_frect` takes its size from the picture (64 × 64), and everything that reads the rect keeps working. The path is relative to the folder VS Code has open, so open the folder that holds both the `.py` file and `images/`.',
    },
    {
      heading: 'Animation is a flipbook',
      body: '`self.frames` is a list of three pictures. `self.frame_index` grows by `10 * dt` while you walk, ten pictures a second. `self.frames[int(self.frame_index) % len(self.frames)]` picks one: `int` makes it a whole number and `%` loops 3 back to 0. Standing shows picture 0, the air holds picture 1, and walking left flips the picture. `animate` runs last in `update`, after movement and landing have set `direction.x` and `on_floor`.',
    },
  ],
  code: `import pygame

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Platformer — A Complete Level")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 48)

GRAVITY = 3600
JUMP = -960
MOVE = 300
START_POS = (80, 520)
LEVEL_WIDTH = 1600


class Platform(pygame.sprite.Sprite):
    def __init__(self, x, y, w, h, groups):
        super().__init__(groups)
        self.image = pygame.Surface((w, h))
        self.image.fill("sienna")
        self.rect = self.image.get_frect(topleft=(x, y))


class Goal(pygame.sprite.Sprite):
    def __init__(self, pos, groups):
        super().__init__(groups)
        self.image = pygame.image.load("images/flag.png")
        self.rect = self.image.get_frect(midbottom=pos)


class AllSprites(pygame.sprite.Group):
    def __init__(self):
        super().__init__()
        self.display_surface = pygame.display.get_surface()
        self.offset = pygame.Vector2()

    def draw(self, target_pos):
        self.offset.x = -(target_pos[0] - WIDTH / 2)

        for sprite in self:
            self.display_surface.blit(sprite.image, sprite.rect.topleft + self.offset)


class Player(pygame.sprite.Sprite):
    def __init__(self, pos, groups, platforms):
        super().__init__(groups)
        self.frames = [
            pygame.image.load("images/player/0.png"),
            pygame.image.load("images/player/1.png"),
            pygame.image.load("images/player/2.png"),
        ]
        self.frame_index = 0
        self.flip = False
        self.image = self.frames[0]
        self.rect = self.image.get_frect(midbottom=pos)
        self.direction = pygame.Vector2()
        self.on_floor = False
        self.platforms = platforms

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

        self.rect.x = max(0, min(self.rect.x, LEVEL_WIDTH - self.rect.width))
        self.animate(dt)

    def animate(self, dt):
        if self.direction.x:
            self.frame_index += 10 * dt
            self.flip = self.direction.x < 0
        else:
            self.frame_index = 0
        if not self.on_floor:
            self.frame_index = 1
        self.image = self.frames[int(self.frame_index) % len(self.frames)]
        self.image = pygame.transform.flip(self.image, self.flip, False)


all_sprites = AllSprites()
platforms = pygame.sprite.Group()
goals = pygame.sprite.Group()

Platform(0, 520, 360, 80, (all_sprites, platforms))
Platform(250, 430, 170, 24, (all_sprites, platforms))
Platform(500, 340, 170, 24, (all_sprites, platforms))
Platform(760, 420, 160, 24, (all_sprites, platforms))
Platform(1000, 360, 160, 24, (all_sprites, platforms))
Platform(1240, 300, 200, 24, (all_sprites, platforms))
Goal((1400, 300), (all_sprites, goals))
player = Player(START_POS, all_sprites, platforms)

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
    all_sprites.draw(player.rect.center)
    if state == "win":
        screen.blit(font.render("You win!", True, "white"), (300, 40))
    elif state == "lose":
        screen.blit(font.render("You lose!", True, "white"), (300, 40))
    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 't3-camera', label: 'The Camera' },
    { slug: 't3-pictures', label: 'Pictures as Sprites' },
    { slug: 't3-animation', label: 'Frame Animation' },
    { slug: 't3-game-states', label: 'Game States' },
    { slug: 'rect-collision', label: 'Rects and Collision' },
    { slug: 'repair-collision-fails', label: 'My collision never fires' },
  ],
  quiz,
  takeaways: [
    'You can add a platform to a level in one line',
    'You can explain why touching the flag is only a win if it changes `state`',
    'You can stop a finished game from carrying on underneath the message',
    'You can explain the difference between a world position and a screen position',
    'You can explain why the side clamp needs `LEVEL_WIDTH` once the camera follows',
    'You can swap a coloured box for a picture without touching the collision code',
    'You can explain how `int(frame_index) % len(frames)` picks the next picture',
  ],
}

export default w9
