// Bug: print instead of return. Plain data.
// The function prints its result, so the caller's variable gets None.

const printsVsReturns = {
  slug: 'bug-prints-vs-returns',
  title: 'Bug: print instead of return',

  brokenCode: `def double(n):
    print(n * 2)
result = double(5)
print(result)`,

  expected: 'result should hold 10 (double of 5).',
  actual:
    'The function prints 10, but `result` is None. `print` shows a value without giving it back, so `double` returns None by default.',

  trace: {
    code: `def double(n):
    print(n * 2)
result = double(5)
print(result)`,
    state: { n: '—', result: '—', output: [] },
    inspector: (s) => [
      { label: 'n', value: s.n },
      { label: 'result', value: s.result },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      {
        lines: [1, 2],
        label: '1 · define double',
        desc: 'double is defined. Its body prints `n * 2` but has no `return` statement, so it returns None.',
      },
      {
        lines: [3],
        label: '2 · call double(5)',
        desc: 'n becomes 5. The body runs `print(5 * 2)`, which prints 10. But the function returns None.',
        apply: (s) => ({ ...s, n: 5, output: [...s.output, '10'] }),
      },
      {
        lines: [3],
        label: '3 · result = None',
        desc: 'Because double did not return a value, `result` is assigned None — not 10.',
        delta: (s) => ({ result: { from: s.result, to: 'None' } }),
      },
      {
        lines: [4],
        label: '4 · print(result)',
        desc: 'Prints None. The 10 we saw earlier came from inside the function, not from `result`.',
        apply: (s) => ({ ...s, result: 'None', output: [...s.output, 'None'] }),
      },
    ],
  },

  fix: {
    hint: 'Replace `print(n * 2)` with `return n * 2` so the function hands the value back to the caller.',
    solution: `def double(n):
    return n * 2
result = double(5)
print(result)`,
  },

  challenge: {
    title: 'Mini challenge',
    prompt:
      '`double` should hand its answer back with `return` so `result` holds 10. Right now it only prints inside the function, so `result` is None. Fix it.',
    starter: `def double(n):
    print(n * 2)
result = double(5)
print(result)`,
    check: { kind: 'expr', expr: 'result', expected: 10 },
    hints: [
      'The function uses `print`, which shows a value but does not give it back.',
      'Change `print(n * 2)` to `return n * 2`.',
    ],
    solution: `def double(n):
    return n * 2
result = double(5)
print(result)`,
  },
}

export default printsVsReturns
