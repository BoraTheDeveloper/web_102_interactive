export default {
  slug: 'w7',
  title: 'Week 7 · Number Guessing Game',
  subtitle: 'A project integrating W1 to W6: random, while, input validation, and difficulty',
  summary: 'This week you built your first real project, a **Number Guessing Game** that pulls together everything from weeks 1 to 6. It picks a secret number with `random.randint()`, lets the player choose a **difficulty** using a dictionary, validates input with `try` / `except`, and uses a `while` loop to track guesses until the player wins or runs out.',
  keyPoints: [
    { heading: 'random.randint()', body: 'Generate a random whole number in a range with `random.randint(1, 100)`. This becomes the secret number the player has to guess.' },
    { heading: 'Dictionary for difficulty', body: 'A dictionary maps difficulty names to guess counts: `{"easy": 10, "medium": 7, "hard": 5}`. The player picks a level and you look up how many guesses they get.' },
    { heading: 'Input validation', body: 'The `get_guess()` function uses a `while True` loop with `try` / `except ValueError` to keep asking until the player types a valid whole number.' },
    { heading: 'Game loop & state', body: 'A `while guesses_left > 0` loop runs each turn. You track `guess_history` (a list), `won_game` (a bool), and decrement `guesses_left` each wrong guess.' },
  ],
  code: `import random


def get_guess():
    while True:
        try:
            return int(input("Take a guess: "))
        except ValueError:
            print("Please type a whole number.")


difficulties = {"easy": 10, "medium": 7, "hard": 5}

print("Number Guessing Game Plus")
level = input("Choose difficulty: easy, medium, or hard: ")
if level not in difficulties:
    level = "easy"

guesses_left = difficulties[level]
secret_number = random.randint(1, 100)
guess_history = []
won_game = False

while guesses_left > 0:
    print("Guesses left: " + str(guesses_left))
    guess = get_guess()
    guess_history.append(guess)

    if guess == secret_number:
        print("You guessed the number.")
        won_game = True
        break
    elif guess < secret_number:
        print("Too low.")
    else:
        print("Too high.")

    guesses_left = guesses_left - 1

if not won_game:
    print("Game over. The number was " + str(secret_number))

print("Your guesses: " + str(guess_history))`,
  codeLang: 'python',
  related: [
    { slug: 'review-number-guessing', label: 'Number Guessing Game Review' },
    { slug: 'loops', label: 'Loops' },
    { slug: 'tryexcept', label: 'try / except' },
    { slug: 'bug-infinite-loop', label: 'Infinite Loop Bug' },
  ],
  takeaways: [
    'You can combine `random`, `while` loops, `try` / `except`, lists, and dictionaries into a working game',
    'You can validate user input by looping until the player gives you a valid value',
    'You can track game state (guesses left, history, win/loss) across multiple loop iterations',
  ],
}
