// Space Shooter repair: meteors never appear. Based on the custom timer event
// in game_dev/space_shooter/w9_final.py.

const meteorNoSpawn = {
  slug: 'repair-meteor-no-spawn',
  title: 'Meteors never spawn',
  symptom:
    'I run the game and the player can move and shoot, but no meteors ever fall from the top of the screen. The screen just stays empty.',
  likelyCause:
    'There is no timer event creating meteors. w9_final.py uses `meteor_event = pygame.event.custom_type()` then `pygame.time.set_timer(meteor_event, 500)`, and inside the event loop `if event.type == meteor_event: Meteor(...)`. If any of those three pieces is missing, no meteor is ever made.',
  whereToCheck: [
    'Confirm you registered a custom event type: meteor_event = pygame.event.custom_type().',
    'Confirm you started the timer: pygame.time.set_timer(meteor_event, 500) (500 means every half second).',
    'Inside for event in pygame.event.get(), look for if event.type == meteor_event: and create a Meteor there.',
    'Make sure the Meteor is added to (all_sprites, meteor_sprites) so it draws and can collide.',
  ],
  checklist: [
    { id: 'mns-1', label: 'Register a custom event type', hint: 'meteor_event = pygame.event.custom_type()' },
    { id: 'mns-2', label: 'Start the timer before the loop', hint: 'pygame.time.set_timer(meteor_event, 500)' },
    { id: 'mns-3', label: 'Handle the event in the event loop', hint: 'if event.type == meteor_event: Meteor(...)' },
    { id: 'mns-4', label: 'Add the Meteor to both groups', hint: 'Meteor((all_sprites, meteor_sprites), meteor_surf)' },
    { id: 'mns-5', label: 'Make Meteor.update move and kill off-screen meteors', hint: 'self.rect.y += self.speed * dt; kill when past the bottom.' },
  ],
  fixCode: `# before the loop:
meteor_event = pygame.event.custom_type()
pygame.time.set_timer(meteor_event, 500)

# inside the loop, in for event in pygame.event.get():
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == meteor_event:
            Meteor((all_sprites, meteor_sprites), meteor_surf)`,
}

export default meteorNoSpawn
