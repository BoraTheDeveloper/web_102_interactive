// T3 repair. Source: W4 §C and W4 quiz Q6 and Q10.

const itemSpawnsOffScreen = {
  slug: 'repair-item-spawns-off-screen',
  title: 'My item spawns half off screen',
  game: 'Collector',
  symptom:
    'The item respawns fine most of the time, but every so often it lands clipped by the right or bottom edge and I can only see a sliver of it. Sometimes it is completely gone and I cannot reach it.',
  likelyCause:
    '`randint(0, WIDTH)` picks the item\'s **top left corner**, not its centre and not its right edge. So a result of 795 puts a 30 pixel wide item from 795 to 825, and the window stops at 800. The largest safe corner is the window width minus the item\'s own width.',
  whereToCheck: [
    'Look at the two randint calls. The upper bound has to subtract the item size, not just the window size.',
    'Use the rect\'s own width and height rather than typing 30 twice. Change the item size later and it still works.',
    'Check you use WIDTH with x and HEIGHT with y. Swapping them puts the item off the bottom in a tall window.',
    'Check `from random import randint` is at the top of the file. Missing it gives a NameError, not this symptom, but it is the same line.',
  ],
  workingMeans:
    'The item respawns fully inside the window every single time, including in the corners, and you can always reach it.',
  checklist: [
    { id: 'isos-1', label: 'Import randint at the top of the file', hint: 'A `from ... import ...` line, not a plain import.' },
    { id: 'isos-2', label: 'Pick a new x with randint', hint: 'Two arguments: the low bound and the high bound.' },
    { id: 'isos-3', label: 'Subtract the item width from the upper x bound', hint: 'Read the width off the rect rather than typing the number.' },
    { id: 'isos-4', label: 'Do the same for y with HEIGHT and the item height', hint: 'Same shape, the other pair of names.' },
  ],
  fixCode: `from random import randint

item_rect = pygame.FRect(200, 150, 30, 30)

# on a catch:
item_rect.x = randint(0, WIDTH - item_rect.width)
item_rect.y = randint(0, HEIGHT - item_rect.height)`,
}

export default itemSpawnsOffScreen
