// Week 7 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W7 - Quiz Questions.md, including the answer key.
// Traps: Q7.
//
// Part C (Q11 and Q12, the extra Vector2 items) is deliberately left off. The
// quiz README rules them out of the W8 Kahoot, and this page promises the same
// questions as next class's Kahoot.

const w7Quiz = {
  title: 'Week 7 check',
  intro: 'Ten questions on fair movement, states and the three rooms. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'Where does the `score >= 10` win check belong?',
      options: [
        'Before the coin collision loop',
        'After the full coin collision loop, still inside `if state == "playing":`',
        'Outside the playing door, so it runs before the events',
        'In the event loop, beside the quit check',
      ],
      answerIndex: 1,
      explanation: 'The update-and-collision block lives behind the door, and the win check reads the score once that frame\'s collisions are done.',
    },
    {
      q: 'What do game states such as start, playing and game-over control?',
      options: [
        'The colour of the window',
        'Which part of the game is happening now: which update and draw code is allowed to run',
        'Whether `pygame.init()` has been called',
        'The size of the window',
      ],
      answerIndex: 1,
      explanation: 'States tell the program which part of the game is running, so only that part\'s update and draw runs.',
    },
    {
      q: 'What should the start state usually do?',
      options: [
        'Run player movement and coin collisions',
        'Call `pygame.quit()` immediately',
        'Wait for a key (often Space) before switching to playing',
        'Show the game-over message',
      ],
      answerIndex: 2,
      explanation: 'Start waits for the player to begin, such as pressing Space. Movement stays in playing.',
    },
    {
      q: 'What should happen in the playing state?',
      options: [
        'The player moves, objects update, and collisions and score run',
        'The window ignores keys and waits',
        'Only the title text is drawn',
        '`all_sprites.update(dt)` is skipped',
      ],
      answerIndex: 0,
      explanation: 'Playing is the part where movement, collisions and score happen.',
    },
    {
      q: 'What should a game-over state usually show?',
      options: [
        'A blank screen and then `pygame.quit()` with no message',
        'The start prompt again, with no way to tell the run ended',
        'That the game has ended, and how to try again',
        'The playing world still moving under the text',
      ],
      answerIndex: 2,
      explanation: 'Game-over tells the player the run ended and how to restart. It is a state on screen, not an instant quit.',
    },
    {
      q: 'Which line moves the game from the start room into the playing room?',
      options: [
        '`state == "playing"` — it asks which room the game is in',
        '`state = "playing"` — it puts the game in the playing room',
        '`score = 10` — it ends the game',
        '`pygame.quit()` — it closes the window',
      ],
      answerIndex: 1,
      explanation: '`==` asks, `=` tells. `state = "playing"` moves the game into the playing room; `state == "playing"` only asks whether it is already there.',
    },
    {
      q: '`state` is `"start"`. The player holds the arrow keys on the start screen. What happens?',
      code: `if state == "playing":
    player.update(dt)
    # collisions and score
if keys[pygame.K_SPACE] and state == "start":
    state = "playing"`,
      trap: true,
      options: [
        'The player moves, because the keys are held',
        'The player does not move. `update` only runs in playing',
        'Space also moves the player',
        'Python raises an error because arrows are not handled',
      ],
      answerIndex: 1,
      explanation: 'Arrow keys on the start screen do nothing until `state` becomes `"playing"`. That is the point of the door.',
    },
    {
      q: 'Pressing R on the game-over screen puts the score back to 0 and respawns every coin.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Restarting puts the numbers back and every carried-forward W6 sprite goes back to its starting position; the FRect is the position.',
    },
    {
      q: 'Once a game has classes, it no longer needs a game loop.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'Classes live inside the loop. The loop still runs the game.',
    },
    {
      q: 'Start, playing and game-over are examples of game states.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Those three names are the states we add this week.',
    },
  ],
}

export default w7Quiz
