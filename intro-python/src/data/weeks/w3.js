export default {
  slug: 'w3',
  title: 'Week 3 · Control Structures',
  subtitle: 'if / elif / else, for loops, and while loops',
  summary: 'This week you learned how to make your programs **make decisions** and **repeat actions**. You used `if` / `elif` / `else` to branch your code based on conditions, `for` loops with `range()` to repeat a fixed number of times, and `while` loops to keep going until a condition becomes false.',
  keyPoints: [
    { heading: 'if / elif / else', body: 'Check conditions and run different code for each case. Only one branch runs, and conditions are checked top to bottom.' },
    { heading: 'for loops + range()', body: 'A `for` loop with `range()` repeats a block a set number of times. `range(10)` counts 0 to 9; `range(1, 20, 2)` counts odd numbers by stepping 2.' },
    { heading: 'range() arguments', body: '`range(start, stop, step)` lets you count up, count down, or skip numbers. The `stop` value is not included.' },
    { heading: 'while loops', body: 'A `while` loop keeps running as long as its condition is `True`. **Always update** the counter inside the loop so it eventually stops.' },
  ],
  code: `height = int(input("Enter height: "))
age = int(input("Enter age: "))

if height >= 140 and age >= 12:
    print("Welcome to the ride!")
else:
    print("Sorry, you're not there yet!")

num = int(input("Enter a number: "))

if num % 2 == 0:
    print("Even")
else:
    print("Odd")

temp = int(input("Enter a temperature: "))

if temp > 30:
    print("Wear a t-shirt")
elif temp >= 15 and temp <= 30:
    print("Wear a hoodie")
else:
    print("bring a coat")

for i in range(5):
    print("hello python")

for i in range(10):
    print(i)

for i in range(9, -1, 1):
    print(f"i = {i}")

for i in range(1, 20, 2):
    print(f"Odd = {i}")

i = 0
while i < 4:
    print("Learning while loop")
    i += 1

j = 0
while j <= 9:
    print(f"j = {j}")
    j += 1`,
  codeLang: 'python',
  related: [
    { slug: 'conditionals', label: 'Conditionals' },
    { slug: 'loops', label: 'Loops' },
    { slug: 'bug-infinite-loop', label: 'Infinite Loop Bug' },
    { slug: 'bug-outside-loop', label: 'Code Outside the Loop' },
  ],
  takeaways: [
    'You can use `if` / `elif` / `else` to make your program choose between different paths',
    'You can use a `for` loop with `range()` to repeat code a set number of times',
    'You can use a `while` loop to repeat until a condition becomes false, and remember to update the counter',
  ],
}
