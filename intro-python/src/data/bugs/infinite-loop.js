// Bug: infinite loop. Plain data.
// A while loop that never updates its counter, so the condition stays True forever.

const infiniteLoop = {
  slug: 'bug-infinite-loop',
  title: 'Bug: infinite loop',

  brokenCode: `i = 1
while i <= 3:
    print(i)`,

  expected: 'The loop should print 1, 2, 3 each on its own line, then stop.',
  actual:
    'The program prints 1 forever and never stops. There is no line that changes `i`, so `i <= 3` is always True — the runner eventually times out.',

  trace: {
    code: `i = 1
while i <= 3:
    print(i)`,
    state: { i: '—', output: [] },
    inspector: (s) => [
      { label: 'i', value: s.i },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · i = 1',
        desc: 'The counter starts at 1.',
        apply: (s) => ({ ...s, i: 1 }),
      },
      {
        lines: [2],
        label: '2 · while i <= 3',
        desc: '1 <= 3 is True, so the loop body runs.',
      },
      {
        lines: [3],
        label: '3 · print(i)',
        desc: 'Prints 1.',
        apply: (s) => ({ ...s, output: [...s.output, '1'] }),
      },
      {
        lines: [2],
        label: '4 · back to while i <= 3',
        desc: 'i is still 1 — the loop body never writes `i = i + 1`, so 1 <= 3 is True again.',
      },
      {
        lines: [3],
        label: '5 · print(i) again… forever',
        desc: 'Prints 1 again. With nothing to change i, this loop never ends.',
        apply: (s) => ({ ...s, output: [...s.output, '1'] }),
      },
    ],
  },

  fix: {
    hint: 'Add `i = i + 1` inside the loop so the counter grows and the condition eventually becomes False.',
    solution: `i = 1
while i <= 3:
    print(i)
    i = i + 1`,
  },

  challenge: {
    title: 'Mini challenge',
    prompt:
      'The loop should print 1, 2, 3 each on its own line and then stop. Right now it runs forever (the runner times out). Fix it.',
    starter: `i = 1
while i <= 3:
    print(i)`,
    check: { kind: 'stdout', expected: `1
2
3` },
    hints: [
      'The loop body never changes `i`, so `i <= 3` is always True.',
      'Add `i = i + 1` as the last line inside the loop.',
    ],
    solution: `i = 1
while i <= 3:
    print(i)
    i = i + 1`,
  },
}

export default infiniteLoop
