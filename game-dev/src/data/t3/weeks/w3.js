// Review by Week 3: Handling User Input.
// Source: game_dev/docs/2026_t3/slides/W3 - Handling User Input.md
// (section E, "Simpler version (no color change)").

const w3 = {
  slug: 'w3',
  title: 'Week 3 · Handling User Input',
  subtitle: 'Held keys, mouse clicks, and keeping the player on screen',
  summary:
    'You turned a shape you could only look at into one you can drive. The trick was replacing the hard coded numbers in your draw call with variables, then changing those variables every frame. You read held arrow keys with `pygame.key.get_pressed()`, handled a one time mouse click as an event, and used four `if` checks to keep the player inside the window.',
  keyPoints: [
    {
      heading: 'A position is a variable',
      body: 'Last week you drew a circle at `(400, 300)`. Those numbers could never change. Store them as `player_x` and `player_y` instead, draw at those variables, and change them each frame. That is all movement is.',
    },
    {
      heading: 'get_pressed() is a snapshot',
      body: '`pygame.key.get_pressed()` gives you the state of every key **at the moment you call it**. Call it fresh inside the loop, every frame, and holding an arrow key moves the player continuously. Call it once before the loop and the player moves once, then freezes forever.',
    },
    {
      heading: 'Clicks are events, holds are state',
      body: 'A held key is **state**: ask about it every frame with `get_pressed()`. A mouse click is an **event**: it happens once, so you catch it inside the event loop with `pygame.MOUSEBUTTONDOWN` and read `event.pos` for where it landed. Putting one in the other place is a real bug, and this split comes back in Week 7.',
    },
    {
      heading: 'Boundary ifs keep the player on screen',
      body: 'Move first, then correct. Four `if` checks push the player back if it went too far. A circle draws from its **centre**, so the edge is at `player_radius`, not at 0. Forget the radius and the circle hangs half off the window.',
    },
    {
      heading: 'Four separate ifs, and a debt',
      body: 'Four separate `if`s, not `elif`, so you can hold two arrows at once and move diagonally. That diagonal is visibly **faster** than straight, because you moved the full speed twice. It is a real bug and it is left in on purpose. Week 7 pays it off with vectors.',
    },
  ],
  code: `import pygame

pygame.init()

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Input Practice")

player_x = 400
player_y = 300
player_radius = 30
player_speed = 5

running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            player_x, player_y = event.pos

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player_x -= player_speed
    if keys[pygame.K_RIGHT]:
        player_x += player_speed
    if keys[pygame.K_UP]:
        player_y -= player_speed
    if keys[pygame.K_DOWN]:
        player_y += player_speed

    if player_x < player_radius:
        player_x = player_radius
    if player_x > 800 - player_radius:
        player_x = 800 - player_radius
    if player_y < player_radius:
        player_y = player_radius
    if player_y > 600 - player_radius:
        player_y = 600 - player_radius

    screen.fill("midnightblue")
    pygame.draw.circle(screen, "orange", (player_x, player_y), player_radius)
    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'input', label: 'Keyboard and Mouse Input' },
    { slug: 'repair-moves-once-then-freezes', label: 'My player moves once then freezes' },
    { slug: 'repair-player-no-move', label: 'My player will not move' },
  ],
  takeaways: [
    'You can replace hard coded draw positions with variables and get motion',
    'You can read held keys every frame and move in four directions',
    'You can keep a circle inside the window, counting its radius',
    'You can say which code belongs in the event loop and which belongs outside it',
  ],
}

export default w3
