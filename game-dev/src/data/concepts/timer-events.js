// Visual concept: Timer Events. pygame.time.set_timer pushes a custom
// event into the queue at a regular interval. Based on the meteor spawn
// timer in game_dev/space_shooter/w9_final.py.

const timerEvents = {
  slug: 'timer-events',
  title: 'Timer Events',
  subtitle: 'Schedule things to happen on a clock',
  recap:
    'Sometimes you want something to happen at a regular interval — spawn a meteor every 500 ms, say. `pygame.time.set_timer(event, interval)` pushes a custom event into the queue at that interval. Inside your event loop you check for it just like `QUIT` or `KEYDOWN`.',

  demo: {
    kind: 'timerEvents',
    config: {
      caption:
        'Slide the timer to change the spawn interval. A shorter interval means more frequent meteors. This is exactly how pygame.time.set_timer(meteor_event, 500) works in the final Space Shooter.',
    },
  },

  snippet: {
    code: `# 1. Create a custom event type
meteor_event = pygame.event.custom_type()

# 2. Tell Pygame to fire it every 500 ms
pygame.time.set_timer(meteor_event, 500)

# 3. Check for it in the event loop
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == meteor_event:
            Meteor((all_sprites, meteor_sprites), meteor_surf)`,
  },

  commonMistake: {
    why: 'Checking for the timer event with `pygame.key.get_pressed()` or inside the update step instead of the **event loop**. Timer events arrive in `pygame.event.get()`, not in the key state.',
    code: `# WRONG: timer events are NOT keys
keys = pygame.key.get_pressed()
if keys[meteor_event]:  # TypeError!
    Meteor(...)`,
    fix: 'Check for custom timer events inside `for event in pygame.event.get()`, the same place you check for `QUIT` and `KEYDOWN`.',
  },
}

export default timerEvents
