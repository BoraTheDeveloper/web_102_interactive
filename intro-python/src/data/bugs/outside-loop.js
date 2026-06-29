// Bug: statement accidentally dedented out of a loop. Plain data.
// A line that should run each iteration is outside the loop, so it runs once.

const outsideLoop = {
  slug: 'bug-outside-loop',
  title: 'Bug: statement outside the loop',

  brokenCode: `names = ["Ana", "Ben", "Mo"]
for name in names:
    print("Hi " + name)
print("---")`,

  expected: 'Print `Hi <name>` then `---` for every name.',
  actual:
    'It prints Hi Ana, Hi Ben, Hi Mo, then a single `---` at the end. `print("---")` is dedented out of the loop, so it runs once after the loop instead of after each name.',

  trace: {
    code: `names = ["Ana", "Ben", "Mo"]
for name in names:
    print("Hi " + name)
print("---")`,
    state: { names: [], name: '—', output: [] },
    inspector: (s) => [
      { label: 'name', value: s.name },
      { label: 'output', value: (s.output || []).join('\n') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · names = ["Ana", "Ben", "Mo"]',
        desc: 'A list of three names to greet.',
        apply: (s) => ({ ...s, names: ['Ana', 'Ben', 'Mo'] }),
      },
      {
        lines: [2, 3],
        label: '2 · first name: print "Hi Ana"',
        desc: 'name becomes "Ana" and the loop body prints "Hi Ana".',
        apply: (s) => ({ ...s, name: 'Ana', output: [...s.output, 'Hi Ana'] }),
      },
      {
        lines: [2, 3],
        label: '3 · next names: "Hi Ben", "Hi Mo"',
        desc: 'The loop repeats for Ben and Mo, printing each greeting.',
        apply: (s) => ({ ...s, name: 'Mo', output: [...s.output, 'Hi Ben', 'Hi Mo'] }),
      },
      {
        lines: [4],
        label: '4 · print("---") runs only once',
        desc: 'Line 4 is dedented out of the loop, so it runs a single time after the loop — not after each name.',
        apply: (s) => ({ ...s, output: [...s.output, '---'] }),
      },
    ],
  },

  fix: {
    hint: 'Indent `print("---")` so it sits inside the loop body, directly under `print("Hi " + name)`.',
    solution: `names = ["Ana", "Ben", "Mo"]
for name in names:
    print("Hi " + name)
    print("---")`,
  },

  challenge: {
    title: 'Mini challenge',
    prompt:
      'Print `Hi <name>` then `---` for every name. Right now `print("---")` is dedented out of the loop, so the separator only prints once at the end. Indent it back inside the loop.',
    starter: `names = ["Ana", "Ben", "Mo"]
for name in names:
    print("Hi " + name)
print("---")`,
    check: {
      kind: 'stdout',
      expected: `Hi Ana
---
Hi Ben
---
Hi Mo
---`,
    },
    hints: [
      'Line 4 is not indented, so Python runs it after the loop instead of inside it.',
      'Add 4 spaces in front of `print("---")` so it lines up with `print("Hi " + name)`.',
    ],
    solution: `names = ["Ana", "Ben", "Mo"]
for name in names:
    print("Hi " + name)
    print("---")`,
  },
}

export default outsideLoop
