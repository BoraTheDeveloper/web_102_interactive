export default {
  slug: 'w5',
  title: 'Week 5 · Data Structures',
  subtitle: 'Lists and dictionaries, append, keys, values, and items',
  summary: 'This week you learned how to store **collections** of data. You used **lists** to keep ordered items and access them by index, and **dictionaries** to store key-value pairs. You also learned how to add items with `append()`, update dictionary values, and loop through both structures.',
  keyPoints: [
    { heading: 'Lists & indexing', body: 'A list holds ordered items in square brackets. Indexing starts at `0`, and you can count backwards with negative indices like `[-1]` for the last item.' },
    { heading: 'append()', body: 'Add a new item to the end of a list with `inventory.append("Crossbow")`.' },
    { heading: 'Dictionaries', body: 'A dictionary stores key-value pairs in curly braces. Look up a value with its key: `player["name"]`.' },
    { heading: 'Updating a dict', body: 'Assigning to an existing key updates it: `player["hp"] = 100`. Assigning to a brand-new key creates it: `player["level"] = 10`.' },
    { heading: 'Looping a dict', body: 'Use `.items()` to get both keys and values, `.keys()` for keys only, and `.values()` for values only.' },
  ],
  code: `inventory = ['Potion', 'Sword', 'Shield']

print(inventory[0])   # Potion
print(inventory[1])   # Sword
print(inventory[2])   # Shield
print(inventory[-1])  # Shield

inventory.append('Crossbow')

for item in inventory:
    print(f"- {item}")

player = {
    "name": "Dora",
    "hp": 50,
    "coins": 20
}

print(player)
print(player['name'])   # Dora
print(player['coins'])  # 20

player["hp"] = 100
player["hp"] = player["hp"] + 100
player['level'] = 10
print(player)

for key, value in player.items():
    print(f"{key}: {value}")

for key in player:
    print(key)

for value in player.values():
    print(value)`,
  codeLang: 'python',
  related: [
    { slug: 'lists', label: 'Lists' },
    { slug: 'dictionaries', label: 'Dictionaries' },
    { slug: 'bug-index-out-of-range', label: 'Index Out of Range' },
    { slug: 'bug-key-error', label: 'KeyError' },
  ],
  takeaways: [
    'You can store ordered items in a list and access them by index (starting at 0)',
    'You can store key-value pairs in a dictionary and update or add keys by assignment',
    'You can loop through a list with `for item in list` and a dictionary with `.items()`, `.keys()`, or `.values()`',
  ],
}
