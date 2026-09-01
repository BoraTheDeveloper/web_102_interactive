// Week 4 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W4 - Quiz Questions.md, including the answer key.
// Traps: Q1, Q4, Q6.

const w4Quiz = {
  title: 'Week 4 check',
  intro: 'Ten questions on FRect, collision, score and respawning. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'These two boxes are created. What does `player.colliderect(coin)` return?',
      code: `player = pygame.FRect(0, 0, 50, 50)
coin   = pygame.FRect(49, 0, 50, 50)`,
      trap: true,
      options: [
        '`True`, they overlap by one pixel',
        '`False`, `49` is less than `50`, so they miss',
        '`True` only if both boxes use the same colour',
        'An error, `FRect` has no `colliderect`',
      ],
      answerIndex: 0,
      explanation: 'The player covers x from 0 to 50 and the coin starts at 49, so they overlap at x = 49. Boxes starting at exactly 50 would **not** overlap.',
    },
    {
      q: 'What does a Pygame FRect store?',
      options: [
        'Only the colour of an object',
        'Only the keyboard key being pressed',
        'Position and size (`x`, `y`, `width`, `height`), keeping decimals',
        'The name of the Python file',
      ],
      answerIndex: 2,
      explanation: 'An FRect stores position and size and keeps decimals. An integer `Rect` throws the decimals away.',
    },
    {
      q: 'Which method checks whether two Rects are touching?',
      options: ['`colliderect()`', '`display.update()`', '`get_pressed()`', '`clamp_ip()`'],
      answerIndex: 0,
      explanation: '`colliderect()` checks overlap. `clamp_ip()` keeps one box inside another.',
    },
    {
      q: 'The coin is **not** moved after a hit. The player stands still on the item. What happens to `score`?',
      code: `if player_rect.colliderect(item_rect):
    score += 1`,
      trap: true,
      options: [
        'It goes up by 1 once, then stops',
        'It goes up by 1 **every frame** while they overlap',
        'It stays `0` because the item must move first',
        'It resets to `0`',
      ],
      answerIndex: 1,
      explanation: 'The `if` is true on every frame until the item moves. The score explodes unless you respawn the item, or otherwise break the overlap.',
    },
    {
      q: 'Where should the score variable usually be created?',
      options: [
        'Before the game loop starts',
        'Inside the game loop, next to `screen.fill`',
        'After `pygame.quit()`',
        'Inside `font.render`',
      ],
      answerIndex: 0,
      explanation: 'Create `score` before the loop. Created inside, it resets every frame.',
    },
    {
      q: '`WIDTH` is 800 and the item is 40 pixels wide. Which spawn keeps the whole item on screen?',
      trap: true,
      options: [
        '`randint(0, WIDTH)`',
        '`randint(0, WIDTH - item_rect.width)`',
        '`randint(WIDTH, WIDTH + 40)`',
        '`randint(-40, 0)`',
      ],
      answerIndex: 1,
      explanation: '`randint(0, WIDTH)` can put the top left corner at 799, so the item hangs off the right. Subtract the width, and the height for y.',
    },
    {
      q: 'What does `player_rect.clamp_ip(screen.get_frect())` help do?',
      options: [
        'Keep the player inside the screen',
        'Detect a collision with the item',
        'Draw the score text',
        'Pick a random item position',
      ],
      answerIndex: 0,
      explanation: "`clamp_ip()` keeps an FRect inside the screen's FRect. It does not detect the item.",
    },
    {
      q: '`colliderect()` gives a True or False answer.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Collision checks return True or False, and nothing else.',
    },
    {
      q: 'The score should be set to `0` every frame inside the game loop.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'Resetting the score inside the loop erases progress every frame.',
    },
    {
      q: 'A collectible should respawn with `randint(0, WIDTH)` for x, even if that can place its top left at the right edge.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'Use `randint(0, WIDTH - item_rect.width)` so the whole box stays on screen.',
    },
  ],
}

export default w4Quiz
