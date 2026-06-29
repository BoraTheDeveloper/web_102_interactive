export default {
  slug: 'w4',
  title: 'Week 4 · Introduction to Functions',
  subtitle: 'def, parameters, return, defaults, and keyword arguments',
  summary: 'This week you learned how to package reusable code into **functions**. You defined functions with `def`, passed in **parameters**, returned values with `return`, and used **default** and **keyword** arguments to make functions flexible. You also built a small program that combines two functions together.',
  keyPoints: [
    { heading: 'def + calling', body: 'Define a function with `def name():` and run it by calling `name()`. The code inside only runs when you call it.' },
    { heading: 'Parameters', body: 'Put a name in the parentheses to receive a value: `def greet_player(name):`. Pass the value when you call it, like `greet_player("Bruno")`.' },
    { heading: 'return vs print', body: '`print()` shows a value on screen; `return` hands a value back to the caller so you can store or use it. Use `return` when you need the result.' },
    { heading: 'Defaults & keyword args', body: 'Give a parameter a default value, then call with keywords to skip ahead, like `show_damage(dmg=50, spell="Fireball")`.' },
  ],
  code: `def say_hello():
    print("Hello")

say_hello()

def announce():
    print("Welcome to class")
    print("We will learn HTMl")

announce()

def greet_player(name):
    print(f"Hello {name}, welcome to the game")

greet_player("Bruno")

def show_damage(spell='Thunder', dmg=20):
    print(f"{spell} deals {dmg} damage")

show_damage("Fireball", 50)
show_damage(dmg=50, spell="Fireball")
show_damage("Ice shards")
show_damage(dmg=40)

def add_bonus(score):
    return score + 10

new_score = add_bonus(50)
print("New score is: " + str(new_score))

def double(number):
    return number * 2

print(double(7))

result = double(7)
print(result)

def calculate_dmg(base, bonus):
    return base + bonus

def show_spell_card(name, total):
    print("-----Spell Card-----")
    print(f"Spell: {name}")
    print(f"Total Damage: {total}")

name = input("Spell name: ")
base = int(input("Base damage: "))
bonus = int(input("Bonus damage: "))

damage = calculate_dmg(base, bonus)
show_spell_card(name, damage)`,
  codeLang: 'python',
  related: [
    { slug: 'functions', label: 'Functions' },
    { slug: 'bug-prints-vs-returns', label: 'print vs return' },
    { slug: 'bug-score-resets', label: 'Score Keeps Resetting' },
  ],
  takeaways: [
    'You can define a function with `def` and call it by name to run its code',
    'You can pass values into a function using parameters and get values out using `return`',
    'You can use default and keyword arguments to make your functions more flexible',
  ],
}
