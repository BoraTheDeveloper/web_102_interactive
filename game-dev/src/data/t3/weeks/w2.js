// Review by Week 2: Graphics in Pygame.
// Source: game_dev/docs/2026_t3/slides/W2 - Graphics in Pygame.md (section E).

const w2 = {
  slug: 'w2',
  title: 'Week 2 · Graphics in Pygame',
  subtitle: 'Coordinates, the five draw functions, and why order decides what you see',
  summary:
    'You started from your Week 1 window and drew a scene into it. You learned where `(0, 0)` is, that y grows **down** the screen, and that every drawing call belongs between `screen.fill()` and `pygame.display.update()`. Five `pygame.draw` functions cover almost everything: rect, circle, polygon, ellipse and line. The last shape you draw sits on top.',
  keyPoints: [
    {
      heading: 'The screen has coordinates',
      body: '`(0, 0)` is the **top left** corner, not the bottom left. x grows to the right as you expect, but y grows **downward**. That flip is the opposite of maths class and it is where most Week 2 bugs come from: roofs point the wrong way and roads land in the sky.',
    },
    {
      heading: 'Drawing code goes between fill and update',
      body: 'Every frame: fill the background, draw your shapes, then update. Draw before the fill and the fill paints over your work. Draw after the update and it shows up a frame late.',
    },
    {
      heading: 'Five functions, three argument shapes',
      body: '`draw.rect` and `draw.ellipse` take a **corner and a size**: `(x, y, width, height)`. `draw.circle` takes a **centre and a radius**. `draw.line` takes **point to point**. `draw.polygon` takes a **list of points**. Learn which shape each one wants and Week 4 stops being guesswork.',
    },
    {
      heading: 'Draw order builds a house',
      body: 'Body first, then the door, then the roof. Each call paints over what came before it, so the order in your file is the stacking order on screen. This is layering, and you control it just by moving lines.',
    },
    {
      heading: 'Watch the sun disappear',
      body: 'Move `screen.fill()` to **after** your draw calls and everything vanishes. The shapes were drawn, then painted over. Nothing errors. If your scene is a blank colour, check where the fill sits.',
    },
  ],
  code: `import pygame

pygame.init()

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Pygame Artwork")

running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill("skyblue")

    # Ground
    pygame.draw.rect(screen, "green", (0, 450, 800, 150))
    # Sun
    pygame.draw.circle(screen, "yellow", (650, 100), 50)
    # House body, then the door on top of it
    pygame.draw.rect(screen, "orange", (300, 300, 200, 150))
    pygame.draw.rect(screen, "red", (380, 370, 40, 80))
    # Roof, after the body so it covers the seam
    pygame.draw.polygon(screen, "brown", [(300, 300), (500, 300), (400, 200)])
    # Clouds and road
    pygame.draw.ellipse(screen, "white", (100, 80, 180, 70))
    pygame.draw.ellipse(screen, "white", (180, 60, 160, 80))
    pygame.draw.line(screen, "black", (100, 520), (700, 520), 5)

    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'coordinates', label: 'Coordinates' },
    { slug: 'draw-order', label: 'Draw Order' },
    { slug: 'repair-nothing-draws', label: 'Nothing I draw shows up' },
  ],
  takeaways: [
    'You can place a shape with `(x, y)` and know which way y grows',
    'You can explain and use the rule that the last shape drawn sits on top',
    'You can use all five `pygame.draw` functions with the right argument shape',
    'You can build a scene out of layered shapes on purpose, not by accident',
  ],
}

export default w2
