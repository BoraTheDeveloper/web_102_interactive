// Review by Week 3: Handling User Input.
// Based on game_dev/src/w3-class_activity.py.

const w3 = {
  slug: 'w3',
  title: 'Week 3 · Handling User Input',
  subtitle: 'mouse events vs keyboard state, drawing shapes',
  summary:
    'This week you learned the difference between **events** and **key state**. Mouse clicks arrive as events (`MOUSEBUTTONDOWN` / `MOUSEBUTTONUP`) that fire once, while `pygame.key.get_pressed()` reports the held state of every key each frame for smooth movement. You drew the player with `pygame.draw.circle` and kept it on screen by clamping its position with `max()` and `min()`.',
  keyPoints: [
    {
      heading: 'Events vs key state',
      body: 'Events fire **once** the moment something happens (a click, a press). Key state from `pygame.key.get_pressed()` is checked **every frame**, so it is the right tool for holding a key to move continuously.',
    },
    {
      heading: 'Mouse events',
      body: '`event.type == pygame.MOUSEBUTTONDOWN` gives you `event.pos`, the `(x, y)` you clicked. `MOUSEBUTTONUP` fires when you release, letting you change the player color on click and reset it on release.',
    },
    {
      heading: 'Drawing shapes',
      body: '`pygame.draw.circle(screen, color, (x, y), radius)` draws a circle directly onto the surface, no image file needed. Great for quick prototypes.',
    },
    {
      heading: 'Clamping with max/min',
      body: 'Without a `Rect`, you keep a circle on screen by clamping its center: `player_x = max(player_x, radius)` and `min(player_x, WIDTH - radius)` so the edge never leaves the window.',
    },
  ],
  code: `import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Input Practice")

player_x = 400
player_y = 300
player_radius = 50
player_speed = 5
player_color = 'white'
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            player_x, player_y = event.pos
            player_color = 'orange'
            print(event.pos)
        if event.type == pygame.MOUSEBUTTONUP:
            player_color = 'white'

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player_x -= player_speed
    if keys[pygame.K_RIGHT]:
        player_x += player_speed
    if keys[pygame.K_UP]:
        player_y -= player_speed
    if keys[pygame.K_DOWN]:
        player_y += player_speed

    player_x = max(player_x, player_radius)
    player_x = min(player_x, 800 - player_radius)
    player_y = max(player_y, player_radius)
    player_y = min(player_y, 600 - player_radius)

    screen.fill("midnightblue")
    pygame.draw.circle(screen, player_color, (player_x, player_y), player_radius)
    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'input', label: 'Input' },
    { slug: 'repair-player-no-move', label: "Player Won't Move" },
  ],
  takeaways: [
    'You can handle mouse clicks as events that fire once',
    'You can use key state for smooth, continuous keyboard movement',
    'You can draw shapes with `pygame.draw` and keep them on screen',
  ],
}

export default w3
