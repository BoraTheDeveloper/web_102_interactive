export default {
  slug: 'w1',
  title: 'Week 1 · Intro to Python & Basic Syntax',
  subtitle: 'print(), input(), f-strings, and your first variables',
  summary: 'This week you wrote your very first Python programs. You learned how to **display text** on the screen with `print()`, how to **ask the user for input** with `input()`, and how to combine text and variables together using **f-strings**. These three tools are the foundation of every Python program you will write from here on out.',
  keyPoints: [
    { heading: 'print()', body: 'Use `print()` to display text on the screen. Whatever you put inside the parentheses gets shown to the user.' },
    { heading: 'input()', body: 'Use `input()` to get text from the user. The string inside the parentheses becomes the prompt they see, and `input()` always gives you back a **string**.' },
    { heading: 'f-strings', body: 'Put an `f` before your string and use `{curly braces}` to drop a variable right into the text, like `print(f"Hi {name}")`.' },
  ],
  code: `name = input("What is ur name ")
print(f"Nice to meet you {name}")

print(f"Wow {name} is a cool name!")
print(f"Oh no, {name} smells like old cheese!")

color = input("What is your favorite color? ")
print(f"Your favorite color is {color}")`,
  codeLang: 'python',
  related: [
    { slug: 'bug-input-is-string', label: 'input() Returns a String' },
  ],
  takeaways: [
    'You can use `print()` to display output to the screen',
    'You can use `input()` to ask the user for text and store it in a variable',
    'You can use f-strings like `f"Hi {name}"` to mix variables into your text',
  ],
}
