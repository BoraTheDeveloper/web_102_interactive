// Visual concept: Coordinates. Demo is a draggable square on a grid showing
// the Pygame coordinate system: origin (0, 0) top-left, x right, y DOWN.
// Grounded in game_dev/space_shooter/w9_final.py (get_frect(center=...)).

const coordinates = {
  slug: 'coordinates',
  title: 'Coordinates',
  subtitle: 'Origin top-left, y grows down',
  recap:
    'In Pygame the origin `(0, 0)` is the **top-left** corner of the window. `x` grows to the right and `y` grows **downward**. A `Rect` is built as `Rect(x, y, width, height)` where `x, y` is its top-left, and `set_mode` takes the size as `(width, height)` in that order.',

  demo: {
    kind: 'coordinates',
    config: {
      caption:
        'Drag the square. (0,0) is the top-left and y grows downward, so a bigger y is lower on the screen, not higher.',
    },
  },

  snippet: {
    code: `# (0, 0) is the TOP-LEFT corner.
# x grows to the RIGHT, y grows DOWNWARD.
screen = pygame.display.set_mode((640, 480))  # (width, height)

# Rect(x, y, width, height) -- x, y is the rect's top-left corner
pygame.draw.rect(screen, "indigo", pygame.Rect(20, 30, 50, 50))
pygame.display.update()`,
  },

  commonMistake: {
    why: 'Pygame `y` grows **downward**, so a large `y` lands near the bottom of the screen, not the top. And `set_mode` takes `(width, height)` in that order, so swapping them gives a tall window when you wanted a wide one.',
    code: `# y grows DOWN. A large y is near the BOTTOM, not the top.
score_rect = text_surf.get_rect(top=600)  # meant "high up" -> actually at the bottom

# set_mode takes (width, height), NOT (height, width)
screen = pygame.display.set_mode((480, 640))  # meant 640 wide, 480 tall`,
    fix: 'Remember: positive `y` is down, and the size tuple is `(width, height)`. Prefer rect placement helpers (`center=`, `midbottom=`, `top=`) over guessing raw pixel rows.',
  },
}

export default coordinates
