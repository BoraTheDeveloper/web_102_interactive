// Bug: int() on non-numeric input. Plain data.
// int(input()) raises ValueError when the user types something that is not a number.

const valueErrorIntInput = {
  slug: 'bug-valueerror-int-input',
  title: 'Bug: int() on non-numeric input',

  brokenCode: `age = int(input())
print("You are", age)`,

  expected: 'Typing a non-number should print a friendly message and ask again, not crash.',
  actual:
    'Typing `abc` crashes with `ValueError: invalid literal for int() with base 10: \'abc\'`. `int()` can only convert strings that look like whole numbers.',

  trace: {
    code: `age = int(input())
print("You are", age)`,
    state: { age: '—', output: [] },
    inspector: (s) => [
      { label: 'age', value: s.age },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · input() returns "abc"',
        desc: 'The student types abc, so `input()` returns the string "abc".',
        apply: (s) => ({ ...s, age: '"abc"' }),
      },
      {
        lines: [1],
        label: '2 · int("abc")',
        desc: 'Python tries to turn "abc" into a number, but it has no digits.',
      },
      {
        lines: [1],
        label: '3 · ValueError',
        desc: 'Python raises `ValueError: invalid literal for int() with base 10: \'abc\'` and the program stops before line 2.',
        apply: (s) => ({
          ...s,
          output: [...s.output, "ValueError: invalid literal for int() with base 10: 'abc'"],
        }),
      },
    ],
  },

  fix: {
    hint: 'Wrap the conversion in `try:` / `except ValueError:` so a bad entry prints a friendly message and you can ask again instead of crashing.',
    solution: `while True:
    try:
        age = int(input())
        break
    except ValueError:
        print("That is not a number.")
print("You are", age)`,
  },

  challenge: {
    title: 'Mini challenge',
    prompt:
      'Ask for an age with `input()` and convert it with `int()`. If the student types something that is not a number, print `That is not a number.` and ask again. The runner types `abc` first, then `7`.',
    starter: `age = int(input())
print("You are", age)`,
    stdin: `abc
7`,
    check: {
      kind: 'stdout',
      expected: `That is not a number.
You are 7`,
    },
    hints: [
      '`int("abc")` raises `ValueError`. Wrap the `int(input())` line in `try:`.',
      'Put `int(input())` inside a `while True:` loop and `break` after it succeeds; print a message in `except ValueError:`.',
    ],
    solution: `while True:
    try:
        age = int(input())
        break
    except ValueError:
        print("That is not a number.")
print("You are", age)`,
  },
}

export default valueErrorIntInput
