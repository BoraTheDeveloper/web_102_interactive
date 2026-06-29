// Tic-Tac-Toe readiness: a small board trace + the Week-9 checklist.
import React from 'react'

const readiness = {
  slug: 'tic-tac-toe-readiness',
  title: 'Tic-Tac-Toe Readiness',
  subtitle: 'Turn review into preparation for Week 9',
  goal: 'Before Week 9, check that you can do each of these on your own. If you can, you are ready to build Tic-Tac-Toe and your final Python project.',
  traceLead: 'A Tic-Tac-Toe board is just a list. Step through to see how you change one cell and print it.',
  trace: {
    code: `board = ["-", "-", "-"]
board[0] = "X"
print(board)`,
    state: { board: ['—', '—', '—'], output: [] },
    visual: (s) =>
      React.createElement(
        'div',
        { className: 'board-3' },
        (s.board || []).map((c, i) =>
          React.createElement('span', { key: i, className: 'board-cell' }, c),
        ),
      ),
    inspector: (s) => [
      { label: 'board', value: JSON.stringify(s.board).replace(/"/g, "'") },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · Create the board',
        desc: 'A list of three "-" strings stands in for an empty row.',
        apply: (s) => ({ ...s, board: ['-', '-', '-'] }),
      },
      {
        lines: [2],
        label: '2 · Change one cell',
        desc: "board[0] = 'X' changes only the first item. Lists are mutable.",
        apply: (s) => ({ ...s, board: ['X', '-', '-'] }),
      },
      {
        lines: [3],
        label: '3 · Print the board',
        desc: 'Printing the list shows the whole board at once.',
        apply: (s) => ({ ...s, output: ["['X', '-', '-']"] }),
      },
    ],
  },
  checklistIntro: 'Tick each one you can do without help. Aim for all of them before Week 9.',
  items: [
    { id: 'print-board', label: 'print a list as a board', hint: 'A board is just a list of strings like ["-", "-", "-"].' },
    { id: 'ask-position', label: 'ask a player for a position', hint: 'Use input() and int() to get a number.' },
    { id: 'valid-position', label: 'check if a position is valid', hint: 'Is it in range? Is that cell still empty?' },
    { id: 'change-item', label: 'change one item in a list', hint: 'board[0] = "X" changes only index 0.' },
    { id: 'switch-turns', label: 'switch turns', hint: 'Swap between "X" and "O" each round.' },
    { id: 'return-bool', label: 'write a function that returns True or False', hint: 'def is_win(board): return ...' },
    { id: 'repeat', label: 'repeat until the game ends', hint: 'A while loop runs rounds until someone wins or the board is full.' },
  ],
}

export default readiness
