// Visual concept: Keyboard and Mouse Input.
// Source: game_dev/docs/2026_t3/slides/W3 - Handling User Input.md.

const input = {
  slug: 'input',
  title: 'Keyboard and Mouse Input',
  subtitle: 'Events happen once, key state is true the whole time',
  recap:
    'There are two ways to read input and they answer different questions. An **event** is a thing that happened once: a click, the moment a key went down. `pygame.key.get_pressed()` is a **snapshot of right now**: which keys are held down this frame. Use events for one-off actions, and key state for movement.',

  demo: {
    kind: 'input',
    config: {
      caption:
        'Click the canvas first. Left: each Space press counts once, however long you hold it. Right: hold the left or right arrow and the square moves every frame until you let go. Hold both and direction goes back to 0, because the two checks cancel.',
    },
  },

  snippet: {
    code: `while running:
    # Events: things that happened since the last frame.
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            player_x, player_y = event.pos   # where the click landed

    # Key state: what is held down right now, this frame.
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player_x -= player_speed
    if keys[pygame.K_RIGHT]:
        player_x += player_speed`,
  },

  commonMistake: {
    why: 'Calling `pygame.key.get_pressed()` once **before** the loop. It returns a snapshot, not a live link. Taken before the loop, that snapshot is "nothing is pressed" forever, so the player never moves. There is no error, which is what makes it hard to find.',
    code: `keys = pygame.key.get_pressed()   # taken once, before the loop

while running:
    if keys[pygame.K_RIGHT]:      # still the old snapshot, always False
        player_x += player_speed`,
    fix: 'Take a fresh snapshot every frame: `keys = pygame.key.get_pressed()` goes **inside** the loop, above the movement `if`s.',
  },
}

export default input
