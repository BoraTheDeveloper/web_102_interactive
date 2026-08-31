// Review by Week 4: Game Mechanics and Logic.
// Based on game_dev/src/w4/w4.py and w4-class_activity.py.

const w4 = {
  slug: 'w4',
  title: 'Week 4 · Game Mechanics and Logic',
  subtitle: 'Rect collision, a coin-collector mini-game, and keeping score',
  summary:
    'You turned a moving box into a real mini-game. A `pygame.Rect` bundles a sprite\'s position and size in one object, and `colliderect()` tells you the moment two rects overlap. When the player touches the coin, the score goes up and the coin jumps to a new random spot. You drew the live score with `pygame.font` and kept the player on screen with `clamp_ip`.',
  keyPoints: [
    {
      heading: 'pygame.Rect',
      body: 'A `Rect` holds `x, y, width, height` together, so moving, comparing, and clamping a sprite become one-liners like `player_rect.x += player_speed`.',
    },
    {
      heading: 'colliderect()',
      body: '`player_rect.colliderect(item_rect)` returns `True` the instant the two rects overlap. That single check is the foundation for picking up items, hitting walls, and landing hits.',
    },
    {
      heading: 'Score & font',
      body: '`font.render(f"Score: {score}", True, "white")` turns text into a surface you can `blit`. Bump `score += 1` on each pickup and the number updates on screen every frame.',
    },
    {
      heading: 'Respawn the item',
      body: 'After a collision, move the coin to a fresh random spot with `randint(0, WIDTH - item_rect.width)` so the player has a new target to chase.',
    },
  ],
  code: `from random import randint
import pygame

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Collector Mini-game")
font = pygame.font.Font(None, 40)

player_rect = pygame.Rect(380, 280, 40, 40)
item_rect = pygame.Rect(200, 150, 30, 30)
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

    player_rect.clamp_ip(screen.get_rect())

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
    { slug: 'rect-collision', label: 'Rect Collision' },
    { slug: 'repair-collision-fails', label: 'Collision Fails' },
    { slug: 'repair-score-resets', label: 'Score Resets' },
  ],
  takeaways: [
    'You can build a mini-game where you collect items and your score climbs',
    'You can detect overlap between two rects with `colliderect()`',
    'You can display a live score on screen with `pygame.font`',
  ],
}

export default w4
