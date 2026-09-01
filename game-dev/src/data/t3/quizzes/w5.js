// Week 5 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W5 - Quiz Questions.md, including the answer key.
// Traps: Q5, Q7.

const w5Quiz = {
  title: 'Week 5 check',
  intro: 'Ten questions on classes, objects, `self` and `__init__`. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'In this course, what is a class compared to?',
      options: [
        'A blueprint for a kind of game object',
        'One running player already on the screen',
        'The game window itself',
        'A single variable such as `score`',
      ],
      answerIndex: 0,
      explanation: 'A class is a blueprint. An object, `Player()`, is one working copy stamped from it.',
    },
    {
      q: 'What does `player = Player()` create?',
      options: [
        'A new image file on disk',
        'The Player **class**, so other files can import it',
        'One player object from the Player class',
        'Two objects, a Player and a Coin',
      ],
      answerIndex: 2,
      explanation: '`Player()` creates one object. The class already exists from the `class Player:` line.',
    },
    {
      q: 'What is `__init__()` used for in a class?',
      options: [
        'Closing the game every frame',
        "Setting up the object's starting data, such as `self.rect` and speed",
        'Drawing every sprite in a group',
        'Importing Pygame',
      ],
      answerIndex: 1,
      explanation: '`__init__()` sets up the starting values: position, size, speed.',
    },
    {
      q: 'What does `self` refer to inside a class method?',
      options: [
        'The current object using the method',
        'The Player class, not any one object',
        'The game window, `screen`',
        'The sprite group',
      ],
      answerIndex: 0,
      explanation: '`self` means this current object, so `self.rect` is **this** player\'s box.',
    },
    {
      q: 'After this code runs, what does `print(p2.x)` show?',
      code: `class Player:
    def __init__(self):
        self.x = 0

p1 = Player()
p2 = Player()
p1.x = 100
print(p2.x)`,
      trap: true,
      options: [
        '`100`, both players share `x`',
        '`0`, each object has its own `x`',
        'An error, `p2` has no `x`',
        '`None`',
      ],
      answerIndex: 1,
      explanation: '`p1` and `p2` are two separate objects. Changing `p1.x` does not touch `p2.x`.',
    },
    {
      q: 'Where should `player.update(dt)` be called?',
      options: [
        'Inside the game loop, every frame',
        'After `pygame.quit()`',
        'Once, just after `player = Player()`',
        'Inside `Player.__init__`',
      ],
      answerIndex: 0,
      explanation: 'The player has to update while the loop is running, once per frame.',
    },
    {
      q: 'This loop creates the player **inside** `while running`. What goes wrong?',
      code: `while running:
    player = Player()
    player.update(dt)
    player.draw(screen)`,
      trap: true,
      options: [
        'Nothing, that is the usual place to stamp a Player',
        'A new Player is created every frame, so it never keeps its position',
        '`Player()` is illegal inside a loop',
        '`update(dt)` cannot be called on a new object',
      ],
      answerIndex: 1,
      explanation: 'Stamp `player = Player()` once, before the loop. A fresh object every frame resets x back to the start, so the player never appears to move.',
    },
    {
      q: '`__init__` should be spelled with two underscores before and after.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'The name is `__init__`. `_init_` or `init` will not run when you call `Player()`.',
    },
    {
      q: '`self` is the name of the game window.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: '`self` is the current object, not the window.',
    },
    {
      q: '`update(dt)` is called once before the game starts and never again.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: '`update(dt)` is called every frame, from the game loop.',
    },
  ],
}

export default w5Quiz
