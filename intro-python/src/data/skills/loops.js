// Skill: Loops. Plain data — no app logic lives here.
// Trace style: line -> variable change -> output.

const loops = {
  slug: 'loops',
  title: 'Loops',
  subtitle: 'while and for — repeating work without copy-paste',
  meaning:
    'A **loop** runs a block of code more than once. A `while` loop repeats **while** a condition stays `True` (you must update the thing the condition checks, or it loops forever). A `for` loop walks through a sequence like `range(5)` or a list, handing you one item per pass.',

  example: {
    code: `for i in range(3):
    print(i)`,
  },

  trace: {
    code: `count = 0

while count < 2:
    print(count)
    count += 1`,
    state: { count: null, output: [] },
    inspector: (s) => [
      { label: 'count', value: s.count === null ? '—' : s.count },
      { label: 'output', value: (s.output || []).join('\
') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · count = 0',
        desc: 'The variable count starts at 0.',
        apply: (s) => ({ ...s, count: 0 }),
      },
      {
        lines: [3],
        label: '2 · while count < 2',
        desc: 'Is 0 < 2? Yes — so we enter the loop body.',
      },
      {
        lines: [4],
        label: '3 · print(count)',
        desc: 'Print the current value of count: 0.',
        apply: (s) => ({ ...s, output: [...s.output, '0'] }),
      },
      {
        lines: [5],
        label: '4 · count += 1',
        desc: 'Add 1 to count so the condition can eventually become False. count is now 1.',
        apply: (s) => ({ ...s, count: s.count + 1 }),
      },
      {
        lines: [3, 4, 5],
        label: '5 · 2nd pass',
        desc: 'The condition 1 < 2 is still True, so the body runs again: print 1, then count becomes 2.',
        apply: (s) => ({ ...s, output: [...s.output, '1'], count: s.count + 1 }),
      },
      {
        lines: [3],
        label: '6 · while count < 2',
        desc: 'Now 2 < 2 is False, so the loop stops. We do not enter the body again.',
      },
    ],
  },

  commonMistake: {
    why: 'Forgetting to update the counter inside a `while` loop. The condition never becomes `False`, so the loop runs forever — an **infinite loop**.',
    code: `count = 0
while count < 3:
    print(count)`,
    fix: 'The body prints `count` but never changes it, so `count < 3` is True forever. Add `count += 1` inside the loop so the condition can eventually become False.',
  },

  practice: [
    {
      id: 'loops-predict-1',
      type: 'predict',
      title: 'Predict the output',
      prompt: 'What does this `for` loop print? Write each value on its own line.',
      code: `for i in range(2, 5):
    print(i)`,
      expected: '2\n3\n4',
    },
    {
      id: 'loops-bugfix-1',
      type: 'bugfix',
      title: 'Fix the loop that never runs',
      prompt:
        'This loop should print `0`, `1`, `2` but it never runs at all. Fix the condition so the body executes.',
      starter: `n = 0

while n > 3:
    print(n)
    n += 1`,
      check: { kind: 'stdout', expected: '0\n1\n2' },
      hints: [
        'The condition is checked **before** the first pass. With `n = 0`, is `n > 3` ever True?',
        'You want the loop to run while `n` is **below** 3. Use `<` instead of `>`.',
      ],
      solution: `n = 0

while n < 3:
    print(n)
    n += 1`,
    },
  ],

  feynman: [
    {
      q: 'What is the difference between while and for?',
      a: 'A while loop repeats while a condition is True (you control the update). A for loop walks through a sequence like range(5) or a list, handing you one item each pass.',
    },
    {
      q: 'Why does a while loop need an update inside the body?',
      a: 'Because the condition is re-checked every pass. If nothing changes the variable the condition tests, it stays True forever — an infinite loop.',
    },
    {
      q: 'What does range(2, 5) produce?',
      a: 'The numbers 2, 3, 4. range(start, stop) goes up to but does not include stop.',
    },
  ],
}

export default loops
