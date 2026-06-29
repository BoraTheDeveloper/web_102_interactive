// Bug: wrong indentation. Plain data.
// A print that should run every time is over-indented into an if block, so it is skipped.

const indentation = {
  slug: 'bug-indentation',
  title: 'Bug: wrong indentation',

  brokenCode: `score = 50
if score >= 60:
    print("Pass!")
    print("You took the test.")`,

  expected: '`You took the test.` should print for every score, pass or fail.',
  actual:
    'Nothing prints. `print("You took the test.")` is over-indented into the `if` block, so when the score is below 60 the whole block is skipped and the line never runs.',

  trace: {
    code: `score = 50
if score >= 60:
    print("Pass!")
    print("You took the test.")`,
    state: { score: '—', output: [] },
    inspector: (s) => [
      { label: 'score', value: s.score },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · score = 50',
        desc: 'The student scored 50.',
        apply: (s) => ({ ...s, score: 50 }),
      },
      {
        lines: [2],
        label: '2 · if score >= 60',
        desc: '50 >= 60 is False, so Python skips the entire `if` block.',
      },
      {
        lines: [3],
        label: '3 · print("Pass!") is skipped',
        desc: 'Line 3 lives inside the `if` block, so it does not run.',
      },
      {
        lines: [4],
        label: '4 · print("You took the test.") is also skipped',
        desc: 'Line 4 is over-indented, so it is ALSO inside the `if` block and gets skipped. The console stays empty. Dedenting it one level would make it run every time.',
      },
    ],
  },

  fix: {
    hint: 'Dedent `print("You took the test.")` by one level so it is outside the `if` block and runs every time.',
    solution: `score = 50
if score >= 60:
    print("Pass!")
print("You took the test.")`,
  },

  challenge: {
    title: 'Mini challenge',
    prompt:
      'The line `You took the test.` should print for every score. Right now it is over-indented inside the `if`, so for a score of 50 nothing prints at all. Fix the indentation so it always prints.',
    starter: `score = 50
if score >= 60:
    print("Pass!")
    print("You took the test.")`,
    check: { kind: 'stdout', expected: 'You took the test.' },
    hints: [
      '`print("You took the test.")` is indented to the same level as `print("Pass!")`, so Python treats it as part of the `if` block.',
      'Remove 4 spaces from the front of `print("You took the test.")` so it lines up with `if`.',
    ],
    solution: `score = 50
if score >= 60:
    print("Pass!")
print("You took the test.")`,
  },
}

export default indentation
