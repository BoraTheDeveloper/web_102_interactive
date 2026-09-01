// Week 3 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W3 - Quiz Questions.md, including the answer key.
// Traps: Q1, Q6, Q7.

const w3Quiz = {
  title: 'Week 3 check',
  intro: 'Ten questions on events, key state and screen edges. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'This student meant to move left. Left is held. After one frame, `player_x` is:',
      code: `player_x = 200
if keys[pygame.K_LEFT]:
    player_x += 5`,
      trap: true,
      options: [
        '`195`, a correct left move',
        '`205`, x grew, so the player moved right',
        '`200`, nothing changed',
        '`0`, a boundary reset',
      ],
      answerIndex: 1,
      explanation: 'Left should **subtract** from x. `+= 5` on Left moves the player right.',
    },
    {
      q: 'Which event means the player clicked the window close button?',
      options: ['`pygame.QUIT`', '`pygame.quit()`', '`pygame.K_LEFT`', '`pygame.KEYDOWN`'],
      answerIndex: 0,
      explanation: '`pygame.QUIT` is the close window event. `pygame.quit()` is the shutdown function.',
    },
    {
      q: 'What does `pygame.quit()` do?',
      options: [
        "Turns off Pygame's modules",
        'Checks if a key is held',
        "Detects the window's X button",
        'Ends the current `for event` loop only',
      ],
      answerIndex: 0,
      explanation: '`pygame.quit()` shuts Pygame down. The X button is the `QUIT` event.',
    },
    {
      q: 'Which call should you use to move a player **while** an arrow key is held?',
      options: [
        '`pygame.key.get_pressed()` inside the game loop',
        '`if event.type == pygame.KEYDOWN` only',
        '`pygame.event.get()` with no extra check',
        '`event.pos`',
      ],
      answerIndex: 0,
      explanation: 'Held keys are `get_pressed()` every frame. `KEYDOWN` fires once, when the key first goes down.',
    },
    {
      q: 'What should happen to `player_x` when the left arrow is held?',
      options: [
        'It should decrease, because x grows to the right',
        'It should increase, because left is the positive direction',
        'It should reset to `0` every frame',
        'It should become `event.pos[1]`',
      ],
      answerIndex: 0,
      explanation: 'Moving left means making x smaller, because x grows to the right.',
    },
    {
      q: 'Left is held, speed is 5. After one frame, `player_x` is:',
      code: `player_x = 3
if keys[pygame.K_LEFT]:
    player_x -= 5
if player_x < 0:
    player_x = 0`,
      trap: true,
      options: ['`-2`', '`0`', '`3`', '`5`'],
      answerIndex: 1,
      explanation: '`3 - 5` is `-2`, and then the boundary `if` clamps it to `0`. Without the clamp the player would leave the screen.',
    },
    {
      q: 'Keys are read once, **before** the loop. What happens when the player later holds Right?',
      code: `keys = pygame.key.get_pressed()
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    if keys[pygame.K_RIGHT]:
        player_x += 5`,
      trap: true,
      options: [
        'The player moves smoothly while Right is held',
        '`keys` is an old snapshot, so later holds are ignored',
        'Python raises an error as soon as the loop starts',
        'The player moves right forever with no key',
      ],
      answerIndex: 1,
      explanation: '`get_pressed()` must run **inside** the loop. A snapshot taken before `while` never updates.',
    },
    {
      q: '`pygame.QUIT` and `pygame.quit()` mean the same thing.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: '`pygame.QUIT` is an event. `pygame.quit()` is a function.',
    },
    {
      q: 'This order makes the player invisible: draw the player, then `screen.fill(...)`, then `update()`.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Fill paints over whatever was drawn before it. Draw after fill, then update.',
    },
    {
      q: 'The event loop should stay inside `while running`.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'The event loop has to run again and again while the game is open.',
    },
  ],
}

export default w3Quiz
