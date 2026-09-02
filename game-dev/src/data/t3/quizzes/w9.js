// Week 9 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W9 - Quiz Questions.md, including the answer key.
// Traps: Q6, Q10.
//
// Q7 keeps the source's bonus-track distractors verbatim so the page matches the
// Kahoot. They are wrong answers naming games this course does not build.

const w9Quiz = {
  title: 'Week 9 check',
  intro: 'Ten questions on platforms, the goal flag and win or lose states. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'Why add more than one platform to the level?',
      options: [
        'So the player can jump across a small course',
        'So the game can save to a file',
        'So a camera can follow the player',
        'So Pygame can load a Tiled map',
      ],
      answerIndex: 0,
      explanation: 'Extra platforms let the player jump across a small single-screen level. No camera and no Tiled map.',
    },
    {
      q: 'What is the goal flag for?',
      options: [
        'A picture that never does anything',
        'Something the player reaches to win',
        'A way to quit Python',
        'The lose object. Touching it ends the run',
      ],
      answerIndex: 1,
      explanation: 'The flag is the goal the player tries to reach.',
    },
    {
      q: 'What should a lose state usually do?',
      options: [
        'Show that the player lost and allow a restart',
        'Call `pygame.quit()` with no message',
        'Freeze the window until the program is killed',
        'Switch back to playing with no prompt',
      ],
      answerIndex: 0,
      explanation: 'Lose should tell the player the run ended and let them try again.',
    },
    {
      q: 'How does the player win the must-do level?',
      options: [
        'By reaching the goal flag',
        'By closing the window',
        'By deleting the platforms',
        'By waiting without jumping',
      ],
      answerIndex: 0,
      explanation: 'The win condition is reaching the goal flag.',
    },
    {
      q: 'Why keep win and lose as game states?',
      options: [
        'So the game can switch between playing, winning and losing',
        'So gravity turns off forever in `__init__`',
        'So `all_sprites.update` keeps running under the win text',
        'So the player can still jump after winning',
      ],
      answerIndex: 0,
      explanation: 'States let the game leave playing and show win or lose. Update should not keep running under those screens.',
    },
    {
      q: 'The player overlaps the flag. Has the player won?',
      code: `if player.rect.colliderect(flag.rect):
    score += 1
# state is never assigned`,
      trap: true,
      options: [
        'Yes, touching the flag always wins',
        'No, nothing switched `state` to win, so playing continues',
        'Yes if `score` is now greater than 0',
        'Yes because `colliderect` ends the loop',
      ],
      answerIndex: 1,
      explanation: 'Overlap is not a win until you change `state`. Score going up is the Collector habit. The flag needs a state door.',
    },
    {
      q: 'Which homework game should be complete after this week?',
      options: [
        'Space Shooter',
        'Pong',
        'Vampire Survivor',
        'A Tiled platformer',
      ],
      answerIndex: 1,
      explanation: 'Pong homework chunk 5 finishes the third game this week.',
    },
    {
      q: 'Win and lose are game states.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Win and lose are states, like start and playing.',
    },
    {
      q: 'A moving enemy is required before the Platformer counts as finished.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'Enemy and damage are bonus. The floor is platforms, goal, and win or lose.',
    },
    {
      q: 'Falling below the window should usually change `state` to lose, not only move `rect.y`.',
      trap: true,
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Falling is a physics fact. Losing is a state change, and usually a restart prompt.',
    },
  ],
}

export default w9Quiz
