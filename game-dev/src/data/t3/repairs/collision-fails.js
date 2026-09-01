// T3 repair. Source: W4 Exercise 3 and W4 §C.

const collisionFails = {
  slug: 'repair-collision-fails',
  title: 'My collision never fires',
  game: 'Collector',
  symptom:
    'I drive the player right through the item and nothing happens. The score stays put and the item never moves. No error.',
  likelyCause:
    'Usually the check is comparing the wrong two rects. The most common shape is a **stale copy**: the item rect was built from loose `item_x` and `item_y` once, before the loop, so the rect on screen and the rect in the check are two different boxes. The other shape is that `colliderect` is called but its `if` body is empty or the body sits outside the `if`.',
  whereToCheck: [
    'Check you have exactly one rect per object and everything uses it. Drawing from a rect while colliding against loose x and y is the classic version of this.',
    'Check the two names in the check are different objects. A rect compared against itself is always True, which is the opposite symptom but the same mistake.',
    'Check the body of the if is indented under it. A `score += 1` at the same level as the if runs every frame instead of on a hit.',
    'Check the rects are the size you think. `pygame.FRect(380, 280, 40, 40)` starts at 380, it is not centred there, so the box may be 20 pixels from where you pictured it.',
    'Check edges that only touch. Two rects sharing an edge do not overlap, so colliderect is False.',
  ],
  workingMeans:
    'Walking the player into the item makes the score go up by one and the item jump somewhere new, every time.',
  checklist: [
    { id: 'cf-1', label: 'Build one FRect per object, before the loop', hint: 'Four numbers: x, y, width, height.' },
    { id: 'cf-2', label: 'Move that same rect in the movement code', hint: 'Change `.x` and `.y` on the rect itself.' },
    { id: 'cf-3', label: 'Draw that same rect', hint: 'Pass the rect straight to `pygame.draw.rect`, not four numbers.' },
    { id: 'cf-4', label: 'Compare the two different rects in the if', hint: 'A method on one rect, with the other rect in the brackets.' },
    { id: 'cf-5', label: 'Indent the score and respawn under the if', hint: 'One level deeper than the if line.' },
  ],
  fixCode: `player_rect = pygame.FRect(380, 280, 40, 40)
item_rect = pygame.FRect(200, 150, 30, 30)

# in the loop:
    player_rect.x += player_speed          # the SAME rect moves

    if player_rect.colliderect(item_rect): # two DIFFERENT rects
        score += 1
        item_rect.x = randint(0, WIDTH - item_rect.width)
        item_rect.y = randint(0, HEIGHT - item_rect.height)

    pygame.draw.rect(screen, "dodgerblue", player_rect)   # the SAME rect draws
    pygame.draw.rect(screen, "gold", item_rect)`,
}

export default collisionFails
