// Bug: score resets every iteration. Plain data.
// `score = 0` is inside the loop, so the running total is wiped each pass.

const scoreResets = {
  slug: 'bug-score-resets',
  title: 'Bug: score resets every loop',

  brokenCode: `scores = [10, 20, 30]
for s in scores:
    score = 0
    score = score + s
print(score)`,

  expected: 'The program should add up the scores and print 60.',
  actual:
    'It prints 30. `score = 0` is inside the loop, so the total is reset to 0 on every iteration and never accumulates — only the last item survives.',

  trace: {
    code: `scores = [10, 20, 30]
for s in scores:
    score = 0
    score = score + s
print(score)`,
    state: { scores: [], s: '—', score: '—', output: [] },
    inspector: (s) => [
      { label: 'scores', value: JSON.stringify(s.scores) },
      { label: 's', value: s.s },
      { label: 'score', value: s.score },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · scores = [10, 20, 30]',
        desc: 'A list of three scores to add up.',
        apply: (s) => ({ ...s, scores: [10, 20, 30] }),
      },
      {
        lines: [2, 3],
        label: '2 · first item: s = 10, score = 0',
        desc: 'The loop grabs 10. Then `score = 0` runs *inside* the loop — that is the bug.',
        apply: (s) => ({ ...s, s: 10, score: 0 }),
      },
      {
        lines: [4],
        label: '3 · score = score + s',
        desc: '0 + 10 = 10. So far the total looks like 10.',
        apply: (s) => ({ ...s, score: 10 }),
      },
      {
        lines: [2, 3],
        label: '4 · next item: s = 20, score = 0 again',
        desc: 'The loop grabs 20 — and `score = 0` runs again, throwing away the 10.',
        apply: (s) => ({ ...s, s: 20, score: 0 }),
      },
      {
        lines: [4, 5],
        label: '5 · score = 0 + 20 … then print(score)',
        desc: 'score becomes 20 (and 30 after the last item). `print(score)` shows 30, not the total 60. Move `score = 0` above the loop to fix it.',
        apply: (s) => ({ ...s, s: 30, score: 30, output: [...s.output, '30'] }),
      },
    ],
  },

  fix: {
    hint: 'Move `score = 0` to the line **above** `for s in scores:` so it runs once. Then each `score = score + s` adds to the running total.',
    solution: `scores = [10, 20, 30]
score = 0
for s in scores:
    score = score + s
print(score)`,
  },

  challenge: {
    title: 'Mini challenge',
    prompt:
      'Add up all the scores and print the total (60). Right now `score = 0` is inside the loop, so the total resets every iteration. Fix it.',
    starter: `scores = [10, 20, 30]
for s in scores:
    score = 0
    score = score + s
print(score)`,
    check: { kind: 'stdout', expected: '60' },
    hints: [
      '`score = 0` is inside the loop, so it runs every time and wipes the total.',
      'Move `score = 0` to the line above `for s in scores:`.',
    ],
    solution: `scores = [10, 20, 30]
score = 0
for s in scores:
    score = score + s
print(score)`,
  },
}

export default scoreResets
