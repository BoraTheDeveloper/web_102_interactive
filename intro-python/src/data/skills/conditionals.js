// Skill: Conditionals. Plain data — no app logic lives here.
// Trace style: line -> variable change -> output.

const conditionals = {
  slug: 'conditionals',
  title: 'Conditionals',
  subtitle: 'if / elif / else — choosing what runs',
  meaning:
    'A **conditional** runs a block of code only when a condition is `True`. Use `if` for the first test, `elif` for extra mutually-exclusive tests, and `else` for the fallback that runs when nothing else matched.',

  example: {
    code: `score = 7

if score >= 10:
    print("Pass")
else:
    print("Keep going")`,
  },

  trace: {
    code: `score = 7

if score >= 10:
    print("Pass")
else:
    print("Keep going")`,
    state: { score: null, output: [] },
    inspector: (s) => [
      { label: 'score', value: s.score === null ? '—' : s.score },
      { label: 'output', value: (s.output || []).join('\
') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · score = 7',
        desc: 'The variable score is assigned the value 7.',
        apply: (s) => ({ ...s, score: 7 }),
      },
      {
        lines: [3],
        label: '2 · if score >= 10',
        desc: 'Is 7 >= 10? No — so the if block is skipped.',
      },
      {
        lines: [6],
        label: '3 · else runs',
        desc: 'Because the if condition was False, the else block runs instead.',
        apply: (s) => ({ ...s, output: ['Keep going'] }),
      },
    ],
  },

  commonMistake: {
    why: 'Two separate `if` statements are each checked independently. If you want **exactly one** branch to run, use `elif`.',
    code: `score = 85

if score >= 80:
    print("Good")
if score >= 50:
    print("Pass")`,
    fix: 'With two `if`s, both conditions are True, so **both** lines print. Change the second `if` to `elif` so only one branch runs.',
  },

  practice: [
    {
      id: 'cond-predict-1',
      type: 'predict',
      title: 'Predict the output',
      prompt: 'Before revealing it, write down what this prints.',
      code: `x = 3

if x > 5:
    print("big")
else:
    print("small")`,
      expected: 'small',
    },
    {
      id: 'cond-bugfix-1',
      type: 'bugfix',
      title: 'Fix the off-by-one',
      prompt:
        'The program should print `adult` when age is 18 or more, but age 18 prints nothing. Fix the condition.',
      starter: `age = 18

if age > 18:
    print("adult")`,
      check: { kind: 'stdout', expected: 'adult' },
      hints: [
        'The condition must be True when age is **exactly** 18.',
        'Use `>=` (greater than or equal) instead of `>`.',
      ],
      solution: `age = 18

if age >= 18:
    print("adult")`,
    },
  ],

  feynman: [
    { q: 'What does an if statement do?', a: 'It runs a block of code only when its condition is True.' },
    { q: 'What does else do?', a: 'It runs when the if condition is False — the fallback branch.' },
    {
      q: 'When do you use elif?',
      a: 'When you have more than two mutually exclusive cases. Only the first matching branch runs.',
    },
    {
      q: 'Why can two separate ifs be a bug?',
      a: 'Each if is checked independently, so more than one branch can run. Use elif when only one should.',
    },
  ],
}

export default conditionals
