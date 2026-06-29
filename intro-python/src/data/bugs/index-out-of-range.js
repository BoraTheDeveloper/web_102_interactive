// Bug: list index out of range. Plain data.
// Index 3 on a 3-item list (indices 0..2) raises IndexError.

const indexOutOfRange = {
  slug: 'bug-index-out-of-range',
  title: 'Bug: list index out of range',

  brokenCode: `fruits = ["apple", "banana", "cherry"]
print(fruits[3])`,

  expected: 'Print the last fruit, "cherry".',
  actual:
    'The program crashes with `IndexError: list index out of range`. A 3-item list has indices 0, 1, 2 — there is no index 3.',

  trace: {
    code: `fruits = ["apple", "banana", "cherry"]
print(fruits[3])`,
    state: { fruits: [], output: [] },
    inspector: (s) => [
      { label: 'fruits', value: JSON.stringify(s.fruits) },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · fruits = ["apple", "banana", "cherry"]',
        desc: 'A list with 3 items. Valid indices are 0, 1, 2.',
        apply: (s) => ({ ...s, fruits: ['apple', 'banana', 'cherry'] }),
      },
      {
        lines: [2],
        label: '2 · fruits[3]',
        desc: 'Index 3 means "the 4th item", but the list only has 3 items (indices 0..2).',
      },
      {
        lines: [2],
        label: '3 · IndexError',
        desc: 'Python raises `IndexError: list index out of range` and the program stops.',
        apply: (s) => ({ ...s, output: [...s.output, 'IndexError: list index out of range'] }),
      },
    ],
  },

  fix: {
    hint: 'Use a valid index. The last item is at index `len(fruits) - 1` (which is 2), or use `fruits[-1]`.',
    solution: `fruits = ["apple", "banana", "cherry"]
print(fruits[2])`,
  },

  challenge: {
    title: 'Mini challenge',
    prompt:
      'Print the last fruit, "cherry". Right now index 3 does not exist, so the program crashes with IndexError. Fix the index.',
    starter: `fruits = ["apple", "banana", "cherry"]
print(fruits[3])`,
    check: { kind: 'stdout', expected: 'cherry' },
    hints: [
      'A 3-item list has indices 0, 1, 2 — there is no index 3.',
      'Use `fruits[2]` (or `fruits[-1]` for the last item).',
    ],
    solution: `fruits = ["apple", "banana", "cherry"]
print(fruits[2])`,
  },
}

export default indexOutOfRange
