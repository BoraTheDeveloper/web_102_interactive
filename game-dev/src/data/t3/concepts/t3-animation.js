// Visual concept: frame animation, from the W9 platformer.
// Source: game_dev/docs/2026_t3/slides/W9 - Platformer A Complete Level.md
// slides 34 to 36 and section E. The animation is the reference project's
// Player.animate (5 games/Platformer/Platform 2 animations/code/sprites.py)
// without the AnimatedSprite parent or import_folder. The demo is the class
// visualizer, tab 3 (see t3-camera.js for where the file comes from).

const t3Animation = {
  slug: 't3-animation',
  title: 'Frame Animation',
  subtitle: 'A list of pictures, a counter, and the remainder',
  recap:
    'Animation is a **flipbook**. The `images/player` folder holds three pictures, and showing them fast one after another makes the legs move. `self.frames` is a list of those three Surfaces. `self.frame_index` is a counter that grows by `10 * dt` while you walk: the same speed × time idea as movement, so 10 means ten pictures a second on every computer. Each frame picks one picture with `self.frames[int(self.frame_index) % len(self.frames)]`. `int(...)` chops off the decimals, because a list index must be a whole number. `%` is the remainder after dividing, so the counter loops: 3.5 becomes 3, and `3 % 3` is **0**, back to the first picture. Two rules sit on top. Standing still resets to picture 0, and in the air holds picture 1. Walking left flips the picture with `pygame.transform.flip`. `animate` runs at the **end** of `update`, because `direction.x` and `on_floor` are only right after movement and landing have run. All three pictures are 64 × 64, so the rect never changes.',

  demo: {
    kind: 'embed',
    config: {
      page: 'visualizers/w9-platformer.html',
      tab: 'anim',
      title: 'Animation visualizer',
      hint: 'Tick "Walk right by itself" and "Slow motion", then watch the counter and the % row. Press Jump to see the air pose. Try the speed slider: 2 is a stroll, 30 is panic.',
    },
  },

  snippet: {
    code: `# inside Player.__init__
self.frames = [
    pygame.image.load("images/player/0.png"),
    pygame.image.load("images/player/1.png"),
    pygame.image.load("images/player/2.png"),
]
self.frame_index = 0
self.flip = False
self.image = self.frames[0]

# last line of Player.update
self.animate(dt)

def animate(self, dt):
    if self.direction.x:
        self.frame_index += 10 * dt          # walking: count up
        self.flip = self.direction.x < 0     # walking left: face left
    else:
        self.frame_index = 0                 # standing: picture 0
    if not self.on_floor:
        self.frame_index = 1                 # in the air: picture 1
    self.image = self.frames[int(self.frame_index) % len(self.frames)]
    self.image = pygame.transform.flip(self.image, self.flip, False)`,
  },

  commonMistake: {
    why: 'Dropping the `% len(self.frames)`. The player walks fine for about a third of a second, then the game crashes with `IndexError: list index out of range`. The counter grows by 10 a second, so after 0.3 seconds `int(self.frame_index)` is 3, and the list only has `frames[0]`, `frames[1]` and `frames[2]`.',
    code: `    self.image = self.frames[int(self.frame_index)]  # no % : crashes at 3`,
    fix: 'Put `% len(self.frames)` back. The remainder loops 3 to 0, 4 to 1, 5 to 2, for ever. Use `len(self.frames)` rather than `3`, so a fourth picture added to the list later needs no other change.',
  },
}

export default t3Animation
