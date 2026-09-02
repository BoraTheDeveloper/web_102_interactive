// Visual concept: Inheritance and Sprites, the W6 conversion.
// Source: game_dev/docs/2026_t3/slides/W6 - Sprites and Groups.md, slides 12 to 21.
// One analogy only: team and roster. The demo reproduces slide 15's silent
// bug (no super().__init__) and its sting (no self.image).
//
// T3's collision is spritecollide(..., False) plus hit.respawn(). Never copy
// the T2 collision-groups page, which teaches True and deletes the coin.

const t3Inheritance = {
  slug: 't3-inheritance',
  title: 'Inheritance and Sprites',
  subtitle: 'Start from a blueprint Pygame already wrote, then add your parts',
  recap:
    'Last week you wrote the whole `Player` blueprint yourself. This week you start from **Pygame\'s** blueprint, `pygame.sprite.Sprite`, and add your bits. That is **inheritance**: your class gets everything the parent can do, then adds its own. What the parent gives you is one thing: the ability to **join a team**. `super().__init__(groups)` is the line that puts this copy on the roster. A group is just a list, and `all_sprites.update(dt)` and `all_sprites.draw(screen)` walk that list. The team draws each member\'s `image` at its `rect`. One says what, the other says where.',

  demo: {
    kind: 'inheritance',
    config: {},
  },

  snippet: {
    code: `class Player(pygame.sprite.Sprite):      # start from Pygame's blueprint
    def __init__(self, x, y, groups):
        super().__init__(groups)         # put this copy on the team, first
        self.image = pygame.Surface((40, 40))   # what the team draws
        self.image.fill("dodgerblue")
        self.rect = self.image.get_frect(topleft=(x, y))  # where it draws it
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed * dt
        self.rect.clamp_ip(screen.get_frect())


all_sprites = pygame.sprite.Group()
coin_group = pygame.sprite.Group()
player = Player(380, 280, all_sprites)
coin = Coin((all_sprites, coin_group))   # two teams at once

while running:
    ...
    all_sprites.update(dt)               # was: player.update(dt)

    hits = pygame.sprite.spritecollide(player, coin_group, False)
    for hit in hits:
        score += 1
        hit.respawn()                    # False kept the coin, so move it

    screen.fill("midnightblue")
    all_sprites.draw(screen)             # was: player.draw(screen)
    pygame.display.update()`,
  },

  commonMistake: {
    why: 'Asking the wrong team. `spritecollide(player, all_sprites, False)` checks the player against every sprite in `all_sprites`. The player is in `all_sprites`. So the player collides with itself, every frame, and the score climbs forever with nobody touching anything.',
    code: `hits = pygame.sprite.spritecollide(player, all_sprites, False)
for hit in hits:
    score += 1        # fires every frame: the player found itself`,
    fix: 'Search the coins-only team: `spritecollide(player, coin_group, False)`. That is why the coin joined two groups. `all_sprites` decides what gets **drawn**. `coin_group` decides what can be **hit**.',
  },
}

export default t3Inheritance
