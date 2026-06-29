// Bug: input is a string. Plain data.
// Demonstrates the bug-page shape: brokenCode, expected, actual, trace, fix, challenge.
// The challenge uses stdin so Pyodide can feed input() a value.

const inputString = {
  slug: 'bug-input-is-string',
  title: 'Bug: input is a string',

  brokenCode: `age = input()  # the student types 18
if age >= 18:
    print("adult")`,

  expected: 'Typing 18 should print adult.',
  actual:
    'The program crashes with `TypeError: \'>=\' not supported between instances of \'str\' and \'int\'. input() always returns text, even when you type digits.',

  trace: {
    code: `age = input()  # the student types 18
if age >= 18:
    print("adult")`,
    state: { age: '—', ageType: '—', output: [] },
    inspector: (s) => [
      { label: 'age', value: s.age },
      { label: 'type', value: s.ageType },
      { label: 'output', value: (s.output || []).join('\
') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · input() returns a string',
        desc: 'input() always gives text. Typing 18 stores the string "18", not the number 18.',
        apply: (s) => ({ ...s, age: '"18"', ageType: 'str' }),
      },
      {
        lines: [2],
        label: '2 · compare string to int',
        desc: 'Python tries "18" >= 18. A str and an int cannot be compared with >=.',
      },
      {
        lines: [2],
        label: '3 · TypeError',
        desc: 'The program crashes before it can print anything.',
        apply: (s) => ({
          ...s,
          output: ["TypeError: '>=' not supported", "  between instances of 'str' and 'int'"],
        }),
      },
    ],
  },

  fix: {
    hint: 'Convert the input to a number with `int()` **before** you compare it.',
    solution: `age = int(input())  # the student types 18
if age >= 18:
    print("adult")`,
  },

  challenge: {
    title: 'Mini challenge',
    prompt:
      'The program should print `adult` when the age typed is 18 or more. Right now it crashes. Fix it. (The runner types 18 for you.)',
    starter: `age = input()
if age >= 18:
    print("adult")`,
    stdin: '18',
    check: { kind: 'stdout', expected: 'adult' },
    hints: [
      '`input()` returns a string, but you need a number to compare with 18.',
      'Wrap the input in `int(...)`: `age = int(input())`.',
    ],
    solution: `age = int(input())
if age >= 18:
    print("adult")`,
  },
}

export default inputString
