export default {
  slug: 'w6',
  title: 'Week 6 · Error Handling and Debugging',
  subtitle: 'try/except, ValueError, TypeError, and debugging with print() and type()',
  summary: 'This week you learned how to find and handle mistakes in your code. You met the **six common error types**, used `try` / `except` to catch errors without crashing, and practiced **debugging** with `print()` and `type()` to check that your values are what you expect.',
  keyPoints: [
    { heading: 'Common Error Types', body: 'You met six common errors: `SyntaxError`, `NameError`, `TypeError`, `ValueError`, `IndexError`, and `KeyError`. Knowing the name of an error tells you what went wrong.' },
    { heading: 'try / except', body: 'Wrap risky code in a `try` block. If it crashes, Python jumps to the matching `except` block instead of stopping your whole program.' },
    { heading: 'Multiple except blocks', body: 'You can catch different errors separately with `except ValueError:` and `except TypeError:`. A bare `except:` catches everything but is not recommended.' },
    { heading: 'Debugging with print() & type()', body: 'Use `print()` to see a value and `type()` to see its data type. This helps you check whether a value is what you expected before it causes a crash.' },
  ],
  code: `# Common Errors
# 1. SyntaxError      print("Hi)
# 2. NameError        print(scroe)
# 3. TypeError        print("Score: " + 10)
# 4. ValueError       int("cat")
# 5. IndexError       items[5] on a 2-item list
# 6. KeyError         player["HP"] (real key "hp")

# Debugging with print and type
price = input("Enter price: ")
print(type(price))   # <class 'str'>
print(price)         # 2.5

# try-except
try:
    age = int(input("Enter age: "))
    print("In 10 years you will be " + (age + 10))
except TypeError:
    print("Do not type a word")
except ValueError:
    print("Invalid input")
except:
    print("Unknown Error")

# Safe Input
try:
    num1 = int(input("Num 1: "))
    num2 = int(input("Num 2: "))
    result = num1 / num2
    print(f"Result: {result}")
except ValueError:
    print("Invalid input")
except ZeroDivisionError:
    print("Cannot divide by zero")`,
  codeLang: 'python',
  related: [
    { slug: 'tryexcept', label: 'try / except' },
    { slug: 'bug-valueerror-int-input', label: 'ValueError on int(input())' },
    { slug: 'bug-input-is-string', label: 'input() Returns a String' },
  ],
  takeaways: [
    'You can name the six common Python errors and recognize them when they happen',
    'You can use `try` / `except` to catch errors and keep your program running',
    'You can debug with `print()` and `type()` to check your values and their data types',
  ],
}
