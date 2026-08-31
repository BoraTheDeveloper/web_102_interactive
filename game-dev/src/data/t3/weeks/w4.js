// Review by Week 4: Game Mechanics and Logic.
// Source: game_dev/docs/2026_t3/slides/W4 - Game Mechanics and Logic.md (section E).
// This is the first week of the Collector, and this file lives on through Week 7.

const w4 = {
  slug: 'w4',
  title: 'Week 4 · Game Mechanics and Logic',
  subtitle: 'pygame.FRect, colliderect, clamp_ip, score, and text on screen',
  summary:
    'Your controllable circle became a game. Six pieces did it: an `FRect` to hold position and size together, `clamp_ip` to replace last week\'s four boundary checks, `colliderect` to ask whether the player touched the item, a score that goes up, `randint` to move the item somewhere new, and text on screen so you can read the score. This is the Collector, and you keep building on this file until Week 7.',
  keyPoints: [
    {
      heading: 'One FRect replaces two loose numbers',
      body: 'Last week you carried `player_x` and `player_y` around separately. `pygame.FRect(x, y, width, height)` bundles position and size into one object you can move, clamp and test. The F means it keeps decimals, which matters once movement stops being whole numbers.',
    },
    {
      heading: 'The first two numbers are the top left corner',
      body: '`pygame.FRect(380, 280, 40, 40)` does not put the box **centred** at 380, 280. That is its top left corner. The box covers x from 380 to 420. Reading those first two numbers as a centre is a common mistake and it makes every collision look wrong.',
    },
    {
      heading: 'clamp_ip replaces four boundary ifs',
      body: '`player_rect.clamp_ip(screen.get_frect())` pushes the rect back inside the screen in one line. It replaces the four `if` checks you wrote in Week 3. It has to run **after** the movement, because it corrects what the movement did.',
    },
    {
      heading: 'colliderect only answers a question',
      body: '`player_rect.colliderect(item_rect)` gives you True or False and nothing else. It does not score, move or delete anything. The body of the `if` is where you make something happen. Keep those two ideas separate and collision stops being mysterious.',
    },
    {
      heading: 'Score has to survive the loop',
      body: 'Write `score = 0` **before** the loop. Put it inside and it is reset to zero every frame, so the number on screen never moves even though the collision is firing. This is the most common Week 4 bug and you will keep seeing it all term.',
    },
    {
      heading: 'Font once, render every frame',
      body: '`pygame.font.Font(None, 40)` is a tool. Make it once, before the loop. `font.render(...)` is a photograph of the score right now, so it has to be remade every frame and blitted. Move the render outside the loop and the score freezes, the same symptom as the bug above but a different cause.',
    },
  ],
  code: `import pygame
from random import randint

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Collector Mini-game")
font = pygame.font.Font(None, 40)

player_rect = pygame.FRect(380, 280, 40, 40)
item_rect = pygame.FRect(200, 150, 30, 30)
player_speed = 5
score = 0

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player_rect.x -= player_speed
    if keys[pygame.K_RIGHT]:
        player_rect.x += player_speed
    if keys[pygame.K_UP]:
        player_rect.y -= player_speed
    if keys[pygame.K_DOWN]:
        player_rect.y += player_speed

    player_rect.clamp_ip(screen.get_frect())

    if player_rect.colliderect(item_rect):
        score += 1
        item_rect.x = randint(0, WIDTH - item_rect.width)
        item_rect.y = randint(0, HEIGHT - item_rect.height)

    screen.fill("midnightblue")
    pygame.draw.rect(screen, "dodgerblue", player_rect)
    pygame.draw.rect(screen, "gold", item_rect)

    score_surf = font.render(f"Score: {score}", True, "white")
    screen.blit(score_surf, (20, 20))

    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'rect-collision', label: 'Rects and Collision' },
    { slug: 'repair-score-resets', label: 'My score keeps resetting' },
    { slug: 'repair-collision-fails', label: 'My collision never fires' },
    { slug: 'repair-item-spawns-off-screen', label: 'My item spawns half off screen' },
  ],
  takeaways: [
    'You can build a player and an item as `FRect`s and draw them',
    'You can move a rect and keep it on screen with `clamp_ip`',
    'You can drive a score and a respawn off a `colliderect` check',
    'You can respawn an item fully inside the window with `randint` and the item size',
    'You can show a score that updates, and say which part is made once and which every frame',
  ],
}

export default w4
