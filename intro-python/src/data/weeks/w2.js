export default {
  slug: 'w2',
  title: 'Week 2 · Variables and Data Types',
  subtitle: 'Variables, ints, floats, strings, booleans, and arithmetic',
  summary: 'This week you learned how to **store information** in variables and work with different **data types**: integers (`int`), decimals (`float`), text (`str`), and true/false values (`bool`). You practiced **arithmetic** operators, used `and`/`or` with booleans, and converted between types using `int()`.',
  keyPoints: [
    { heading: 'Variables', body: 'A variable is a named box that stores a value. Use `=` to assign it: `health = 100`. You can update it later with `+=` to add to it.' },
    { heading: 'Data Types', body: 'Python has `int` (whole numbers), `float` (decimals), `str` (text in quotes), and `bool` (`True` / `False`). Use `type()` to check what something is.' },
    { heading: 'Arithmetic', body: 'Use `+`, `-`, `*`, `/` for math. The result type depends on the numbers, so `2026 - year` gives an `int`.' },
    { heading: 'Type Conversion', body: 'Wrap a value in `int()` to turn it into a whole number, e.g. `int(input(...))` so you can do math with what the user typed.' },
    { heading: 'Booleans', body: 'A `bool` is `True` or `False`. Combine them with `and` / `or`: `can_open = has_key and is_level_10`.' },
  ],
  code: `burger = 5.50
buy = 3
total = burger * 3
print(f"Your total is {total}")

has_key = True
is_level_10 = False

can_open = has_key and is_level_10
print(can_open)

first_name = "Master"
last_name = "Chief"

print(f"{first_name} {last_name}")

pi = 3.14
print(int(pi))

print(5 > 3)

year = int(input("When do you born? "))
age = 2026 - year
days = age * 365
print(f"You are {age} years old which is {days} days!")

name = 'Dzo'
health = 100
attack_power = 1000
print(f"Welcome {name}, you have {health}!")
attack_power += 25
print(f"Your new power is {attack_power}")`,
  codeLang: 'python',
  related: [
    { slug: 'conditionals', label: 'Conditionals' },
    { slug: 'bug-input-is-string', label: 'input() Returns a String' },
  ],
  takeaways: [
    'You can store values in variables and update them with `=` and `+=`',
    'You can tell apart `int`, `float`, `str`, and `bool` and convert between them with `int()`',
    'You can do arithmetic and use `and` / `or` to combine boolean conditions',
  ],
}
