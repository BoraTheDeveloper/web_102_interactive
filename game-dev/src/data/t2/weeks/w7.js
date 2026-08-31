// Review by Week 7: Movement, Delta Time, and Input.
// Based on game_dev/space_shooter/w7_main.py.

const w7 = {
  slug: 'w7',
  title: 'Week 7 · Movement, Delta Time, and Input',
  subtitle: 'Clock, delta time, KEYDOWN events vs key state',
  summary:
    'This week fixed a hidden problem: movement tied to the frame rate. You added a `pygame.time.Clock` and computed `dt = clock.tick(60) / 1000`, the seconds since the last frame. Multiplying speed by `dt` makes movement **frame-rate independent** so the game runs at the same speed on any computer. You also distinguished `KEYDOWN` events (fire once on press) from key state (held continuously) and used a `KEYDOWN` + `K_SPACE` check to shoot.',
  keyPoints: [
    {
      heading: 'Clock & delta time',
      body: '`clock.tick(60)` caps the frame rate at 60 FPS and returns the milliseconds since the last frame. Dividing by `1000` gives `dt` in **seconds**.',
    },
    {
      heading: 'Frame-rate independent movement',
      body: 'With `speed` in pixels-per-second, move by `speed * dt` each frame. Whether the computer runs at 30 or 144 FPS, the sprite covers the same real-world distance per second.',
    },
    {
      heading: 'KEYDOWN vs key state',
      body: 'A `KEYDOWN` event fires **once**, the moment a key is pressed, perfect for single-shot actions like shooting. `pygame.key.get_pressed()` reports held state every frame, perfect for continuous movement.',
    },
    {
      heading: 'Space to shoot',
      body: 'Inside the event loop, `if event.type == pygame.KEYDOWN` and `event.key == pygame.K_SPACE` triggers exactly one shot per press instead of a stream while held.',
    },
  ],
  code: `from os.path import join
from random import randint
import pygame

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Shooter")

# Create a clock to control frame rate
clock = pygame.time.Clock()

player_surf = pygame.image.load(join("images", "player.png")).convert_alpha()
player_rect = player_surf.get_frect(center=(WIDTH / 2, HEIGHT / 2))
player_speed = 300
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
    # Delta time: seconds since the last frame
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Check for space key press DOWN, once
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                print("Shoot")

    keys = pygame.key.get_pressed()
    if keys[pygame.K_a] or keys[pygame.K_LEFT]:
        player_rect.x -= player_speed * dt
    if keys[pygame.K_RIGHT]:
        player_rect.x += player_speed * dt
    if keys[pygame.K_UP]:
        player_rect.y -= player_speed * dt
    if keys[pygame.K_DOWN]:
        player_rect.y += player_speed * dt

    player_rect.clamp_ip(screen.get_rect())

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
    { slug: 'delta-time', label: 'Delta Time' },
    { slug: 'input', label: 'Input' },
    { slug: 'repair-laser-no-shoot', label: "Laser Won't Shoot" },
    { slug: 'repair-player-too-fast', label: 'Player Too Fast' },
  ],
  takeaways: [
    'You can use a Clock and `dt` so movement is the same speed on any computer',
    'You can tell one-time key presses (events) apart from held keys (state)',
    'You can trigger an action like shooting on a single key press',
  ],
}

export default w7
