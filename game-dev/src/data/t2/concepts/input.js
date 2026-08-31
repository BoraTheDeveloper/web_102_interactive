// Visual concept: Input. Demo compares event-based KEYDOWN (fires once per
// press) with continuous key-state get_pressed (True while held). Grounded
// in game_dev/space_shooter/w9_final.py (get_pressed for move, shoot on press).

const input = {
  slug: 'input',
  title: 'Input',
  subtitle: 'Events for taps, state for holds',
  recap:
    'Pygame has two kinds of input. **Events** (`pygame.KEYDOWN` in the event loop) fire once per key press -- good for single-shot actions like shooting. **Key state** (`pygame.key.get_pressed()`) is True the whole time a key is held -- good for smooth movement.',

  demo: {
    kind: 'input',
    config: {
      caption:
        'Click the canvas first. Left: KEYDOWN fires once per Space press (right for shooting). Right: get_pressed() stays True while you hold Right (right for smooth movement).',
    },
  },

  snippet: {
    code: `# Continuous movement: read key STATE every frame (held -> moves smoothly)
keys = pygame.key.get_pressed()
if keys[pygame.K_RIGHT]:
    player.rect.x += 5

# Single-shot action: respond to a KEYDOWN EVENT (fires once per press)
for event in pygame.event.get():
    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
        Laser((all_sprites, laser_sprites), laser_surf, player.rect.midtop)`,
  },

  commonMistake: {
    why: 'Using `KEYDOWN` for movement makes the sprite jump once and then freeze until you re-press, because the event fires only on the initial press. Using `get_pressed()` for shooting fires every frame the key is held, producing a solid beam instead of single lasers.',
    code: `# BUG: KEYDOWN for movement -> only one step per press, not while held
for event in pygame.event.get():
    if event.type == pygame.KEYDOWN and event.key == pygame.K_RIGHT:
        player.rect.x += 5  # janky: one tiny jump, then nothing until re-press

# BUG: get_pressed for shooting -> fires every frame the key is held
keys = pygame.key.get_pressed()
if keys[pygame.K_SPACE]:
    Laser(...)  # a new laser EVERY frame -> a solid beam, not single shots`,
    fix: 'Use `pygame.key.get_pressed()` for movement (smooth while held) and `KEYDOWN` events (or `pygame.key.get_just_pressed()`) for one-shot actions like shooting.',
  },
}

export default input
