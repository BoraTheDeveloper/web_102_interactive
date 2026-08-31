// Space Shooter repair: the window opens then closes immediately. Based on the
// while running loop + event queue in game_dev/space_shooter/w9_final.py.

const windowOpens = {
  slug: 'repair-window-opens-closes',
  title: 'My window opens then closes',
  symptom:
    'I run my Pygame file and a black window flashes on the screen for a split second, then the program ends and the window is gone.',
  likelyCause:
    'The code after `pygame.display.set_mode(...)` runs **once** and then the program finishes. There is no `while running:` loop, so Pygame never keeps the window open. Or the loop exists but it never calls `pygame.event.get()`, so Pygame thinks the app is not responding and the script just ends.',
  whereToCheck: [
    'Look for a `while running:` loop that wraps your drawing code. Without it the script runs top to bottom and exits.',
    'Inside the loop, confirm there is a `for event in pygame.event.get():` block that checks `pygame.QUIT`.',
    'Make sure `running = True` is set BEFORE the loop starts, and `running = False` only happens on QUIT.',
    'Confirm `pygame.display.update()` is called at the END of each loop pass, otherwise nothing appears on screen.',
  ],
  checklist: [
    { id: 'woc-1', label: 'Set up the window before the loop', hint: 'pygame.display.set_mode((WIDTH, HEIGHT)) then set_caption(...).' },
    { id: 'woc-2', label: 'Add running = True before the loop', hint: 'This flag keeps the loop alive until the player quits.' },
    { id: 'woc-3', label: 'Write while running: as the main loop', hint: 'Everything per-frame (events, update, draw) goes indented inside it.' },
    { id: 'woc-4', label: 'Poll events with for event in pygame.event.get()', hint: 'Check event.type == pygame.QUIT and set running = False.' },
    { id: 'woc-5', label: 'Call pygame.display.update() at the end of each frame', hint: 'Without this the finished frame is never pushed to the monitor.' },
  ],
  fixCode: `display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Space Shooter")

running = True
while running:
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    display_surface.fill(BACKGROUND_COLOR)
    pygame.display.update()

pygame.quit()`,
}

export default windowOpens
