// Visual concept: pictures as sprite images, from the W9 platformer.
// Source: game_dev/docs/2026_t3/slides/W9 - Platformer A Complete Level.md
// slides 31 to 33 and section E. The demo is the class visualizer, tab 2 (see
// t3-camera.js for where the file comes from).

const t3Pictures = {
  slug: 't3-pictures',
  title: 'Pictures as Sprites',
  subtitle: 'One load line replaces a Surface and a fill',
  recap:
    '`pygame.image.load("images/player/0.png")` gives you a **Surface**, the same kind of thing as `pygame.Surface((40, 60))`. So one line replaces two: the `Surface` line and the `fill` line both go, and the load line takes their place. The line after it does not change: `get_frect(midbottom=pos)` still builds the rect, it just takes its size from the picture, which is **64 × 64**. **The image is what you see. The rect is what the game uses.** Collisions, landing, the win check and the camera all read the rect, so swapping boxes for pictures changes how the game looks and nothing about how it plays. The rect covers the whole picture, see-through pixels included. The path is read relative to the folder the program runs from, which in VS Code is the folder you opened, so the `images` folder must sit next to your `.py` file.',

  demo: {
    kind: 'embed',
    config: {
      page: 'visualizers/w9-platformer.html',
      tab: 'pictures',
      title: 'Pictures visualizer',
      hint: 'Tick "Show the rect" to see what collisions use. Tick "Forget to delete fill(...)" to see the most common slip. Click "Desktop" in the folder panel to see the FileNotFoundError.',
    },
  },

  snippet: {
    code: `class Goal(pygame.sprite.Sprite):
    def __init__(self, pos, groups):
        super().__init__(groups)
        self.image = pygame.image.load("images/flag.png")  # was Surface + fill
        self.rect = self.image.get_frect(midbottom=pos)     # same line as before


# inside Player.__init__
self.image = pygame.image.load("images/player/0.png")  # was Surface + fill
self.rect = self.image.get_frect(midbottom=pos)         # now 64 x 64`,
  },

  commonMistake: {
    why: 'Running the game with the wrong folder open. The code is right, but Python stops on the first load with `FileNotFoundError: No file \'images/player/0.png\' found`. `"images/player/0.png"` is a path **relative** to the folder the program runs from. If VS Code has your Desktop or Downloads open, Python looks for `Desktop/images/player/0.png`, which does not exist.',
    code: `self.image = pygame.image.load("images/player/0.png")
# FileNotFoundError: No file 'images/player/0.png' found in working directory '/Users/you/Desktop'.`,
    fix: 'In VS Code choose File → Open Folder and open the folder that holds **both** the `.py` file and `images/`, then run again. If you unzipped the starter, that is the `week9` folder. Do not move the pictures or rename the folder: the path in the code has to match what is on disk.',
  },
}

export default t3Pictures
