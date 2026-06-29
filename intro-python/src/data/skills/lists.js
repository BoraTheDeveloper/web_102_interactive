// Skill: Lists. Plain data — no app logic lives here.
// Trace style: line -> variable change -> output.

const lists = {
  slug: 'lists',
  title: 'Lists',
  subtitle: 'ordered, mutable, and zero-indexed',
  meaning:
    'A **list** stores several values in order inside `[ ]`. Indexing starts at `0`, so the first item is `list[0]` and the last is `list[len(list) - 1]`. Lists are **mutable** — you can `append` to the end or change an item in place.',

  example: {
    code: `colors = ["red", "green", "blue"]
print(colors[0])
colors.append("yellow")
print(colors)`,
  },

  trace: {
    code: `fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits[1])`,
    state: { fruits: null, output: [] },
    inspector: (s) => [
      { label: 'fruits', value: s.fruits === null ? '—' : '[' + s.fruits.map((x) => "'" + x + "'").join(', ') + ']' },
      { label: 'output', value: (s.output || []).join('\
') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · fruits = ["apple", "banana"]',
        desc: 'Create a list with two items. Index 0 is "apple", index 1 is "banana".',
        apply: (s) => ({ ...s, fruits: ['apple', 'banana'] }),
      },
      {
        lines: [2],
        label: '2 · fruits.append("cherry")',
        desc: 'append adds "cherry" to the end of the list. The list is now ["apple", "banana", "cherry"].',
        apply: (s) => ({ ...s, fruits: [...s.fruits, 'cherry'] }),
      },
      {
        lines: [3],
        label: '3 · print(fruits[1])',
        desc: 'Read index 1, which is "banana", and print it. (Index 1 has not changed — append adds at the end.)',
        apply: (s) => ({ ...s, output: [...s.output, 'banana'] }),
      },
    ],
  },

  commonMistake: {
    why: 'Going past the end of the list. A list of 3 items has valid indexes `0, 1, 2` — the last one is `len(list) - 1`. Asking for index 3 raises an **IndexError**.',
    code: `nums = [10, 20, 30]
print(nums[3])`,
    fix: 'There is no item at index 3. Use `nums[2]` (the last item) or `nums[-1]` (negative indexes count from the end).',
  },

  practice: [
    {
      id: 'lists-predict-1',
      type: 'predict',
      title: 'Predict the output',
      prompt: 'What does this print? Watch what index is read before and after append.',
      code: `letters = ["a", "b", "c"]
print(letters[1])
letters.append("d")
print(letters[3])`,
      expected: 'b\nd',
    },
    {
      id: 'lists-bugfix-1',
      type: 'bugfix',
      title: 'Fix the off-by-one index',
      prompt:
        'The program should print the last score (92) but it crashes with an `IndexError`. Fix the index.',
      starter: `scores = [70, 85, 92]
print(scores[3])`,
      check: { kind: 'stdout', expected: '92' },
      hints: [
        'A 3-item list has indexes 0, 1, 2. There is no index 3.',
        'The last item is at index `len(scores) - 1`, which is 2 here.',
      ],
      solution: `scores = [70, 85, 92]
print(scores[2])`,
    },
  ],

  feynman: [
    {
      q: 'What index is the first item of a list at?',
      a: 'Index 0. Python lists are zero-indexed, so list[0] is the first item and list[1] is the second.',
    },
    {
      q: 'How do you add a new item to the end of a list?',
      a: 'Use list.append(value). It adds the value as a new last item and increases the length by one.',
    },
    {
      q: 'What is the largest valid index for a list of length n?',
      a: 'n - 1. Asking for index n (or higher) raises an IndexError because that slot does not exist.',
    },
  ],
}

export default lists
