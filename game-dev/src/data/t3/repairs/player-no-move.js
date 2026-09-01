// T3 repair. Source: W3 Exercise 2 and W5 §C. Two forms: the loose-variable
// version from W3 and the class version from W5.

const playerNoMove = {
  slug: 'repair-player-no-move',
  title: 'My player will not move',
  game: 'Collector',
  symptom:
    'I press the arrow keys and the player sits exactly where it started. No error, no flicker, nothing. Other things on screen look right.',
  likelyCause:
    'The key is being read but nothing is ever **written back**. Reading `keys[pygame.K_RIGHT]` only asks a question. Something inside the `if` has to change the position. There are two common shapes. Before Week 5, the movement changes a loose `player_x` but the draw call uses a different variable. From Week 5 on, the movement is inside `Player.update` and the loop never calls it.',
  whereToCheck: [
    'Inside each movement if, check there is a line that actually changes the rect or the x and y you draw with.',
    'Check the draw call uses the same name the movement changed. Moving player_x while drawing at start_x looks identical to not moving.',
    'From Week 5: check the loop calls `player.update(dt)` every frame. Defining a method does not run it.',
    'From Week 5: check the movement writes to `self.rect`, not to a plain local name inside update.',
    'Check `clamp_ip` is not running before the movement. Placed first it undoes nothing, but placed with the wrong rect it can pin the player in place.',
  ],
  workingMeans:
    'All four arrow keys move the player, it stops flush at each of the four edges, and it stops the moment you let go.',
  checklist: [
    { id: 'pnm-1', label: 'Take a key snapshot inside the loop', hint: 'A method on `pygame.key`, assigned to a variable.' },
    { id: 'pnm-2', label: 'Change the position inside each movement if', hint: 'Use `-=` and `+=` on the rect, remembering y grows down.' },
    { id: 'pnm-3', label: 'Draw using the same rect the movement changed', hint: 'One rect per object is the rule. No second copy.' },
    { id: 'pnm-4', label: 'Call the update method from the loop, once per frame', hint: 'Object, dot, method name, and dt in the brackets.' },
    { id: 'pnm-5', label: 'Write to self.rect inside update, not to a bare name', hint: 'Without `self.` the change is thrown away when update ends.' },
  ],
  fixCode: `class Player:
    def __init__(self, x, y):
        self.rect = pygame.FRect(x, y, 40, 40)
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.rect.x -= self.speed * dt
        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed * dt
        if keys[pygame.K_UP]:
            self.rect.y -= self.speed * dt
        if keys[pygame.K_DOWN]:
            self.rect.y += self.speed * dt
        self.rect.clamp_ip(screen.get_frect())


player = Player(380, 280)

# in the loop, every frame:
player.update(dt)`,
}

export default playerNoMove
