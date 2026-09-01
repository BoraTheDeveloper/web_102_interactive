// T3 repair. Source: W4 §C and W4 quiz Q5 and Q9.

const scoreResets = {
  slug: 'repair-score-resets',
  title: 'My score keeps resetting',
  game: 'Collector',
  symptom:
    'The item respawns every time I touch it, so the collision is definitely working. But the number on screen never leaves 0, or it flashes 1 and drops straight back.',
  likelyCause:
    '`score = 0` is **inside** the loop. It runs at the top of every frame, so the score is reset a fraction of a second after it goes up. The collision is fine, the drawing is fine, and the counter is wiped 60 times a second. There is a second version of this with the same symptom: `score_surf = font.render(...)` outside the loop. That makes one photograph of the score at startup and shows the same picture forever.',
  whereToCheck: [
    'Find `score = 0` and check its indentation. It belongs above the loop, at zero indentation, so it runs once.',
    'Check the render line is inside the loop. A rendered surface is a snapshot of the number at that moment, so it has to be remade each frame.',
    'Check `pygame.font.Font(None, 40)` is the opposite: made once, before the loop. It is a tool, not a picture.',
    'Check the blit is above `pygame.display.update()`. Blitting after update means the text waits a frame, or never shows.',
    'Check `score += 1` is inside the collision if, not beside it.',
  ],
  workingMeans:
    'The number on screen goes up by exactly one the instant the boxes touch, and it stays up.',
  checklist: [
    { id: 'sr-1', label: 'Set the score to zero once, before the loop', hint: 'Zero indentation, above `while running:`.' },
    { id: 'sr-2', label: 'Make the font once, before the loop', hint: 'A `pygame.font.Font` object, stored in a variable.' },
    { id: 'sr-3', label: 'Render the score text every frame, inside the loop', hint: 'A method on the font, using an f-string.' },
    { id: 'sr-4', label: 'Blit the rendered surface before the display update', hint: 'A method on screen, taking the surface and a position tuple.' },
    { id: 'sr-5', label: 'Increase the score inside the collision if', hint: 'Indented under the colliderect check.' },
  ],
  fixCode: `font = pygame.font.Font(None, 40)   # a tool: made ONCE
score = 0                           # made ONCE

running = True
while running:
    if player_rect.colliderect(item_rect):
        score += 1
        item_rect.x = randint(0, WIDTH - item_rect.width)
        item_rect.y = randint(0, HEIGHT - item_rect.height)

    screen.fill("midnightblue")
    pygame.draw.rect(screen, "dodgerblue", player_rect)
    pygame.draw.rect(screen, "gold", item_rect)

    score_surf = font.render(f"Score: {score}", True, "white")  # a picture: EVERY frame
    screen.blit(score_surf, (20, 20))

    pygame.display.update()`,
}

export default scoreResets
