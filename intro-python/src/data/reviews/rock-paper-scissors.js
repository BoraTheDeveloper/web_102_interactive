// Game review: Rock Paper Scissors (Week 8). Reuses the skill-page shape.
// Based on intro_python/src/w8_final.py.

const rockPaperScissors = {
  slug: 'review-rock-paper-scissors',
  title: 'Rock Paper Scissors',
  subtitle: 'Week 8 review — deciding the winner',
  meaning:
    'Rock Paper Scissors compares the player choice and the computer choice inside a `get_winner` function that returns `"player"`, `"computer"`, or `"tie"`. A `while` loop plays rounds until someone reaches the target wins. The core skills are **functions**, **conditionals**, **dictionaries** (the score), and **loops**.',

  example: {
    code: `def get_winner(player, computer):
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

print(get_winner("rock", "scissors"))`,
  },

  trace: {
    code: `def get_winner(player, computer):
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

print(get_winner("rock", "scissors"))`,
    state: { player: null, computer: null, winner: null, output: [] },
    inspector: (s) => [
      { label: 'player', value: s.player === null ? '—' : `"${s.player}"` },
      { label: 'computer', value: s.computer === null ? '—' : `"${s.computer}"` },
      { label: 'winner', value: s.winner === null ? '—' : `"${s.winner}"` },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      { lines: [13], label: '1 · call get_winner', desc: "Call get_winner with player='rock', computer='scissors'.", apply: (s) => ({ ...s, player: 'rock', computer: 'scissors' }) },
      { lines: [2], label: '2 · tie check', desc: 'rock == scissors? No.' },
      { lines: [4], label: '3 · rock vs scissors', desc: 'player=="rock" and computer=="scissors"? Yes.', apply: (s) => ({ ...s, winner: 'player' }) },
      { lines: [5], label: '4 · return "player"', desc: 'The function returns "player" and stops checking the rest.' },
      { lines: [13], label: '5 · print the winner', desc: 'print shows the value get_winner returned.', apply: (s) => ({ ...s, output: ['player'] }) },
    ],
  },

  commonMistake: {
    why: '`input()` returns exactly what was typed. If the player types `Rock` but the list has `rock`, the membership check fails. Always call `.lower()` on the input.',
    code: `choice = input("Choose: ")   # player types "Rock"
if choice in ["rock", "paper", "scissors"]:
    print("ok")   # never runs`,
    fix: 'Use `choice = input("Choose: ").lower()` so capitalization does not matter.',
  },

  practice: [
    {
      id: 'rps-predict-1',
      type: 'predict',
      title: 'Predict the output',
      prompt: 'What does this print?',
      code: `def get_winner(player, computer):
    if player == computer:
        return "tie"
    else:
        return "computer"

print(get_winner("rock", "rock"))`,
      expected: 'tie',
    },
    {
      id: 'rps-bugfix-1',
      type: 'bugfix',
      title: 'Fix the winner',
      prompt:
        'get_winner should return `player` when rock beats scissors, but it returns `computer`. Fix the rock-vs-scissors branch.',
      starter: `def get_winner(player, computer):
    if player == computer:
        return "tie"
    elif player == "rock" and computer == "scissors":
        return "computer"
    else:
        return "computer"

print(get_winner("rock", "scissors"))`,
      check: { kind: 'stdout', expected: 'player' },
      hints: [
        'The rock-vs-scissors branch returns the wrong winner.',
        'Rock beats scissors, so that branch should return "player".',
      ],
      solution: `def get_winner(player, computer):
    if player == computer:
        return "tie"
    elif player == "rock" and computer == "scissors":
        return "player"
    else:
        return "computer"

print(get_winner("rock", "scissors"))`,
    },
  ],

  feynman: [
    { q: 'Why does get_winner check the tie first?', a: 'So equal choices return "tie" before any win/lose branch can run.' },
    { q: 'Why do we .lower() the player input?', a: 'So "Rock" and "rock" are treated the same; input() keeps the original capitalization.' },
    { q: 'How does the tournament loop know when to stop?', a: 'It loops while neither score has reached the target wins (for example 3).' },
  ],
}

export default rockPaperScissors
