// Review by Week 2: Graphics in Pygame.
// Based on game_dev/space_shooter/w2_main.py.

const w2 = {
  slug: 'w2',
  title: 'Week 2 · Graphics in Pygame',
  subtitle: 'surfaces, blit, loading images, and a moving starfield',
  summary:
    'This week was all about images. You loaded PNG files with `pygame.image.load(...).convert_alpha()` so they keep their transparency, got a floating-point rect with `get_frect()`, and drew them with `blit`. You built a starfield by storing many random positions in a list and blitting a star at each one, then made the player move on its own and **bounce** off the edges by flipping its direction.',
  keyPoints: [
    {
      heading: 'Loading images',
      body: '`pygame.image.load(join("images", "player.png")).convert_alpha()` loads a picture and optimizes it with an alpha channel, so transparent pixels stay transparent when you draw it.',
    },
    {
      heading: 'get_frect()',
      body: '`surface.get_frect(center=(x, y))` returns a **floating-point** rect. Fractional positions make smooth, sub-pixel movement possible.',
    },
    {
      heading: 'Passive movement & bounce',
      body: 'Instead of the keyboard, the player moves by `player_direction * player_speed` every frame. When `player_rect.right > WIDTH` or `.left < 0`, multiply `player_direction` by `-1` to reverse direction and bounce off the wall.',
    },
    {
      heading: 'Drawing many sprites',
      body: 'A `for` loop over a list of `(x, y)` positions blits the star surface at each one, turning a single image into a whole starfield background.',
    },
  ],
  code: `from os.path import join
from random import randint
import pygame

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Shooter")

player_surf = pygame.image.load(join("images", "player.png")).convert_alpha()
player_rect = player_surf.get_frect(center=(WIDTH / 2, HEIGHT / 2))
player_speed = 2.5
player_direction = -1

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
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    player_rect.clamp_ip(screen.get_rect())

    player_rect.x += player_direction * player_speed
    if player_rect.right > WIDTH or player_rect.left < 0:
        player_direction *= -1

    screen.fill("dodgerblue")

    for pos in star_position:
        screen.blit(star_surf, star_surf.get_frect(center=pos))

    screen.blit(meteor_surf, meteor_rect)
    screen.blit(player_surf, player_rect)
    screen.blit(laser_surf, laser_rect)

    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'coordinates', label: 'Coordinates' },
    { slug: 'draw-order', label: 'Draw Order' },
    { slug: 'repair-image-missing', label: 'Image Missing' },
  ],
  takeaways: [
    'You can load image files and draw them as sprites with transparency',
    'You can make a sprite move on its own and bounce off the screen edges',
    'You can draw many copies of one image to build a starfield',
  ],
}

export default w2
