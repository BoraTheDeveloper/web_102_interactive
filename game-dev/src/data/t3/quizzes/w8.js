// Week 8 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W8 - Quiz Questions.md, including the answer key.
// Traps: Q1, Q3.

const w8Quiz = {
  title: 'Week 8 check',
  intro: 'Ten questions on gravity, jumping and landing on a platform. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'Landing sets `self.rect.bottom = platform.rect.top` but **does not** set `self.direction.y = 0`. What happens?',
      trap: true,
      options: [
        'The player sits on the platform forever',
        'The player sits for a moment, then tunnels through, because fall speed is still growing',
        'The player launches upward',
        '`spritecollide` raises an error',
      ],
      answerIndex: 1,
      explanation: 'Snapping the box without zeroing the speed is the sinking demo: stand, then sink. Both `rect.bottom = platform.rect.top` **and** `direction.y = 0` are required.',
    },
    {
      q: 'What does gravity do to the player each frame?',
      options: [
        'Pulls the player downward by growing `direction.y`',
        'Sets `direction.y` to a fixed positive number once',
        'Only runs when no keys are held',
        'Moves `direction.x`',
      ],
      answerIndex: 0,
      explanation: 'Gravity pulls the player down each frame by adding to `direction.y`. A one-time set is a lift, not a fall.',
    },
    {
      q: 'Start at `direction.y = 0`, `rect.y = 0`, `GRAVITY = 1`. After **3** frames, `rect.y` is:',
      code: `direction.y += GRAVITY
rect.y += direction.y`,
      trap: true,
      options: [
        '`3`',
        '`6`',
        '`1`',
        '`0`',
      ],
      answerIndex: 1,
      explanation: 'Frame 1: y-speed 1, y = 1. Frame 2: speed 2, y = 3. Frame 3: speed 3, y = 6. The total is 1 + 2 + 3, not 3.',
    },
    {
      q: 'When should the player be allowed to jump?',
      options: [
        'Any time Space is held, including in mid-air',
        'Only while a coin is collected',
        'When standing on the ground or a platform (`on_floor`)',
        'Only if `direction.y` is already negative',
      ],
      answerIndex: 2,
      explanation: 'A normal jump is allowed only when `on_floor` is True. Double jump is a later bonus.',
    },
    {
      q: '`JUMP` is `-16`. Which line actually jumps?',
      options: [
        '`self.direction.y = JUMP`',
        '`self.direction.y += JUMP`',
        '`self.direction.x = JUMP`',
        '`self.rect.y = JUMP`',
      ],
      answerIndex: 0,
      explanation: 'Jump **sets** an upward speed (`JUMP` is negative because y grows downward). `+= JUMP` stacks on repeat taps and launches the player.',
    },
    {
      q: 'What should happen when the player lands on a platform?',
      options: [
        'The player falls through and leaves the screen',
        'Only `rect.bottom` is snapped, and `direction.y` keeps growing',
        'Downward movement stops (`direction.y = 0`) and the feet sit on the platform top',
        '`on_floor` is set True once in `__init__` and never touched again',
      ],
      answerIndex: 2,
      explanation: 'On landing, stop the fall and place the feet on `platform.rect.top`.',
    },
    {
      q: 'Where should gravity be applied?',
      options: [
        'Once before the game loop, then never again',
        'Inside the player\'s `update`, every frame',
        'Only on the frame Space is pressed',
        'In the `Platform` class',
      ],
      answerIndex: 1,
      explanation: 'Gravity is part of the player\'s update and runs every frame.',
    },
    {
      q: 'Gravity should be added once before the game loop and never again.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'Gravity is applied every frame, not only once at setup.',
    },
    {
      q: 'In the must-do Platformer, the player can jump only when on the ground.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Double jump is a later bonus. The must-do jump needs ground.',
    },
    {
      q: 'This week\'s Platformer uses a camera that follows the player across many screens.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'This Platformer is one screen. There is no camera.',
    },
  ],
}

export default w8Quiz
