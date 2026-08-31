// Space Shooter repair: the score keeps resetting to zero. Based on
// display_score in game_dev/space_shooter/w9_final.py.

const scoreResets = {
  slug: 'repair-score-resets',
  title: 'My score keeps resetting to zero',
  symptom:
    'My score shows for a moment, then jumps back to 0 over and over. It never counts up.',
  likelyCause:
    '`score = 0` is written **inside the while loop**, so it resets to zero every single frame. A score variable must be created ONCE before the loop and only increased inside it. (w9_final.py instead derives the score from `pygame.time.get_ticks() // 100`, which can never reset, but if you keep your own score you must declare it before the loop.)',
  whereToCheck: [
    'Find every line that says score = 0 or score = .... It should appear only once, BEFORE while running.',
    'Inside the loop, the score should only go up: score += 1, never score = 0.',
    'If you use get_ticks(), confirm you are not resetting it: pygame.time.get_ticks() always grows.',
    'Check that you render the score after updating it, so the number shown is the current one.',
  ],
  checklist: [
    { id: 'sr-1', label: 'Declare score = 0 before the loop', hint: 'Put it right above while running:, not inside.' },
    { id: 'sr-2', label: 'Only increase score inside the loop', hint: 'score += 1 when a meteor is destroyed, never score = 0.' },
    { id: 'sr-3', label: 'Or derive it from elapsed time', hint: 'score = pygame.time.get_ticks() // 100 never resets.' },
    { id: 'sr-4', label: 'Render the score each frame', hint: 'text_surf = font.render(str(score), True, (240,240,240))' },
    { id: 'sr-5', label: 'Blit the score text onto the display', hint: 'display_surface.blit(text_surf, text_rect)' },
  ],
  fixCode: `score = 0  # BEFORE the loop, created once

while running:
    # ...
    # only increase, never reset:
    for laser in laser_sprites:
        if pygame.sprite.spritecollide(laser, meteor_sprites, True):
            laser.kill()
            score += 1

    text_surf = font.render(str(score), True, (240, 240, 240))
    display_surface.blit(text_surf, text_rect)`,
}

export default scoreResets
