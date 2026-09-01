// T3 repair. Source: W2, the draw-order rule, and W3 §C
// ("drawing the player before screen.fill: player invisible").

const nothingDraws = {
  slug: 'repair-nothing-draws',
  title: 'Nothing I draw shows up',
  game: 'Any',
  symptom:
    'My window shows the background colour fine, but none of my shapes appear. I have draw lines and they have no error. Sometimes one shape shows and the rest do not.',
  likelyCause:
    '`screen.fill()` is running **after** the drawing. The shapes really are drawn, and then fill paints a solid colour over the entire surface and wipes every one of them. Then `update()` shows the empty result. Same story if one shape is missing: something bigger was drawn on top of it afterwards.',
  whereToCheck: [
    'Read the loop top to bottom. The order inside a frame is always fill, then draw, then update. Any draw line above fill is wiped.',
    'If one shape is missing, look for a later draw that covers it. Whatever is drawn last is on top.',
    'Check the shape is actually on screen. y grows down, so y = 700 in a 600 tall window is below the bottom edge.',
    'Check the colour. A shape drawn in the same colour as the background is there and invisible.',
    'Check you passed a Rect or a tuple of four numbers to `pygame.draw.rect`, not four separate arguments.',
  ],
  workingMeans:
    'Every shape you drew is visible, and the one you drew last is the one on top where they overlap.',
  checklist: [
    { id: 'nd-1', label: 'Fill the screen as the first line of the frame', hint: 'Above every draw line, not below.' },
    { id: 'nd-2', label: 'Put every draw call between the fill and the update', hint: 'Three groups in order: wipe, paint, show.' },
    { id: 'nd-3', label: 'Order overlapping shapes so the one on top is drawn last', hint: 'Roof after the house body, not before it.' },
    { id: 'nd-4', label: 'Check each shape is inside the window', hint: 'x below the width, y below the height.' },
  ],
  fixCode: `while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill("skyblue")                                    # 1. wipe

    pygame.draw.rect(screen, "green", (0, 450, 800, 150))     # 2. paint
    pygame.draw.rect(screen, "orange", (300, 300, 200, 150))
    pygame.draw.polygon(screen, "brown",
                        [(300, 300), (500, 300), (400, 200)]) # roof last

    pygame.display.update()                                   # 3. show`,
}

export default nothingDraws
