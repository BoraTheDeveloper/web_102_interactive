// Skill: Functions. Plain data — no app logic lives here.
// Trace style: line -> variable change -> output.

const functions = {
  slug: 'functions',
  title: 'Functions',
  subtitle: 'define, call, parameters, and return',
  meaning:
    'A **function** is a named block of code you can run on demand. You **define** it once with `def`, then **call** it by name. Parameters let you pass data in, and `return` sends a value back to the caller so it can be stored or used.',

  example: {
    code: `def greet(name):
    print("Hello " + name)

greet("Ada")`,
  },

  trace: {
    code: `def add_bonus(score):
    return score + 10

new_score = add_bonus(50)
print(new_score)`,
    state: { score: null, new_score: null, output: [] },
    inspector: (s) => [
      { label: 'score', value: s.score === null ? '—' : s.score },
      { label: 'new_score', value: s.new_score === null ? '—' : s.new_score },
      { label: 'output', value: (s.output || []).join('\
') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · def add_bonus(score)',
        desc: 'Define the function. It takes one parameter, score, and its body returns score + 10. Nothing runs yet.',
      },
      {
        lines: [4],
        label: '2 · new_score = add_bonus(50)',
        desc: 'Call add_bonus and pass 50. The argument 50 is copied into the parameter score.',
        apply: (s) => ({ ...s, score: 50 }),
      },
      {
        lines: [2],
        label: '3 · return score + 10',
        desc: 'Inside the function: 50 + 10 = 60. This value is sent back to the caller.',
      },
      {
        lines: [4],
        label: '4 · call returns 60',
        desc: 'The call finishes, so new_score becomes 60. The local parameter score disappears.',
        apply: (s) => ({ ...s, new_score: 60, score: null }),
      },
      {
        lines: [5],
        label: '5 · print(new_score)',
        desc: 'Print the value of new_score: 60.',
        apply: (s) => ({ ...s, output: [...s.output, '60'] }),
      },
    ],
  },

  commonMistake: {
    why: 'A function that `print`s a value does **not** give it back to the caller — it returns `None`. The caller then ends up with `None` instead of the result.',
    code: `def add(a, b):
    print(a + b)

result = add(2, 3)
print(result)`,
    fix: 'Replace `print(a + b)` with `return a + b`. `print` only shows the value on the screen; `return` hands it back so `result` can hold it.',
  },

  practice: [
    {
      id: 'functions-predict-1',
      type: 'predict',
      title: 'Predict the output',
      prompt: 'What does this print? Remember what a function gives back when it uses return.',
      code: `def double(x):
    return x * 2

print(double(4))`,
      expected: '8',
    },
    {
      id: 'functions-bugfix-1',
      type: 'bugfix',
      title: 'Change print into return',
      prompt:
        'The function should give back the square so the caller can use it, but `answer` ends up as `None`. Fix the function.',
      starter: `def square(n):
    print(n * n)

answer = square(5)
print("answer is " + str(answer))`,
      check: { kind: 'stdout', expected: 'answer is 25' },
      hints: [
        'A function that `print`s a value does not give it back to the caller — it returns `None`.',
        'Change `print(n * n)` to `return n * n` so the value goes back to the caller.',
      ],
      solution: `def square(n):
    return n * n

answer = square(5)
print("answer is " + str(answer))`,
    },
  ],

  feynman: [
    {
      q: 'What is the difference between print and return inside a function?',
      a: 'print shows a value on the screen but gives back None. return sends a value to the caller so it can be stored or used in an expression.',
    },
    {
      q: 'What is a parameter?',
      a: 'A variable listed in the def line that receives a value when the function is called. The value you pass in is copied into the parameter.',
    },
    {
      q: 'What happens if a function has no return statement?',
      a: 'It returns None by default, so storing its result gives you None.',
    },
  ],
}

export default functions
