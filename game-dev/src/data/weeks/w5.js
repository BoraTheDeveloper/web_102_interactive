// Review by Week 5: Space Shooter Setup.
// No direct source file. Representative snippet showing project organization,
// asset loading, and the game loop skeleton that bridges w2 and w6.

const w5 = {
  slug: 'w5',
  title: 'Week 5 · Space Shooter Setup',
  subtitle: 'project organization, imports, and loading multiple assets',
  summary:
    'Before adding features, you organized the Space Shooter project. Assets live in `images/` and `audio/` folders and load with `os.path.join` so the paths work on any operating system. You set up the display, loaded several image surfaces at once (`player`, `star`, `meteor`, `laser`), and laid out the basic game-loop skeleton that every later week builds on.',
  keyPoints: [
    {
      heading: 'Project structure',
      body: 'Keep artwork in an `images/` folder and sounds in `audio/`. Loading with `join("images", "player.png")` builds the path correctly on Windows, Mac, and Linux.',
    },
    {
      heading: 'Loading multiple assets',
      body: 'Call `pygame.image.load(...).convert_alpha()` for each sprite up front, once. Loading every frame would be slow, so do it before the loop and reuse the surfaces.',
    },
    {
      heading: 'Display setup',
      body: '`pygame.display.set_mode((WIDTH, HEIGHT))` creates the window and `set_caption("Space Shooter")` sets its title bar text.',
    },
    {
      heading: 'The loop skeleton',
      body: 'Even with no gameplay yet, the structure is fixed: handle events, update, `fill` the background, `blit` the sprites, then `pygame.display.update()`. Later weeks plug movement, collisions, and sound into this skeleton.',
    },
  ],
  code: `from os.path import join
import pygame

pygame.init()
WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Space Shooter")

# --- assets (load once, before the loop) ---
player_surf = pygame.image.load(join("images", "player.png")).convert_alpha()
star_surf = pygame.image.load(join("images", "star.png")).convert_alpha()
meteor_surf = pygame.image.load(join("images", "meteor.png")).convert_alpha()
laser_surf = pygame.image.load(join("images", "laser.png")).convert_alpha()

player_rect = player_surf.get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))

# --- game loop skeleton ---
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    display_surface.fill("darkgray")
    display_surface.blit(player_surf, player_rect)
    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'sprite-groups', label: 'Sprite Groups' },
    { slug: 'repair-image-missing', label: 'Image Missing' },
    { slug: 'coordinates', label: 'Coordinates' },
  ],
  takeaways: [
    'You can organize assets into folders and load them with `os.path.join`',
    'You can set up the display and load several image surfaces before the loop',
    'You understand the event-update-draw skeleton every Pygame game follows',
  ],
}

export default w5
