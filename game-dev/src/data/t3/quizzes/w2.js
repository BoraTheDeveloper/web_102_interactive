// Week 2 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W2 - Quiz Questions.md, including the answer key.
// Traps: Q1, Q4, Q5, Q7.

const w2Quiz = {
  title: 'Week 2 check',
  intro: 'Ten questions on drawing, coordinates and draw order. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'This loop draws, then fills, then updates. What appears?',
      code: `screen.fill("skyblue")
pygame.draw.circle(screen, "red", (400, 300), 40)
screen.fill("skyblue")
pygame.display.update()`,
      trap: true,
      options: [
        'A red circle on a sky blue background',
        'A solid sky blue window, the second fill covers the circle',
        'A red circle on black',
        'An error, because you cannot call `fill` twice',
      ],
      answerIndex: 1,
      explanation: 'Drawing belongs after `fill` and before `update`. A fill **after** the circle paints straight over it.',
    },
    {
      q: 'A player should start in the exact middle of an 800 wide by 600 tall window. Which `(x, y)` is that?',
      options: ['`(800, 600)`', '`(0, 0)`', '`(400, 300)`', '`(800, 0)`'],
      answerIndex: 2,
      explanation: 'Half the width and half the height. `(800, 600)` is the bottom right, just past the last pixel.',
    },
    {
      q: 'What does `pygame.draw.circle()` use to set its size and place?',
      options: [
        'A starting point and an ending point',
        'A centre `(x, y)` and a single radius',
        'A top left corner plus width and height',
        'A list of several `(x, y)` point pairs',
      ],
      answerIndex: 1,
      explanation: 'A circle is the one shape given by its centre plus a radius. Width and height belong to a rect or an ellipse.',
    },
    {
      q: 'On an 800 by 600 Pygame window, where is the point `(0, 600)`?',
      trap: true,
      options: ['The top left corner', 'The bottom left corner', 'The bottom right corner', 'The centre of the screen'],
      answerIndex: 1,
      explanation: '`(0, 0)` is top left and y grows down, so `(0, 600)` is the bottom left corner.',
    },
    {
      q: 'After these three calls, what is on top?',
      code: `screen.fill("skyblue")
pygame.draw.rect(screen, "green", (0, 400, 800, 200))
pygame.draw.circle(screen, "yellow", (400, 450), 40)`,
      trap: true,
      options: [
        'The yellow circle sits on top of the green ground',
        'The green ground covers the circle',
        'Only sky blue is visible',
        'The circle is behind the sky fill',
      ],
      answerIndex: 0,
      explanation: 'Later shapes cover earlier ones. The circle is drawn last, so it sits on the ground.',
    },
    {
      q: 'Which function shows the newest screen to the player?',
      options: ['`pygame.display.set_mode()`', '`pygame.init()`', '`pygame.event.get()`', '`pygame.display.update()`'],
      answerIndex: 3,
      explanation: '`pygame.display.update()` refreshes the screen. `set_mode` only creates the window.',
    },
    {
      q: '`pygame.draw.rect(screen, "red", (100, 50, 80, 40))` is drawn. Where is the bottom right corner of that box?',
      trap: true,
      options: ['`(100, 50)`', '`(80, 40)`', '`(180, 90)`', '`(180, 50)`'],
      answerIndex: 2,
      explanation: 'A rect is `(x, y, width, height)` from the top left. Right is 100 + 80 = 180, bottom is 50 + 40 = 90.',
    },
    {
      q: 'In Pygame, the point `(0, 0)` is at the bottom left corner.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: '`(0, 0)` is the **top left** corner, not the bottom left.',
    },
    {
      q: 'Drawing code should be placed outside the `while` loop.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'Drawing code goes **inside** the loop, between fill and update.',
    },
    {
      q: 'The last shape drawn appears on top of earlier shapes.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Pygame draws in order, so later shapes cover earlier ones.',
    },
  ],
}

export default w2Quiz
