// Bug: missing dictionary key. Plain data.
// Accessing a key that is not in the dict raises KeyError.

const keyError = {
  slug: 'bug-key-error',
  title: 'Bug: missing dictionary key',

  brokenCode: `ages = {"Ana": 9, "Ben": 11}
print(ages["Mo"])`,

  expected: 'Look up "Mo" and print None (they are not in the dict).',
  actual:
    'The program crashes with `KeyError: \'Mo\'`. The dict only has the keys "Ana" and "Ben", so `ages["Mo"]` has no value to return.',

  trace: {
    code: `ages = {"Ana": 9, "Ben": 11}
print(ages["Mo"])`,
    state: { ages: {}, output: [] },
    inspector: (s) => [
      { label: 'ages', value: JSON.stringify(s.ages) },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · ages = {"Ana": 9, "Ben": 11}',
        desc: 'A dict with two keys: "Ana" and "Ben".',
        apply: (s) => ({ ...s, ages: { Ana: 9, Ben: 11 } }),
      },
      {
        lines: [2],
        label: '2 · ages["Mo"]',
        desc: 'Python looks for the key "Mo", but it is not in the dict.',
      },
      {
        lines: [2],
        label: '3 · KeyError',
        desc: 'Python raises `KeyError: \'Mo\'` and the program stops.',
        apply: (s) => ({ ...s, output: [...s.output, "KeyError: 'Mo'"] }),
      },
    ],
  },

  fix: {
    hint: 'Use `ages.get("Mo")` (returns None instead of crashing), or check `if "Mo" in ages` first.',
    solution: `ages = {"Ana": 9, "Ben": 11}
print(ages.get("Mo"))`,
  },

  challenge: {
    title: 'Mini challenge',
    prompt:
      'Look up "Mo" without crashing. Right now `ages["Mo"]` raises KeyError because "Mo" is not a key. Fix it so it prints None.',
    starter: `ages = {"Ana": 9, "Ben": 11}
print(ages["Mo"])`,
    check: { kind: 'stdout', expected: 'None' },
    hints: [
      '`ages["Mo"]` crashes when the key is missing.',
      'Use `ages.get("Mo")` instead — it returns None for missing keys.',
    ],
    solution: `ages = {"Ana": 9, "Ben": 11}
print(ages.get("Mo"))`,
  },
}

export default keyError
