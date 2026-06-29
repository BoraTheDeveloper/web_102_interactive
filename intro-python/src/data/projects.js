// Final project ideas, rendered as cards. Each lists skills needed, a
// minimum version, and stretch ideas. Levels match the plan.

const projects = [
  {
    id: 'quiz-game',
    name: 'Quiz Game',
    level: 'Beginner',
    skills: ['input/output', 'variables', 'conditionals', 'functions', 'lists', 'loops'],
    minimum: ['ask a few questions', 'check each answer', 'show the final score'],
    stretch: ['multiple-choice options', 'a timer per question', 'categories'],
  },
  {
    id: 'number-guessing',
    name: 'Number Guessing Game',
    level: 'Beginner',
    skills: ['variables', 'while loops', 'conditionals', 'random', 'input'],
    minimum: ['pick a secret number', 'loop until guessed', 'say too high / too low'],
    stretch: ['difficulty levels', 'limited attempts', 'play again'],
  },
  {
    id: 'rps-plus',
    name: 'Rock Paper Scissors Plus',
    level: 'Beginner',
    skills: ['input', 'conditionals', 'functions', 'random', 'loops'],
    minimum: ['player vs computer', 'decide the winner', 'show the score'],
    stretch: ['best of N rounds', 'player names', 'round history'],
  },
  {
    id: 'shopping-list',
    name: 'Shopping List',
    level: 'Beginner',
    skills: ['lists', 'loops', 'input', 'functions'],
    minimum: ['add items', 'show the list', 'remove an item'],
    stretch: ['quantities', 'running total', 'save/load the list'],
  },
  {
    id: 'pet-simulator',
    name: 'Pet Simulator',
    level: 'Beginner',
    skills: ['variables', 'dictionaries', 'loops', 'functions', 'input'],
    minimum: ['feed the pet', 'play with the pet', 'show hunger and happiness'],
    stretch: ['random events', 'save the pet name', 'a simple shop'],
  },
  {
    id: 'text-adventure',
    name: 'Text Adventure',
    level: 'Medium',
    skills: ['conditionals', 'functions', 'dictionaries', 'loops', 'input'],
    minimum: ['a few rooms', 'move between rooms', 'describe each room'],
    stretch: ['pick up items', 'an inventory', 'a win condition'],
  },
  {
    id: 'ttt-variant',
    name: 'Tic-Tac-Toe Variant',
    level: 'Medium',
    skills: ['lists', 'functions', 'loops', 'conditionals'],
    minimum: ['a 3x3 board', 'two players take turns', 'check for a win'],
    stretch: ['a bigger board', 'a simple AI', 'keep a score'],
  },
  {
    id: 'inventory-rpg',
    name: 'Inventory RPG',
    level: 'Medium',
    skills: ['dictionaries', 'lists', 'functions', 'loops'],
    minimum: ['items with stats', 'add and remove items', 'show the inventory'],
    stretch: ['player stats', 'enemies', 'simple combat'],
  },
  {
    id: 'typing-speed',
    name: 'Typing Speed Game',
    level: 'Medium',
    skills: ['strings', 'time', 'input', 'functions'],
    minimum: ['show a sentence', 'time the typing', 'show words per minute'],
    stretch: ['accuracy %', 'levels', 'a high score'],
  },
  {
    id: 'flashcard-app',
    name: 'Flashcard Study App',
    level: 'Medium',
    skills: ['dictionaries', 'lists', 'functions', 'loops', 'input'],
    minimum: ['question/answer pairs', 'reveal the answer', 'track the score'],
    stretch: ['categories', 'spaced repetition', 'save progress'],
  },
]

export default projects
