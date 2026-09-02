// Week 6 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W6 - Quiz Questions.md, including the answer key.
// Traps: Q5, Q7, Q10.

const w6Quiz = {
  title: 'Week 6 check',
  intro: 'Ten questions on sprites, groups, `super().__init__(groups)` and `spritecollide`. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'Which parent class should `Player` and `Coin` inherit from?',
      options: [
        '`pygame.sprite.Sprite`',
        '`pygame.time.Clock`',
        '`pygame.Rect`',
        '`pygame.Surface`',
      ],
      answerIndex: 0,
      explanation: 'Custom Pygame sprites inherit from `pygame.sprite.Sprite`.',
    },
    {
      q: 'What does a Pygame sprite usually need so a group can draw it?',
      options: [
        '`caption` and `folder`',
        '`image` and `rect`',
        '`sound` and `speed` only',
        '`self.pos` **instead of** `rect`',
      ],
      answerIndex: 1,
      explanation: 'Group drawing expects `image` and `rect`. Sprites use `get_frect` (an FRect). There is no second `self.pos`.',
    },
    {
      q: 'What does `all_sprites.update(dt)` do?',
      options: [
        'Calls `update(dt)` on each sprite in the group',
        'Draws every sprite',
        'Adds the player to the group',
        'Checks collisions',
      ],
      answerIndex: 0,
      explanation: '`group.update(dt)` calls each sprite\'s `update` method. It does not draw.',
    },
    {
      q: 'What does `all_sprites.draw(screen)` do?',
      options: [
        'Calls `update(dt)` on each sprite',
        'Detects mouse clicks',
        'Fills the background',
        'Draws sprites in the group using their `image` and `rect`',
      ],
      answerIndex: 3,
      explanation: '`group.draw(screen)` blits each sprite\'s `image` at `rect`.',
    },
    {
      q: 'A `Player` is constructed but `super().__init__(groups)` is missing. Then `all_sprites.draw(screen)` runs. What do you see?',
      trap: true,
      options: [
        'The player draws normally',
        'The player object exists but is not in the group, so nothing draws it',
        '`SyntaxError`',
        'The player draws twice',
      ],
      answerIndex: 1,
      explanation: 'Skipping `super().__init__(groups)` means the sprite never joins the group. No error. It just never appears.',
    },
    {
      q: 'Which function checks whether the player hits coins in a group?',
      options: [
        '`pygame.quit()`',
        '`spritecollide()`',
        '`set_caption()`',
        '`colliderect()` on the group itself',
      ],
      answerIndex: 1,
      explanation: '`spritecollide()` checks a sprite against a group. A Group has no `.colliderect()`.',
    },
    {
      q: '`pygame.sprite.spritecollide(player, coins, True)` hits a coin. What does `True` mean?',
      trap: true,
      options: [
        'Draw the coin in yellow',
        'Delete the coin sprite from its groups',
        'Respawn the coin at a new position',
        'Ignore the collision',
      ],
      answerIndex: 1,
      explanation: 'The third argument is **dokill**. `True` removes the coin. The Collector\'s must-do is `False` plus `respawn()`.',
    },
    {
      q: 'Every sprite drawn by a group should have `self.image` and `self.rect`.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Without `image` and `rect`, group drawing will not know what and where to draw.',
    },
    {
      q: '`spritecollide()` can tell us when the player touches a coin.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: '`spritecollide()` is the group version of a collision check.',
    },
    {
      q: 'This order is correct: `all_sprites.draw(screen)`, then `screen.fill(...)`, then `pygame.display.update()`.',
      trap: true,
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'Fill **after** draw paints over every sprite. Fill, then draw, then update.',
    },
  ],
}

export default w6Quiz
