// Game review: Number Guessing Game (Week 7). Reuses the skill-page shape.
// Based on intro_python/src/w7_final.py.

const numberGuessing = {
  slug: 'review-number-guessing',
  title: 'Number Guessing Game',
  subtitle: 'Week 7 review — the guess loop',
  meaning:
    'The Number Guessing Game picks a secret number and lets the player guess it inside a `while` loop. Each guess gets a `Too low` / `Too high` hint until the player wins or runs out of guesses. The core skills are **variables**, **while loops**, **conditionals**, and `break`.',

  example: {
    code: `secret = 73
guesses_left = 5
won = False

while guesses_left > 0:
    guess = int(input())
    if guess == secret:
        print("You guessed the number.")
        won = True
        break
    elif guess < secret:
        print("Too low.")
    else:
        print("Too high.")
    guesses_left = guesses_left - 1`,
  },

  trace: {
    code: `secret = 73
guesses_left = 5
won = False

while guesses_left > 0:
    guess = int(input())
    if guess == secret:
        print("You guessed the number.")
        won = True
        break
    elif guess < secret:
        print("Too low.")
    else:
        print("Too high.")
    guesses_left = guesses_left - 1`,
    state: { secret: null, guessesLeft: null, guess: null, output: [] },
    inspector: (s) => [
      { label: 'secret', value: s.secret === null ? '—' : s.secret },
      { label: 'guesses_left', value: s.guessesLeft === null ? '—' : s.guessesLeft },
      { label: 'guess', value: s.guess === null ? '—' : s.guess },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      { lines: [1], label: '1 · pick a secret', desc: 'secret is set to 73 (random in the real game).', apply: (s) => ({ ...s, secret: 73 }) },
      { lines: [2], label: '2 · guesses_left = 5', desc: 'The player gets five attempts.', apply: (s) => ({ ...s, guessesLeft: 5 }) },
      { lines: [6], label: '3 · first guess: 20', desc: "int(input()) reads the player's first guess.", apply: (s) => ({ ...s, guess: 20 }) },
      { lines: [7], label: '4 · guess == secret?', desc: '20 == 73? No.' },
      { lines: [11], label: '5 · guess < secret?', desc: '20 < 73? Yes, so print Too low.', apply: (s) => ({ ...s, output: ['Too low.'] }) },
      { lines: [15], label: '6 · guesses_left -= 1', desc: '5 - 1 = 4. The loop repeats.', delta: (s) => ({ guessesLeft: { from: s.guessesLeft, to: s.guessesLeft - 1 } }), apply: (s) => ({ ...s, guessesLeft: s.guessesLeft - 1 }) },
      { lines: [6], label: '7 · second guess: 73', desc: 'int(input()) reads 73.', apply: (s) => ({ ...s, guess: 73 }) },
      { lines: [7, 8], label: '8 · guess == secret?', desc: '73 == 73? Yes, print You guessed the number.', apply: (s) => ({ ...s, output: [...s.output, 'You guessed the number.'], won: true }) },
      { lines: [10], label: '9 · break', desc: 'break exits the while loop immediately.', apply: (s) => ({ ...s }) },
    ],
  },

  commonMistake: {
    why: 'If `secret = random.randint(1, 100)` is moved **inside** the while loop, the secret changes on every guess, so the game is nearly impossible to win.',
    code: `while guesses_left > 0:
    secret = random.randint(1, 100)  # moved inside by mistake
    guess = int(input())
    # ...`,
    fix: 'Create the secret **once, before** the loop starts, so it stays the same across all guesses.',
  },

  practice: [
    {
      id: 'ng-predict-1',
      type: 'predict',
      title: 'Predict the output',
      prompt: 'What does this loop print?',
      code: `n = 0
while n < 3:
    print(n)
    n = n + 1`,
      expected: '0\n1\n2',
    },
    {
      id: 'ng-bugfix-1',
      type: 'bugfix',
      title: 'Fix the win check',
      prompt:
        'The program should print `win` when the guess matches the secret. With the correct guess (5) it prints nothing. Fix it. (The runner types 5 for you.)',
      starter: `secret = 5
guess = int(input())
if guess != secret:
    print("win")`,
      stdin: '5',
      check: { kind: 'stdout', expected: 'win' },
      hints: [
        'The condition is backwards — it prints win when the guess is NOT the secret.',
        'Use `==` to check for a match, not `!=`.',
      ],
      solution: `secret = 5
guess = int(input())
if guess == secret:
    print("win")`,
    },
  ],

  feynman: [
    { q: 'Why is the secret created before the loop?', a: 'So it stays the same across all guesses. If you create it inside the loop, it changes every turn.' },
    { q: 'What does break do in the win branch?', a: 'It exits the while loop immediately so the player is not asked for more guesses.' },
    { q: 'Why decrement guesses_left at the end of the loop body?', a: 'So the player loses one attempt only after a wrong guess, not after a win (because break exits first).' },
  ],
}

export default numberGuessing
