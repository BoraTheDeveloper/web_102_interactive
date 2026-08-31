// Review by Week 6: Assets and Passive Movement.
// Based on game_dev/space_shooter/w6_main.py.

const w6 = {
  slug: 'w6',
  title: 'Week 6 · Assets and Passive Movement',
  subtitle: 'loading images, auto-movement, bouncing off walls',
  summary:
    'You loaded a full set of image assets and put them in motion. The player, stars, meteor, and laser are all loaded with `convert_alpha()` and drawn with `blit`. Instead of keyboard control, the player drifts on its own via `player_direction * player_speed` and **bounces** off the left and right walls by flipping its direction. A loop over random star positions paints a starfield behind everything.',
  keyPoints: [
    {
      heading: 'Loading assets',
      body: 'Each sprite gets `pygame.image.load(join("images", "name.png")).convert_alpha()` once, before the loop. `convert_alpha()` matches the image to the display format for fast, transparent blitting.',
    },
    {
      heading: 'Passive movement',
      body: 'With no keyboard input, the sprite still moves: `player_rect.x += player_direction * player_speed` runs every frame, so the player drifts across the screen automatically.',
    },
    {
      heading: 'Bounce off walls',
      body: 'When `player_rect.right > WINDOW_WIDTH` or `player_rect.left < 0`, do `player_direction *= -1`. The sign flip reverses the direction and the sprite bounces back into view.',
    },
    {
      heading: 'Starfield background',
      body: 'A list of random `(x, y)` positions is built once with `randint`, then a `for` loop blits the star surface at each position to fill the background with stars.',
    },
  ],
  code: `from os.path import join
from random import randint
import pygame

pygame.init()
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Space Shooter")

player_surf = pygame.image.load(join("images", "player.png")).convert_alpha()
player_rect = player_surf.get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))
player_speed = 0.5
player_direction = -1

star_surf = pygame.image.load(join("images", "star.png")).convert_alpha()
meteor_surf = pygame.image.load(join("images", "meteor.png")).convert_alpha()
laser_surf = pygame.image.load(join("images", "laser.png")).convert_alpha()

meteor_rect = meteor_surf.get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))
laser_rect = laser_surf.get_frect(bottomleft=(20, WINDOW_HEIGHT - 20))

# Create 20 stars, place randomly
star_positions = []
for i in range(20):
    star_positions.append((randint(0, WINDOW_WIDTH), randint(0, WINDOW_HEIGHT)))

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Make the player move horizontally, passively
    player_rect.x += player_direction * player_speed

    # When it hits the edge of the wall, bounce back (* -1)
    if player_rect.right > WINDOW_WIDTH or player_rect.left < 0:
        player_direction *= -1

    display_surface.fill("darkgray")

    # Draw all stars
    for pos in star_positions:
        display_surface.blit(star_surf, pos)

    display_surface.blit(meteor_surf, meteor_rect)
    display_surface.blit(laser_surf, laser_rect)
    display_surface.blit(player_surf, player_rect)

    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'coordinates', label: 'Coordinates' },
    { slug: 'repair-player-too-fast', label: 'Player Too Fast' },
    { slug: 'repair-image-missing', label: 'Image Missing' },
  ],
  takeaways: [
    'You can load a set of image assets and draw them together on screen',
    'You can make a sprite move on its own and bounce off the edges',
    'You can build a starfield background by drawing many sprites',
  ],
}

export default w6
