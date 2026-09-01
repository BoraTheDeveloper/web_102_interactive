// Visual concept: Coordinates.
// Source: game_dev/docs/2026_t3/slides/W2 - Graphics in Pygame.md.
// The scene is the Week 2 artwork: sky, ground, house, sun.

const coordinates = {
  slug: 'coordinates',
  title: 'Coordinates',
  subtitle: 'Origin top left, and y grows down',
  recap:
    'The corner `(0, 0)` is the **top left** of the window, not the middle and not the bottom. `x` grows to the right, and `y` grows **downward**. So a bigger `y` is lower on the screen. `set_mode` takes the size as `(width, height)`, in that order.',

  demo: {
    kind: 'coordinates',
    config: {
      caption:
        'Drag the square. Watch y. Moving down makes y bigger. That is the opposite of the graphs in maths class, and it is the reason a shape you expected near the top lands near the bottom.',
    },
  },

  snippet: {
    code: `# (0, 0) is the TOP LEFT corner.
# x grows RIGHT, y grows DOWN.
screen = pygame.display.set_mode((800, 600))  # (width, height)

screen.fill("skyblue")

# Ground: starts at y = 450, which is three quarters of the way DOWN.
pygame.draw.rect(screen, "green", (0, 450, 800, 150))

# House body: (x, y, width, height). 300, 300 is its TOP LEFT corner,
# not its middle. The body covers x from 300 to 500.
pygame.draw.rect(screen, "orange", (300, 300, 200, 150))

# Sun: a circle is the one shape given by its CENTRE, plus a radius.
pygame.draw.circle(screen, "yellow", (650, 100), 50)

pygame.display.update()`,
  },

  commonMistake: {
    why: 'Reading the first two numbers of a rect as its centre. `pygame.draw.rect(screen, "orange", (300, 300, 200, 150))` does not put a box centred on 300, 300. That is the **top left corner**, so the box covers x from 300 to 500 and y from 300 to 450. Circles are the exception: `pygame.draw.circle` really does take a centre.',
    code: `# Meant: a box in the middle of an 800 by 600 window.
pygame.draw.rect(screen, "orange", (400, 300, 200, 150))
# Actually: the box starts at the middle and runs right and down.

# Meant: a wide window.
screen = pygame.display.set_mode((600, 800))  # tall, not wide`,
    fix: 'To centre a box, subtract half its size from the centre you want: `(400 - 100, 300 - 75, 200, 150)`. From Week 4 on, let `FRect` do it for you and set `rect.center` instead of guessing the corner.',
  },
}

export default coordinates
