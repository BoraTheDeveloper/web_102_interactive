// Week 1 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W1 - Quiz Questions.md, including the answer key.
// trap: true marks the answer key's 高考-style items: Q4, Q6, Q7.

const w1Quiz = {
  title: 'Week 1 check',
  intro:
    'Ten questions on the first Pygame window. These are the same questions as next class\'s Kahoot, so answer them before you look anything up.',
  questions: [
    {
      q: 'What is Pygame?',
      options: [
        'A Python library of tools for windows, drawing, input and sound',
        'A separate language you install instead of Python',
        'The window object returned by `set_mode`',
        'The website that hosts the games you make',
      ],
      answerIndex: 0,
      explanation: 'Pygame is a Python library: tools for windows, drawing, input and sound. It is not a language and it is not the window itself.',
    },
    {
      q: 'What does `pygame.init()` do?',
      options: [
        'It creates the 800 by 600 window',
        "It starts Pygame's modules so later Pygame calls can work",
        'It paints the first frame onto the screen',
        'It must be called once per frame inside the loop',
      ],
      answerIndex: 1,
      explanation: '`pygame.init()` turns Pygame on. It does not create the window and it does not paint a frame.',
    },
    {
      q: 'Which line creates a window that is 800 wide and 600 tall?',
      options: [
        '`screen = pygame.display.set_mode((800, 600))`',
        '`screen = pygame.display.set_mode(800, 600)`',
        '`screen = pygame.display.set_caption((800, 600))`',
        '`screen = pygame.init((800, 600))`',
      ],
      answerIndex: 0,
      explanation: '`set_mode((width, height))` takes one pair, which is why there are double brackets. `set_mode(800, 600)` is the common TypeError.',
    },
    {
      q: 'This program runs with no `while` loop. What happens?',
      code: `pygame.init()
screen = pygame.display.set_mode((800, 600))
screen.fill("darkblue")
pygame.display.update()
pygame.quit()`,
      trap: true,
      options: [
        'The window stays open until the player clicks X',
        'The window appears, maybe one blue frame, and the program ends',
        'Python raises an error because there is no loop',
        'No window is created at all',
      ],
      answerIndex: 1,
      explanation: 'With no loop the program runs straight to `quit()` and exits, so the window vanishes at once.',
    },
    {
      q: 'What is the difference between `pygame.QUIT` and `pygame.quit()`?',
      options: [
        '`pygame.QUIT` is the name of a close event, `pygame.quit()` is the function that shuts Pygame down',
        '`pygame.QUIT` shuts Pygame down, `pygame.quit()` is the name of a close event',
        'They are two spellings of the same function, so either one works',
        '`pygame.QUIT` closes the window and `pygame.quit()` reopens it',
      ],
      answerIndex: 0,
      explanation: '`pygame.QUIT` is the **name of an event** you compare against. `pygame.quit()` is a **function** you call to shut Pygame down.',
    },
    {
      q: 'This loop never calls `pygame.display.update()`. What do you see?',
      code: `while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    screen.fill("darkblue")`,
      trap: true,
      options: [
        'A dark blue window, as intended',
        'A black or empty window, the fill never appears',
        'An error message and no window',
        'A window that closes on the first frame',
      ],
      answerIndex: 1,
      explanation: '`fill` writes to the hidden working copy. Without `update()` the player never sees it, and Python has nothing to complain about.',
    },
    {
      q: 'What is wrong with this loop?',
      code: `while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    screen.fill("darkblue")
    pygame.display.update()
    pygame.quit()`,
      trap: true,
      options: [
        'Nothing, `quit()` must run every frame',
        '`pygame.quit()` runs on the first frame, so later display work dies',
        '`screen.fill` belongs after `pygame.quit()`',
        '`set_mode` is missing from the loop',
      ],
      answerIndex: 1,
      explanation: '`pygame.quit()` belongs flush left, after the loop. Indented inside, it shuts Pygame down on frame one.',
    },
    {
      q: '`pygame.init()` should be called before you create the window.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Pygame has to be started before its display features can be used.',
    },
    {
      q: 'A Pygame program needs a loop to keep the window open.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'The `while` loop is the thing holding the window open instead of letting the program end.',
    },
    {
      q: 'A program with a `while` loop but no `pygame.event.get()` loop will freeze instead of closing when you click X.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Without the event loop the X click is never read, so the window freezes.',
    },
  ],
}

export default w1Quiz
