// T3 repair. Source: W1 §C and Exercise 2.

const windowOpensCloses = {
  slug: 'repair-window-opens-closes',
  title: 'My window opens then closes',
  game: 'Any',
  symptom:
    'I run the file. A window flashes on screen for a split second and disappears, and the terminal is already back at a prompt. No error message.',
  likelyCause:
    'There is no `while` loop holding the program open. A Python file runs top to bottom and then ends, and when the program ends the window goes with it. `set_mode` opens a window, it does not keep one. The **loop** is what keeps it.',
  whereToCheck: [
    'Look for a `while running:` line between `set_mode` and `pygame.quit()`. If there is none, that is the whole bug.',
    'If the loop is there, check that `running = True` is set before it. A loop whose condition starts False never runs even once.',
    'Check the indentation of `pygame.quit()`. Indented inside the loop it runs on frame one, which looks the same from outside.',
    'Check nothing sets `running = False` unconditionally inside the loop, outside the QUIT check.',
  ],
  workingMeans:
    'The window stays open until you click the X, and then the terminal comes back to a prompt with no error.',
  checklist: [
    { id: 'woc-1', label: 'Set a flag to True before the loop', hint: 'One line: a variable named running.' },
    { id: 'woc-2', label: 'Open a while loop on that flag', hint: '`while` plus the variable, then a colon.' },
    { id: 'woc-3', label: 'Put the event loop, fill and update inside it', hint: 'Everything that happens every frame is indented one level in.' },
    { id: 'woc-4', label: 'Keep pygame.quit() flush left, after the loop', hint: 'Zero indentation, below the loop body.' },
  ],
  fixCode: `import pygame

pygame.init()

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("My First Game")

running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill("darkblue")
    pygame.display.update()

pygame.quit()`,
}

export default windowOpensCloses
