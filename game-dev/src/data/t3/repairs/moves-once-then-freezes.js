// T3 repair. Source: W3 slide 14, the Snapshot Twist.

const movesOnceThenFreezes = {
  slug: 'repair-moves-once-then-freezes',
  title: 'My player moves once then freezes',
  game: 'Any',
  symptom:
    'I hold the arrow key and the player either never moves at all, or twitches one step and stops. The window is fine, the X button works, and there is no error.',
  likelyCause:
    '`pygame.key.get_pressed()` is being called **outside** the loop. It gives you a snapshot of the keyboard at the moment it runs, not a live link to it. Taken once before the loop, that snapshot says "nothing is pressed" and it says that forever, so the movement `if`s are False on every frame.',
  whereToCheck: [
    'Find the `keys = pygame.key.get_pressed()` line. It has to be inside the loop, above the movement ifs.',
    'Check the indentation, not just the position. A line at zero indentation is outside the loop even if it looks like it is in the middle of the file.',
    'If the player moves one step per press instead of smoothly, the movement is in the event loop under KEYDOWN. Move it out and use key state instead.',
    'Confirm the movement ifs read from that same keys variable and not from an older one.',
  ],
  workingMeans:
    'Holding an arrow key moves the player smoothly and continuously, and it stops the moment you let go.',
  checklist: [
    { id: 'motf-1', label: 'Take a fresh key snapshot every frame', hint: 'One line, inside the loop, below the event loop.' },
    { id: 'motf-2', label: 'Put the movement ifs after that line', hint: 'They read the snapshot, so they come after it.' },
    { id: 'motf-3', label: 'Keep continuous movement out of the event loop', hint: 'Events are for one-off actions, key state is for holding.' },
    { id: 'motf-4', label: 'Check both lines are indented inside the while loop', hint: 'Same level as the `for event` line.' },
  ],
  fixCode: `while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()   # a NEW snapshot, every frame

    if keys[pygame.K_LEFT]:
        player_x -= player_speed
    if keys[pygame.K_RIGHT]:
        player_x += player_speed`,
}

export default movesOnceThenFreezes
