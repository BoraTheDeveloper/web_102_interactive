// Visual concept: Draw Order.
// Source: game_dev/docs/2026_t3/slides/W2 - Graphics in Pygame.md (section E),
// where the roof is drawn after the body "so it covers the seam".

const drawOrder = {
  slug: 'draw-order',
  title: 'Draw Order',
  subtitle: 'Whatever you draw last sits on top',
  recap:
    'Pygame draws in the order your lines run, top to bottom. Each shape paints **over** whatever is already there. So the last thing drawn is the thing on top. There is no layer setting to change this. Moving a line up or down in the file is the whole control you have.',

  demo: {
    kind: 'drawOrder',
    config: {
      bg: '#87ceeb',
      order: ['ground', 'body', 'roof'],
      sprites: {
        ground: { label: 'ground', color: 'rgba(34,139,34,0.92)', stroke: '#228b22', x: 0, y: 225, w: 480, h: 75 },
        body: { label: 'house body', color: 'rgba(255,140,0,0.92)', stroke: '#ff8c00', x: 180, y: 150, w: 120, h: 90 },
        roof: { label: 'roof', color: 'rgba(139,69,19,0.92)', stroke: '#8b4513', x: 160, y: 120, w: 160, h: 45 },
      },
      caption:
        'Reorder the three shapes. Put the ground last and it buries the house. Put the roof before the body and the body eats the bottom of the roof. Only one order looks like a house.',
    },
  },

  snippet: {
    code: `screen.fill("skyblue")                                   # 1. wipes everything

pygame.draw.rect(screen, "green", (0, 450, 800, 150))    # 2. ground
pygame.draw.rect(screen, "orange", (300, 300, 200, 150)) # 3. house body
pygame.draw.rect(screen, "red", (380, 370, 40, 80))      # 4. door, on the body
pygame.draw.polygon(screen, "brown",
                    [(300, 300), (500, 300), (400, 200)])# 5. roof, over the seam

pygame.display.update()`,
  },

  commonMistake: {
    why: 'Calling `screen.fill()` **after** the drawing instead of before it. The shapes really are drawn. Then fill paints a solid colour over the whole surface, wiping every one of them, and `update()` shows the empty result. Nothing errors, so the file looks fine and the window looks blank.',
    code: `while running:
    pygame.draw.rect(screen, "green", (0, 450, 800, 150))
    pygame.draw.circle(screen, "yellow", (650, 100), 50)
    screen.fill("skyblue")   # wipes both shapes
    pygame.display.update()`,
    fix: '`fill` is the wipe that starts a frame, so it goes first. The order inside a frame is always: fill, then draw, then `pygame.display.update()`.',
  },
}

export default drawOrder
