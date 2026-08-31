// Review by Week 1: Introduction to Pygame.
// Source: game_dev/docs/2026_t3/slides/W1 - Introduction to Pygame.md (section E).

const w1 = {
  slug: 'w1',
  title: 'Week 1 · Introduction to Pygame',
  subtitle: 'pygame.init(), set_mode, the game loop, fill and update',
  summary:
    'You opened your first Pygame window. The `while` loop you already know from Intro to Python is the game loop. Only what goes inside it changed. You called `pygame.init()`, made a window with `pygame.display.set_mode()`, kept it alive with a loop that reads events, painted the background with `screen.fill()`, showed it with `pygame.display.update()`, and closed down with `pygame.quit()`.',
  keyPoints: [
    {
      heading: 'init() first, then the window',
      body: '`pygame.init()` starts every Pygame module. It has to run before `pygame.display.set_mode((800, 600))`, or the window call fails. `set_caption` puts your own text in the title bar. Watch the double brackets in `set_mode((800, 600))`: the size is one pair of numbers, so it needs its own set.',
    },
    {
      heading: 'The game loop is a while loop you already know',
      body: 'A `while running:` loop runs the same steps over and over until something sets `running = False`. Without a loop the program reaches the end, quits, and the window vanishes instantly.',
    },
    {
      heading: 'Events are messages',
      body: 'Pygame collects everything that happens into a pile. `for event in pygame.event.get()` reads that pile once per frame. When `event.type == pygame.QUIT` the student clicked the X, so you set `running = False` and the loop ends.',
    },
    {
      heading: 'fill paints, update shows',
      body: '`screen.fill("darkblue")` paints the background, but you will not see it yet. `pygame.display.update()` is what puts your painting on the monitor. Delete it and the window opens black with **no error at all**, which is the single most common Week 1 bug.',
    },
    {
      heading: 'pygame.QUIT and pygame.quit() are different things',
      body: '`pygame.QUIT` is the name of an event, the message that says the window was closed. `pygame.quit()` is a function that shuts Pygame down. It goes flush left, after the loop. Indent it inside the loop and Pygame shuts down on frame one.',
    },
  ],
  code: `import pygame

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
  codeLang: 'python',
  related: [
    { slug: 'game-loop', label: 'Game Loop' },
    { slug: 'repair-black-window', label: 'My window is black' },
    { slug: 'repair-window-opens-closes', label: 'My window opens then closes' },
  ],
  takeaways: [
    'You can open a Pygame window and give it your own title',
    'You can keep a window alive with a game loop and close it cleanly on the X',
    '`display.update()` is what puts your painting on the monitor. Without it nothing shows and nothing errors',
    'You can say why `pygame.QUIT` and `pygame.quit()` are not the same thing',
  ],
}

export default w1
