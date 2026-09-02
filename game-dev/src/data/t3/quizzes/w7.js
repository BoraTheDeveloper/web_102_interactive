// Week 7 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W7 - Quiz Questions.md, including the answer key.
// Traps: Q7.
//
// Part C (Q11 and Q12, the extra Vector2 items) is deliberately left off. The
// quiz README rules them out of the W8 Kahoot, and this page promises the same
// questions as next class's Kahoot.

const w7Quiz = {
  title: 'Week 7 check',
  intro: 'Ten questions on the Game Anatomy, states and the one-sentence pitch. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'Which list best names the pieces of the universal game skeleton?',
      options: [
        'Loop, delta time, input, classes, collisions, states, and score or win/lose',
        'Camera, tile map, file save, and online chat',
        '`init`, `set_mode`, and `quit` only',
        'Sprites and groups only. The loop is optional once you have classes',
      ],
      answerIndex: 0,
      explanation: 'The skeleton is the loop, delta time, input, classes, collisions, states, and score or win/lose. Camera and tile maps are off the main path.',
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
      q: 'What is the one-sentence formula for describing a game?',
      options: [
        'In this game, you ___, the challenge is ___, you win/lose when ___',
        'This game uses Python, so it is finished',
        'Draw a circle, then close the window',
        'List every class in the file',
      ],
      answerIndex: 0,
      explanation: 'The formula is: you do this, the challenge is this, you win or lose when this happens.',
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
      q: 'The Collector, the Platformer and Pong can all use the same skeleton pieces.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'The same skeleton works for collector, platformer and pong-style games.',
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
