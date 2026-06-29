// Visual concept: Draw Order. Later blits cover earlier ones.
// Based on the blit order pattern used across all weeks of the Space Shooter.

const drawOrder = {
  slug: 'draw-order',
  title: 'Draw Order',
  subtitle: 'Later blits cover earlier ones',
  recap:
    'In Pygame, `screen.blit()` draws one image on top of what is already on the surface. The **order** of your blit calls decides what is visible. The sprite drawn **last** is always on top. If your player disappears behind the background, you probably blitted it before the background.',

  demo: {
    kind: 'drawOrder',
    config: {
      caption:
        'Reorder the draw list with the up/down arrows. The canvas redraws in the new order. The sprite drawn last is always on top — that is how Pygame works.',
    },
  },

  snippet: {
    code: `# Draw order matters!
screen.fill(BACKGROUND_COLOR)   # 1st: background (bottom)

for pos in star_positions:
    screen.blit(star_surf, pos)  # 2nd: stars

screen.blit(meteor_surf, meteor_rect)  # 3rd: meteor
screen.blit(laser_surf, laser_rect)    # 4th: laser
screen.blit(player_surf, player_rect)  # 5th: player (top)

pygame.display.update()  # push to screen`,
  },

  commonMistake: {
    why: 'The player is drawn **before** the background or the stars, so it gets covered up.',
    code: `screen.blit(player_surf, player_rect)  # drawn first

screen.fill(BACKGROUND_COLOR)  # covers the player!

for pos in star_positions:
    screen.blit(star_surf, pos)  # covers the player again`,
    fix: 'Always `screen.fill()` **first**, then draw background elements, then draw the player and foreground sprites **last**. The last blit is on top.',
  },
}

export default drawOrder
