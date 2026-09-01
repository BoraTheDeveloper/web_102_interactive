// T3 repair. Source: W1 slide 18, the Update Twist.

const blackWindow = {
  slug: 'repair-black-window',
  title: 'My window is black',
  game: 'Any',
  symptom:
    'The window opens and stays open. The X button works. But the window is black, even though I have a fill line with a colour in it. There is no error.',
  likelyCause:
    '`pygame.display.update()` is missing. Everything you draw goes onto a **hidden working copy** first, not onto the monitor. `update()` is the line that flips that copy onto the screen. Without it every fill and every draw runs perfectly and nobody ever sees the result. Python has no reason to complain, so you get no error to follow.',
  whereToCheck: [
    'Look for `pygame.display.update()` inside the loop, as the last line of the frame. If it is not there, that is the bug.',
    'If it is there, check its indentation. Outside the loop it runs once, after the window has already closed.',
    'Check it is not above the drawing lines. Anything drawn after update waits for the next frame.',
    'If the window is black only sometimes, check `fill` is inside the loop too, not just above it.',
  ],
  workingMeans:
    'The window shows the colour you named in fill, and it keeps showing it until you close the window.',
  checklist: [
    { id: 'bw-1', label: 'Fill the screen inside the loop', hint: 'A method on screen, with a colour name in quotes.' },
    { id: 'bw-2', label: 'Call the display update at the end of the frame', hint: 'Something on `pygame.display`, with empty brackets.' },
    { id: 'bw-3', label: 'Check both lines sit at the same indentation, inside the loop', hint: 'Same number of spaces as the `for event` line.' },
    { id: 'bw-4', label: 'Confirm nothing is drawn after the update line', hint: 'Update is the last line of the frame, not the middle.' },
  ],
  fixCode: `while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill("darkblue")
    pygame.display.update()   # without this, the fill never reaches the screen`,
}

export default blackWindow
