// Skill: Dictionaries. Plain data — no app logic lives here.
// Trace style: line -> variable change -> output.

const dictionaries = {
  slug: 'dictionaries',
  title: 'Dictionaries',
  subtitle: 'key / value pairs you look up by name',
  meaning:
    'A **dictionary** stores values under **keys** inside `{ }`. You look a value up with `dict[key]` instead of a numeric index. Assigning to a key that already exists updates it; assigning to a brand-new key creates it. Dictionaries are mutable.',

  example: {
    code: `hero = {"name": "Link", "hp": 100}
print(hero["hp"])
hero["coins"] = 20
print(hero["coins"])`,
  },

  trace: {
    code: `player = {"name": "Dora", "hp": 50}
print(player["name"])
player["level"] = 10
print(player["level"])`,
    state: { player: null, output: [] },
    inspector: (s) => [
      {
        label: 'player',
        value:
          s.player === null
            ? '—'
            : '{' + Object.entries(s.player).map(([k, v]) => "'" + k + "': " + v).join(', ') + '}',
      },
      { label: 'output', value: (s.output || []).join('\
') || '—' },
    ],
    steps: [
      {
        lines: [1],
        label: '1 · player = {"name": "Dora", "hp": 50}',
        desc: 'Create a dictionary with two keys: "name" maps to "Dora" and "hp" maps to 50.',
        apply: (s) => ({ ...s, player: { name: 'Dora', hp: 50 } }),
      },
      {
        lines: [2],
        label: '2 · print(player["name"])',
        desc: 'Look up the key "name" — it returns "Dora" — and print it.',
        apply: (s) => ({ ...s, output: [...s.output, 'Dora'] }),
      },
      {
        lines: [3],
        label: '3 · player["level"] = 10',
        desc: '"level" is not already a key, so this creates it and sets it to 10.',
        apply: (s) => ({ ...s, player: { ...s.player, level: 10 } }),
      },
      {
        lines: [4],
        label: '4 · print(player["level"])',
        desc: 'Look up the new key "level" — it returns 10 — and print it.',
        apply: (s) => ({ ...s, output: [...s.output, '10'] }),
      },
    ],
  },

  commonMistake: {
    why: 'Looking up a key that is not in the dictionary raises a **KeyError**. The `[ ]` lookup only works for keys that exist.',
    code: `hero = {"name": "Link"}
print(hero["hp"])`,
    fix: 'Use `hero.get("hp")` (returns None if the key is missing) or check `"hp" in hero` first. You can also give a default: `hero.get("hp", 0)`.',
  },

  practice: [
    {
      id: 'dicts-predict-1',
      type: 'predict',
      title: 'Predict the output',
      prompt: 'What does this print? One value is read, then a new key is added and read.',
      code: `pet = {"name": "Rex", "age": 3}
print(pet["age"])
pet["trick"] = "sit"
print(pet["trick"])`,
      expected: '3\nsit',
    },
    {
      id: 'dicts-bugfix-1',
      type: 'bugfix',
      title: 'Avoid the KeyError',
      prompt:
        'This crashes with a `KeyError` because `"font"` is not a key. Look it up safely and print the default value `"default"` when the key is missing.',
      starter: `config = {"theme": "dark"}
print(config["font"])`,
      check: { kind: 'stdout', expected: 'default' },
      hints: [
        'Accessing a missing key with `[ ]` raises KeyError.',
        'Use `config.get("font", "default")` — it returns the second argument when the key is missing.',
      ],
      solution: `config = {"theme": "dark"}
print(config.get("font", "default"))`,
    },
  ],

  feynman: [
    {
      q: 'How is a dictionary different from a list?',
      a: 'A list is indexed by position (0, 1, 2...). A dictionary is indexed by keys you choose, so you look values up by name instead of by number.',
    },
    {
      q: 'What happens when you assign to a key that already exists?',
      a: 'The old value is replaced with the new one — the key is updated, not duplicated.',
    },
    {
      q: 'How do you look up a key that might not exist without crashing?',
      a: 'Use dict.get(key). It returns None if the key is missing, or dict.get(key, default) to return a default you choose.',
    },
  ],
}

export default dictionaries
