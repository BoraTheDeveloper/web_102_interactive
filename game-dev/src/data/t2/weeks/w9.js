// Review by Week 9: Final Space Shooter.
// Based on game_dev/space_shooter/w9_final.py — the complete game.

const w9 = {
  slug: 'w9',
  title: 'Week 9 · Final Space Shooter',
  subtitle: 'sprites, groups, timers, collisions, and a complete game',
  summary:
    'You assembled everything into the full Space Shooter game. Sprites are now `pygame.sprite.Sprite` subclasses (`Player`, `Star`, `Laser`, `Meteor`) added to `Group`s that update and draw in batch. A **custom timer event** spawns meteors on a schedule, `spritecollide()` handles laser-vs-meteor and player-vs-meteor hits, the score climbs with `pygame.time.get_ticks()`, and `pygame.mixer.Sound` adds laser and explosion audio.',
  keyPoints: [
    {
      heading: 'Sprite & Group',
      body: 'Each game object is a `pygame.sprite.Sprite` subclass with `image` and `rect`. Adding sprites to a `Group` lets you call `group.update(dt)` and `group.draw(surface)` for all of them at once instead of blitting each by hand.',
    },
    {
      heading: 'Custom timer event',
      body: '`pygame.event.custom_type()` creates a brand-new event type, and `pygame.time.set_timer(meteor_event, 500)` posts it every 500 ms. In the loop you catch it to spawn a new `Meteor`, giving a steady stream of enemies.',
    },
    {
      heading: 'Collision detection',
      body: '`pygame.sprite.spritecollide(sprite, group, True)` returns the sprites that overlap; the `True` also removes them from the group. Player-vs-meteor ends the game; laser-vs-meteor destroys both and plays a sound.',
    },
    {
      heading: 'Score & sound',
      body: 'The score is `pygame.time.get_ticks() // 100`, so it rises the longer you survive. `laser_sound.play()` and `explosion_sound.play()` add feedback for shooting and hits.',
    },
  ],
  code: `from os.path import join
from random import randint
import pygame

pygame.init()

WINDOW_WIDTH, WINDOW_HEIGHT = 1280, 720
BACKGROUND_COLOR = "#3a2e3f"
display_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Space Shooter")

# --- groups ---
all_sprites = pygame.sprite.Group()
meteor_sprites = pygame.sprite.Group()
laser_sprites = pygame.sprite.Group()

# --- assets ---
star_surf = pygame.image.load(join("images", "star.png")).convert_alpha()
meteor_surf = pygame.image.load(join("images", "meteor.png")).convert_alpha()
laser_surf = pygame.image.load(join("images", "laser.png")).convert_alpha()
font = pygame.font.Font(join("images", "Oxanium-Bold.ttf"), 40)
laser_sound = pygame.mixer.Sound(join("audio", "laser.wav"))
explosion_sound = pygame.mixer.Sound(join("audio", "explosion.wav"))


class Player(pygame.sprite.Sprite):
    def __init__(self, groups):
        super().__init__(groups)
        self.image = pygame.image.load(join("images", "player.png")).convert_alpha()
        self.rect = self.image.get_frect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2))
        self.direction = pygame.math.Vector2()
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        self.direction.x = int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])
        self.direction.y = int(keys[pygame.K_DOWN]) - int(keys[pygame.K_UP])
        if self.direction.length() > 0:
            self.direction = self.direction.normalize()
        self.rect.center += self.direction * self.speed * dt

        recent_keys = pygame.key.get_just_pressed()
        if recent_keys[pygame.K_SPACE]:
            Laser((all_sprites, laser_sprites), laser_surf, self.rect.midtop)
            laser_sound.play()


class Star(pygame.sprite.Sprite):
    def __init__(self, groups, surf):
        super().__init__(groups)
        self.image = surf
        self.rect = self.image.get_frect(
            center=(randint(0, WINDOW_WIDTH), randint(0, WINDOW_HEIGHT))
        )


class Laser(pygame.sprite.Sprite):
    def __init__(self, groups, surf, pos):
        super().__init__(groups)
        self.image = surf
        self.rect = self.image.get_frect(midbottom=pos)

    def update(self, dt):
        self.rect.y -= 400 * dt
        if self.rect.bottom < 0:
            self.kill()


class Meteor(pygame.sprite.Sprite):
    def __init__(self, groups, surf):
        super().__init__(groups)
        self.image = surf
        self.rect = self.image.get_frect(
            center=(randint(0, WINDOW_WIDTH), randint(-200, -100))
        )
        self.speed = randint(300, 500)

    def update(self, dt):
        self.rect.y += self.speed * dt
        if self.rect.top > WINDOW_HEIGHT:
            self.kill()


def collisions():
    global running
    if pygame.sprite.spritecollide(player, meteor_sprites, True):
        running = False
    for laser in laser_sprites:
        if pygame.sprite.spritecollide(laser, meteor_sprites, True):
            laser.kill()
            explosion_sound.play()


def display_score():
    score = pygame.time.get_ticks() // 100
    text_surf = font.render(str(score), True, (240, 240, 240))
    text_rect = text_surf.get_frect(midbottom=(WINDOW_WIDTH / 2, WINDOW_HEIGHT - 50))
    display_surface.blit(text_surf, text_rect)


# --- create sprites ---
for i in range(20):
    Star(all_sprites, star_surf)
player = Player(all_sprites)

# --- meteor spawn timer ---
meteor_event = pygame.event.custom_type()
pygame.time.set_timer(meteor_event, 500)

clock = pygame.time.Clock()
running = True

while running:
    dt = clock.tick(60) / 1000

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == meteor_event:
            Meteor((all_sprites, meteor_sprites), meteor_surf)

    all_sprites.update(dt)
    collisions()

    display_surface.fill(BACKGROUND_COLOR)
    all_sprites.draw(display_surface)
    display_score()
    pygame.display.update()

pygame.quit()`,
  codeLang: 'python',
  related: [
    { slug: 'game-loop', label: 'Game Loop' },
    { slug: 'sprite-groups', label: 'Sprite Groups' },
    { slug: 'timer-events', label: 'Timer Events' },
    { slug: 'collision-groups', label: 'Collision Groups' },
    { slug: 'repair-collision-fails', label: 'Collision Fails' },
    { slug: 'repair-score-resets', label: 'Score Resets' },
  ],
  takeaways: [
    'You can build a complete game with `Sprite` classes and `Group`s',
    'You can spawn enemies on a schedule using a custom timer event',
    'You can handle collisions between lasers, meteors, and the player',
    'You can add a live score and sound effects to polish the game',
  ],
}

export default w9
