// Review by Week 1: Intro to Pygame & Game Development.
// Based on game_dev/space_shooter/w1_main.py.

const w1 = {
  slug: 'w1',
  title: 'Week 1 · Intro to Pygame & Game Development',
  subtitle: 'pygame.init(), the display, the event loop, and your first window',
  summary:
    'You wrote your first Pygame program: call `pygame.init()`, create a display surface with `pygame.display.set_mode()`, then keep the window open with a `while running` loop. Inside that loop you poll events with `pygame.event.get()`, read the keyboard with `pygame.key.get_pressed()` to move a player, and draw images with `blit`. `clamp_ip` keeps the player inside the window.',
  keyPoints: [
    {
      heading: 'pygame.init() & the display',
      body: 'Call `pygame.init()` once to start every Pygame module, then create your window with `pygame.display.set_mode((WIDTH, HEIGHT))`. Everything you draw goes onto this surface.',
    },
    {
      heading: 'The event loop',
      body: 'A `while running:` loop runs every frame. Inside it, `for event in pygame.event.get()` reads the queue; when `event.type == pygame.QUIT` you set `running = False` and the window closes cleanly.',
    },
    {
      heading: 'Keyboard movement',
      body: '`pygame.key.get_pressed()` returns the state of every key **each frame**, so holding an arrow key moves the player continuously. Check `K_LEFT`, `K_RIGHT`, `K_UP`, and `K_DOWN` and adjust `player_rect.x` / `.y`.',
    },
    {
      heading: 'blit & clamp_ip',
      body: '`screen.blit(surface, rect)` draws an image onto the display. `player_rect.clamp_ip(screen.get_rect())` pushes the player back inside the window if it tries to leave.',
    },
  ],
  code: `from os.path import join
import pygame

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Shooter")

player_surf = pygame.image.load(join("images", "player.png")).convert_alpha()
player_rect = player_surf.get_frect(center=(WIDTH / 2, HEIGHT / 2))
player_speed = 2.5

test_surf = pygame.Surface((100, 200))
test_surf.fill("red")

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_a] or keys[pygame.K_LEFT]:
        player_rect.x -= player_speed
    if keys[pygame.K_RIGHT]:
        player_rect.x += player_speed
    if keys[pygame.K_UP]:
        player_rect.y -= player_speed
    if keys[pygame.K_DOWN]:
        player_rect.y += player_speed

    player_rect.clamp_ip(screen.get_rect())

    screen.fill("lightblue")
    screen.blit(test_surf, (100, 100))
    screen.blit(player_surf, player_rect)
    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'game-loop', label: 'Game Loop' },
    { slug: 'repair-window-opens-closes', label: 'Window Opens & Closes' },
  ],
  takeaways: [
    'You can create a Pygame window that stays open until you close it',
    'You understand the event loop and the `QUIT` event',
    'You can move a player with the keyboard and keep it on screen with `clamp_ip`',
  ],
}

export default w1
