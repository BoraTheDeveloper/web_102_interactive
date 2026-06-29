// Skill: try / except. Plain data — no app logic lives here.
// Trace style: line -> variable change -> output.

const tryexcept = {
  slug: 'tryexcept',
  title: 'try / except',
  subtitle: 'catch errors so your program does not crash',
  meaning:
    'A **try / except** block wraps code that might fail. Python runs the `try` block; if it raises an error that matches the `except`, the except block runs instead of crashing. Always catch the **specific** error you expect (like `ValueError`) — a bare `except:` hides real bugs.',

  example: {
    code: `try:
    value = int("42")
    print(value + 1)
except ValueError:
    print("Not a number")`,
  },

  trace: {
    code: `raw = "cat"
try:
    num = int(raw)
except ValueError:
    print("Not a number")`,
    state: { raw: null, num: null, output: [] },
    inspector: (s) => [
      { label: 'raw', value: s.raw === null ? '—' : s.raw },
      { label: 'num', value: s.num === null ? '—' : s.num },
      { label: 'output', value: (s.output || []).join('\
') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · raw = "cat"',
        desc: 'Store the text the user typed. It is the string "cat", not a number.',
        apply: (s) => ({ ...s, raw: 'cat' }),
      },
      {
        lines: [2, 3],
        label: '2 · try: int(raw)',
        desc: 'Attempt to convert "cat" to an integer. int("cat") raises a ValueError because "cat" is not a number, so num is never assigned.',
      },
      {
        lines: [4],
        label: '3 · except ValueError',
        desc: 'The raised error is a ValueError, which matches — so this except block runs instead of crashing the program.',
      },
      {
        lines: [5],
        label: '4 · print("Not a number")',
        desc: 'Print a friendly message. The program keeps going instead of stopping with a traceback.',
        apply: (s) => ({ ...s, output: [...s.output, 'Not a number'] }),
      },
    ],
  },

  commonMistake: {
    why: 'A bare `except:` catches **every** error, including bugs you did not expect (like a `NameError` or `TypeError`). That hides the real problem and makes code hard to debug.',
    code: `try:
    n = int("cat")
except:
    print("Something went wrong")`,
    fix: 'Catch the specific error you anticipate — here `except ValueError:`. Real bugs will then still surface instead of being swallowed.',
  },

  practice: [
    {
      id: 'tryexcept-predict-1',
      type: 'predict',
      title: 'Predict the output',
      prompt: 'The conversion here succeeds. What prints?',
      code: `try:
    n = int("10")
    print(n + 5)
except ValueError:
    print("bad")`,
      expected: '15',
    },
    {
      id: 'tryexcept-bugfix-1',
      type: 'bugfix',
      title: 'Ask again on bad input',
      prompt:
        'Ask the user for a number repeatedly until they type a valid one. Right now a non-number crashes the program. Wrap the `int(input())` in `try / except ValueError` so it asks again instead of crashing.',
      starter: `num = None

while num is None:
    num = int(input())

print("Got " + str(num))`,
      check: { kind: 'stdout', expected: 'Got 7' },
      stdin: 'cat\n7',
      hints: [
        'Wrap `num = int(input())` in a `try:` block so a bad input does not crash the program.',
        'Add `except ValueError:` and set `num = None` inside it, so the `while` loop asks again.',
      ],
      solution: `num = None

while num is None:
    try:
        num = int(input())
    except ValueError:
        num = None

print("Got " + str(num))`,
    },
  ],

  feynman: [
    {
      q: 'What does a try/except block do?',
      a: 'It runs the code in try. If that code raises an error matching the except, the except block runs instead of the program crashing.',
    },
    {
      q: 'Why is a bare except: dangerous?',
      a: 'It catches every error, including unexpected bugs like NameError or TypeError. That hides real problems and makes code hard to debug. Catch the specific error you expect instead.',
    },
    {
      q: 'Which error does int("cat") raise?',
      a: 'ValueError, because "cat" cannot be converted to an integer. Catch it with except ValueError.',
    },
  ],
}

export default tryexcept
