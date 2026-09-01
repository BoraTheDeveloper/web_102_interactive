// Visual concept: Rects and Collision.
// Source: game_dev/docs/2026_t3/slides/W4 - Game Mechanics and Logic.md.
// FRect, not integer Rect. T3 uses pygame.FRect from Week 4 onward because
// speed * dt produces decimals from Week 5.

const rectCollision = {
  slug: 'rect-collision',
  title: 'Rects and Collision',
  subtitle: 'One box holds position and size, and answers True or False',
  recap:
    'A `pygame.FRect(x, y, width, height)` bundles where a thing is and how big it is into one object. The first two numbers are its **top left corner**. `a.colliderect(b)` returns True when the two boxes overlap and False when they do not. It only answers the question. Scoring, moving and deleting are up to you.',

  demo: {
    kind: 'rectCollision',
    config: {
      labels: { a: 'player_rect', b: 'coin_rect' },
      caption:
        'Drag either box. colliderect is True only while they actually overlap. Slide them until the edges just touch: still False. Touching is not overlapping.',
    },
  },

  snippet: {
    code: `player_rect = pygame.FRect(380, 280, 40, 40)
coin_rect = pygame.FRect(200, 150, 30, 30)

# Keep the player on screen. One line replaces four boundary ifs,
# and it runs AFTER the movement because it corrects the movement.
player_rect.clamp_ip(screen.get_frect())

# colliderect answers a question. The body is where things happen.
if player_rect.colliderect(coin_rect):
    score += 1
    coin_rect.x = randint(0, WIDTH - coin_rect.width)
    coin_rect.y = randint(0, HEIGHT - coin_rect.height)`,
  },

  commonMistake: {
    why: 'Testing the wrong pair of rects, or testing a rect against itself. `player_rect.colliderect(player_rect)` is always True, so the score climbs every frame from the first frame. And `if player_rect.colliderect(coin_rect):` with no body does nothing at all: the check runs, answers True, and there is nothing inside to act on it.',
    code: `# Always True: a box always overlaps itself.
if player_rect.colliderect(player_rect):
    score += 1

# Never fires: the coin still uses last week's loose x and y,
# so this rect is a stale copy that never moves.
coin_rect = pygame.FRect(coin_x, coin_y, 30, 30)   # built once, before the loop`,
    fix: 'Check the two different rects you mean, and keep one rect per object as the single source of truth. Move `player_rect.x`, not a separate `player_x` you then copy in.',
  },
}

export default rectCollision
