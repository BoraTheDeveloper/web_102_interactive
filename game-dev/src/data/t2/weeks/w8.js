// Review by Week 8: Player Movement and Simple Classes.
// Based on game_dev/space_shooter/w8_main.py.

const w8 = {
  slug: 'w8',
  title: 'Week 8 · Player Movement and Simple Classes',
  subtitle: 'a Player class, Vector2, and normalize for diagonal movement',
  summary:
    'You introduced object-oriented programming with a `Player` class that bundles its `image` and `rect` together. Movement switched to `pygame.math.Vector2`, a single object holding both `x` and `y`. Building the direction straight from the keys (`int(K_RIGHT) - int(K_LEFT)`) gives `-1`, `0`, or `+1`, and `normalize()` keeps diagonal movement the same speed as moving in a single direction.',
  keyPoints: [
    {
      heading: 'The Player class',
      body: '`class Player:` with an `__init__` loads the image and creates the rect once. Bundling the data in a class means the sprite carries its own image and position instead of loose variables.',
    },
    {
      heading: 'Vector2 direction',
      body: '`pygame.math.Vector2` stores `x` and `y` in one object, so you can add, scale, and measure a direction without separate variables. `player_rect.center += direction * speed * dt` moves the sprite in one line.',
    },
    {
      heading: 'normalize()',
      body: 'A diagonal vector is longer than a single-axis one, so diagonal movement would be faster. `normalize()` scales the vector to length `1`, making every direction the same speed.',
    },
    {
      heading: 'Direction from keys',
      body: '`int(keys[K_RIGHT]) - int(keys[K_LEFT])` turns `True`/`False` into `1`/`0`, giving `-1`, `0`, or `+1` for each axis. Combine `x` and `y` into one direction vector straight from the keyboard.',
    },
  ],
  code: `from os.path import join
from random import randint
import pygame

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Shooter")

clock = pygame.time.Clock()

class Player:
    def __init__(self):
        self.image = pygame.image.load(join("images", "player.png")).convert_alpha()
        self.rect = self.image.get_frect(center=(WIDTH / 2, HEIGHT / 2))

player = Player()

player_surf = pygame.image.load(join("images", "player.png")).convert_alpha()
player_rect = player_surf.get_frect(center=(WIDTH / 2, HEIGHT / 2))
player_speed = 300
player_direction = pygame.math.Vector2(0, 0)

star_surf = pygame.image.load(join("images", "star.png")).convert_alpha()
meteor_surf = pygame.image.load(join("images", "meteor.png")).convert_alpha()
meteor_rect = meteor_surf.get_frect(center=(WIDTH / 2, HEIGHT / 2))

laser_surf = pygame.image.load(join("images", "laser.png")).convert_alpha()
laser_rect = laser_surf.get_frect(bottomleft=(20, HEIGHT - 20))

star_position = []
for i in range(200):
    star_position.append((randint(0, WIDTH), randint(0, HEIGHT)))

running = True
while running:
    dt = clock.tick(10) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                print("Shoot")

    keys = pygame.key.get_pressed()

    # Build a direction vector straight from the keys (-1, 0, or +1)
    player_direction.x = int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])
    player_direction.y = int(keys[pygame.K_DOWN]) - int(keys[pygame.K_UP])

    # Normalize so diagonal movement is not faster than cardinal
    if player_direction.length() > 0:
        player_direction = player_direction.normalize()

    player_rect.center += player_direction * player_speed * dt

    player_rect.clamp_ip(screen.get_rect())

    screen.fill("dodgerblue")

    for pos in star_position:
        screen.blit(star_surf, star_surf.get_frect(center=pos))

    screen.blit(meteor_surf, meteor_rect)
    screen.blit(player.image, player.rect)
    screen.blit(laser_surf, laser_rect)

    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'classes', label: 'Classes' },
    { slug: 'repair-player-no-move', label: "Player Won't Move" },
    { slug: 'repair-class-error', label: 'Class Error' },
  ],
  takeaways: [
    'You can define a class to bundle a sprite\'s image and rect together',
    'You can use `Vector2` and `normalize()` for smooth, equal-speed diagonal movement',
    'You can build a direction vector directly from the keyboard state',
  ],
}

export default w8
