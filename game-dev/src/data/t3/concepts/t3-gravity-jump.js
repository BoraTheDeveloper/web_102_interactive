// Visual concept: Gravity and Jump, the W8 platformer.
// Source: game_dev/docs/2026_t3/slides/W8 - Platformer Gravity and Jump.md
// slides 8, 16 to 19 and section E. GRAVITY = 3600, JUMP = -960, MOVE = 300,
// all per second, so every position line is multiplied by dt. The demo
// reproduces slide 19: delete `self.direction.y = 0` on landing and the player
// stands, then falls through.

const t3GravityJump = {
  slug: 't3-gravity-jump',
  title: 'Gravity and Jump',
  subtitle: 'A speed that grows, a jump that only fires from the floor',
  recap:
    'Gravity is not a speed. It is a **speed that grows**. Each frame `direction.y` gains `GRAVITY * dt`, and `rect.y` moves by `direction.y * dt`. At 60 fps with `GRAVITY = 3600` px/s² that is +60 px/s per frame: after one second the fall is 3600 px/s and the player has covered about **1800 px**, not 3600. The `dt` is what makes that the same fall on every computer - a slow frame adds a bigger slice of speed and moves a bigger step, in the same proportion. A jump sets `direction.y = JUMP`, a negative number because y grows down, then gravity eats it. Landing does **three jobs**: **snap** the feet to the platform top, **stop** the speed, **remember** you are standing with `on_floor`. Miss any one and the game breaks a different way.',

  demo: {
    kind: 'gravityJump',
    config: {},
  },

  snippet: {
    code: `GRAVITY = 3600
JUMP = -960
MOVE = 300

class Player(pygame.sprite.Sprite):
    def __init__(self, pos, groups, platforms):
        super().__init__(groups)
        self.platforms = platforms
        self.image = pygame.Surface((40, 60))
        self.image.fill("tomato")
        self.rect = self.image.get_frect(midbottom=pos)
        self.direction = pygame.Vector2()
        self.on_floor = False

    def update(self, dt):
        # 1. keys and jump
        keys = pygame.key.get_pressed()
        self.direction.x = int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])
        self.rect.x += self.direction.x * MOVE * dt
        if keys[pygame.K_SPACE] and self.on_floor:
            self.direction.y = JUMP

        # 2. gravity: the speed itself grows, by this frame's slice of time
        self.direction.y += GRAVITY * dt
        # 3. move down by that speed, for that same slice of time
        self.rect.y += self.direction.y * dt

        # 4. land: three jobs
        self.on_floor = False
        hits = pygame.sprite.spritecollide(self, self.platforms, False)
        for platform in hits:
            if self.direction.y >= 0:
                self.rect.bottom = platform.rect.top   # snap
                self.direction.y = 0                   # stop
                self.on_floor = True                   # remember`,
  },

  commonMistake: {
    why: 'Deleting the second job, `self.direction.y = 0`. The player lands and stands, apparently fine, for about a second. Then it drops straight through the ground and is gone. The snap kept yanking the feet back each frame, so it looked like standing. But `direction.y` never stopped growing: it gains `GRAVITY * dt` every frame, for ever. By frame 80 the step `direction.y * dt` is taller than the ground is thick, the player goes from above it to fully below it in one frame, and `spritecollide` finds nothing to snap to.',
    code: `        for platform in hits:
            if self.direction.y >= 0:
                self.rect.bottom = platform.rect.top
                # self.direction.y = 0    <-- deleted
                self.on_floor = True`,
    fix: 'Put `self.direction.y = 0` back. A thicker ground only buys time. Standing still means speed zero, and landing is the only place the code can say so.',
  },
}

export default t3GravityJump
