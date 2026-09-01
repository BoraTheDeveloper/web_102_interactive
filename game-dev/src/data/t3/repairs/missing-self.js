// T3 repair. Source: W5 slide 18, the Four Missing Characters demo, and W5 §C.
// The marquee W5 bug: the crash never lands on the guilty line.

const missingSelf = {
  slug: 'repair-missing-self',
  title: 'AttributeError on a line that looks fine',
  game: 'Collector',
  symptom:
    "Python crashes with AttributeError: 'Player' object has no attribute 'rect'. It points at my draw line. I read that line ten times and it is spelled correctly, and the same line worked yesterday.",
  likelyCause:
    'A `self.` is missing in `__init__`. Writing `rect = pygame.FRect(x, y, 40, 40)` is a perfectly legal Python line, so `__init__` runs with no complaint. But without `self.` the name was only a local variable, and it vanished the moment `__init__` finished. The object never had a rect at all. The crash waits until something asks for one, which is why **the line Python blames is not the line that is wrong**.',
  whereToCheck: [
    'Read the error message first, slowly. It names the class and it names the missing attribute. That attribute name is what you go hunting for.',
    'Go to that class\'s `__init__` and read every line. Each piece of data the object needs to keep must start with self.',
    'Do not start editing the line the traceback points at. That line is the victim, not the cause.',
    'The same bug on speed instead of rect crashes later still, on the first arrow key rather than the first draw. Same cause, different timing.',
    'If instead you get IndentationError: expected an indented block, a `def` is at the wrong level. Methods sit one level in from `class`.',
  ],
  workingMeans:
    'The player square appears, moves with the arrows and stays on screen, and no AttributeError appears in the terminal.',
  trace: {
    code: `class Player:
    def __init__(self, x, y):
        rect = pygame.FRect(x, y, 40, 40)
        self.speed = 300

    def draw(self, surface):
        pygame.draw.rect(surface, "dodgerblue", self.rect)


player = Player(380, 280)

while running:
    screen.fill("midnightblue")
    player.draw(screen)
    pygame.display.update()`,
    sceneKind: 'collector',
    state: { frame: 0, player: null, rect: 'none', speed: 'none', crashed: false },
    inspector: (s) => [
      { label: 'player.rect', value: s.rect },
      { label: 'player.speed', value: s.speed },
      { label: 'status', value: s.crashed ? 'AttributeError' : 'running' },
    ],
    steps: [
      {
        lines: [10],
        label: '1 · stamp the object',
        desc: 'Player(380, 280) makes a blank object and hands it to __init__ as self. So far so good.',
      },
      {
        lines: [3],
        label: '2 · the guilty line runs, and it is fine',
        desc: 'rect = pygame.FRect(...) is legal Python. A box really is built. But the name rect is local to __init__, so nothing attaches it to the object.',
      },
      {
        lines: [4],
        label: '3 · this one sticks',
        desc: 'self.speed = 300 attaches speed to the object. Compare the two lines. Five characters apart.',
        delta: () => ({ 'player.speed': { from: 'none', to: '300' } }),
        apply: (s) => ({ ...s, speed: '300' }),
      },
      {
        lines: [10],
        label: '4 · __init__ ends and the box is thrown away',
        desc: 'Every local name inside __init__ disappears here, rect included. The object now has a speed and no rect. Python is still perfectly happy.',
      },
      {
        lines: [13],
        label: '5 · fill the screen',
        desc: 'Frame 1 starts normally. Still no error.',
        apply: (s) => ({ ...s, frame: 1 }),
      },
      {
        lines: [14, 7],
        label: '6 · player.draw(screen) asks for self.rect',
        desc: 'This is the first line that needs a rect. There is none. AttributeError, and the traceback points here, three lines and one whole method away from the mistake.',
        delta: () => ({ status: { from: 'running', to: 'AttributeError' } }),
        apply: (s) => ({ ...s, crashed: true }),
      },
    ],
  },
  checklist: [
    { id: 'ms-1', label: 'Read the AttributeError and write down the attribute it names', hint: 'The name in the quotes at the end of the message.' },
    { id: 'ms-2', label: 'Open the __init__ of the class it names', hint: 'Not the line in the traceback.' },
    { id: 'ms-3', label: 'Prefix every stored value with self.', hint: 'Four characters at the front of the assignment.' },
    { id: 'ms-4', label: 'Check the methods are indented inside the class', hint: 'Each `def` one level in from `class`.' },
    { id: 'ms-5', label: 'Re-run and confirm the player draws', hint: 'Working means the blue square is on screen and moves.' },
  ],
  fixCode: `class Player:
    def __init__(self, x, y):
        self.rect = pygame.FRect(x, y, 40, 40)   # self. is what makes it stick
        self.speed = 300

    def draw(self, surface):
        pygame.draw.rect(surface, "dodgerblue", self.rect)`,
}

export default missingSelf
