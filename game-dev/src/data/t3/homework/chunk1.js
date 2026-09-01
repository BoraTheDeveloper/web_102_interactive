// Pong homework, chunk 1 of 5. Set after Week 5.
// Source: game_dev/docs/2026_t3/homeworks/W5 - Pong Chunk 1.md
//
// `rescueCode` is starters/pong_chunk1.py verbatim. It is the complete answer,
// so the page holds it back until the week it is handed out in class.

const chunk1 = {
  slug: 'pong-1',
  title: 'Pong 1 · Window and Paddle',
  chunk: 1,
  setAfter: 'w5',
  rescueAfter: 'w6',
  file: 'pong.py',

  goal:
    "Build a new Pong window with a `Paddle` class. Tonight is last week's Player, with two directions instead of four.",

  building:
    'Make a new file called `pong.py`. Open a window, stamp one `Paddle`, and move it up and down with the arrow keys. The paddle has to stay on screen. No ball yet.',

  requirements: [
    {
      id: 'p1-class',
      label: 'A `Paddle` class with `__init__` and `update(dt)`',
      hint: "Same three parts as the Player you built in class: the class line, an `__init__` that stores the box and the speed, and a method that runs every frame.",
    },
    {
      id: 'p1-move',
      label: 'The paddle moves with Up and Down',
      hint: 'Two keys this time, not four. Up makes y smaller, because y grows down the screen.',
    },
    {
      id: 'p1-clamp',
      label: '`clamp_ip`, or your own edge check, keeps it on screen',
      hint: 'One line, and it goes last inside `update`. It corrects what the movement just did, so it cannot run first.',
    },
    {
      id: 'p1-quit',
      label: 'The window still closes on X',
      hint: 'The event loop from Week 1. Nothing new, but it is the thing people forget in a fresh file.',
    },
    {
      id: 'p1-save',
      label: 'Saved as `pong.py`',
      hint: 'Chunk 2 starts from this exact file, so keep it somewhere you will find it.',
    },
  ],

  workingMeans: `python pong.py
A tall paddle sits on the left. Arrow keys move it. It cannot leave the top or bottom.
Clicking X closes the window with no red text.`,

  optional: 'Change the paddle colour or width. Do not add a ball yet.',

  related: [
    { slug: 'classes', label: 'Classes and Objects' },
    { slug: 'delta-time', label: 'Delta Time' },
    { slug: 'repair-player-no-move', label: 'My player will not move' },
    { slug: 'repair-player-too-fast', label: 'My player is too fast or too slow' },
  ],

  rescueCode: `import pygame

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong")
clock = pygame.time.Clock()


class Paddle:
    def __init__(self):
        self.rect = pygame.FRect(40, HEIGHT // 2 - 50, 12, 100)
        self.speed = 400

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_UP]:
            self.rect.y -= int(self.speed * dt)
        if keys[pygame.K_DOWN]:
            self.rect.y += int(self.speed * dt)
        self.rect.clamp_ip(screen.get_frect())


paddle = Paddle()
running = True
while running:
    dt = clock.tick(60) / 1000
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    paddle.update(dt)

    screen.fill("black")
    pygame.draw.rect(screen, "white", paddle.rect)
    pygame.display.update()

pygame.quit()`,
}

export default chunk1
