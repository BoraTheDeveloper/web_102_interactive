export default {
  slug: 'w8',
  title: 'Week 8 · Rock Paper Scissors',
  subtitle: 'A project integrating W1 to W6: functions, dictionaries for score, while loop, and game logic',
  summary: 'This week you built a **Rock Paper Scissors** tournament. It uses **functions** to get the player choice and decide the winner, a **dictionary** to keep score across rounds, `random.choice()` for the computer pick, and a `while` loop that plays rounds until someone wins three.',
  keyPoints: [
    { heading: 'Functions for game logic', body: '`get_player_choice()` loops until the player types a valid move, and `get_winner(player, computer)` returns who won using `if` / `elif` branches.' },
    { heading: 'Dictionary for scorekeeping', body: 'A dictionary `score = {"player": 0, "computer": 0, "ties": 0}` tracks wins across rounds. You update it each round and read it to decide when the tournament ends.' },
    { heading: 'while loop for rounds', body: 'The game keeps playing rounds with `while score["player"] < 3 and score["computer"] < 3:` until someone reaches three wins.' },
    { heading: 'random.choice()', body: 'The computer picks randomly from the list of choices with `random.choice(choices)`, so each round is unpredictable.' },
  ],
  code: `import random


choices = ["rock", "paper", "scissors"]
score = {"player": 0, "computer": 0, "ties": 0}


def get_player_choice():
    while True:
        choice = input("Choose rock, paper, or scissors: ").lower()
        if choice in choices:
            return choice
        print("Please choose rock, paper, or scissors.")


def get_winner(player, computer):
    if player == computer:
        return "tie"
    elif player == "rock" and computer == "scissors":
        return "player"
    elif player == "paper" and computer == "rock":
        return "player"
    elif player == "scissors" and computer == "paper":
        return "player"
    else:
        return "computer"


while score["player"] < 3 and score["computer"] < 3:
    player_choice = get_player_choice()
    computer_choice = random.choice(choices)
    print("Computer chose " + computer_choice)

    winner = get_winner(player_choice, computer_choice)

    if winner == "tie":
        score["ties"] = score["ties"] + 1
        print("Tie round.")
    elif winner == "player":
        score["player"] = score["player"] + 1
        print("You win this round.")
    else:
        score["computer"] = score["computer"] + 1
        print("Computer wins this round.")

    print("Score: " + str(score))

if score["player"] == 3:
    print("You win the tournament.")
else:
    print("Computer wins the tournament.")`,
  codeLang: 'python',
  related: [
    { slug: 'review-rock-paper-scissors', label: 'Rock Paper Scissors Review' },
    { slug: 'functions', label: 'Functions' },
    { slug: 'dictionaries', label: 'Dictionaries' },
    { slug: 'bug-score-resets', label: 'Score Keeps Resetting' },
  ],
  takeaways: [
    'You can split game logic into reusable functions that each do one job',
    'You can use a dictionary to keep running score across many loop iterations',
    'You can use a `while` loop with a win condition to run a game until someone wins',
  ],
}
