// Review by Week 11: Final Project Work Session.
//
// There is no W11 deck and there will not be one. The class is a build session:
// students open the file they named on their W10 plan and work down their own
// checklist. So this page is not a recap. It is the build order, read before
// class, and it opens with W10 (`unlocksWith`).
//
// Sources: W10 deck slides 17, 18 and 28 (guardrails, the floor, "bring your
// signed plan"), the three-lane strategy in
// game_dev/docs/Project Choice and OOP Recommendation.md, and the syllabus row
// for Week 11. No `code` and no `quiz`: nothing was taught, nothing to check.

const w11 = {
  slug: 'w11',
  title: 'Week 11 · Final Project Work Session',
  subtitle: 'Build, debug and polish your own game from your plan',
  unlocksWith: 'w10',
  summary:
    'Nobody is taught anything new this week. You open the file you named on your plan, read box 1 of your checklist, and build it. Your signed plan is the contract: a brand new idea on the day still means building the planned one. The list below is the same boxes, so tick them here as they work.',

  keyPoints: [
    {
      heading: 'Open your own file, not a blank one',
      body:
        'Your plan names the file: your Collector, your Platformer or your Pong. That file already has a window, a loop, a player and a class. Starting blank throws away eight weeks of working code.',
    },
    {
      heading: 'The floor comes first',
      body:
        'By Week 12 your game must at least do three things: the player **moves**, there is **one challenge**, there is **one win or lose**. Build those three before anything else. Then the twist. Then polish, if there is time.',
    },
    {
      heading: 'Your twist is a rule, not a colour',
      body:
        'The eyes-closed test from Week 10: if a classmate hears only your rules, can they tell your game from the class version? New pictures, new colours or a new story alone fail the test. A new rule, a new threat or a new way to win passes it.',
    },
    {
      heading: 'Stuck is normal, guessing is not',
      body:
        'Red text: read the **last** line first, then find the line number it names. No red text but wrong behaviour: the Repair Center pages below cover the ten most common ones. Still stuck after two minutes: ask. Two minutes, not twenty.',
    },
    {
      heading: 'Ship the floor and cut the polish',
      body:
        'The four guardrails from Week 10 still hold: **one player, one verb, one challenge, one end condition**. If the clock is running out, the floor and the twist ship. Extra levels, sound and menus do not.',
    },
  ],

  checklist: {
    title: 'Your build order',
    lead: 'Same boxes as your signed plan. Work top to bottom, and tick each one only when you have seen it run.',
    items: [
      {
        id: 'w11-window',
        label: 'The window opens and closes on X',
        hint: 'Week 1. If this is broken, nothing else can be tested. Fix it first.',
      },
      {
        id: 'w11-move',
        label: 'The player moves',
        hint: 'Weeks 3 and 5. Keys in, position changes, `dt` keeps the speed the same on every machine.',
      },
      {
        id: 'w11-challenge',
        label: 'One object or challenge is on screen',
        hint: 'Weeks 6 and 8. A coin, a platform, a ball or an enemy. One is enough to start.',
      },
      {
        id: 'w11-collide',
        label: 'Touching it does something',
        hint: 'Weeks 4 and 6. `colliderect` or `spritecollide`. The something can be as small as `score += 1`.',
      },
      {
        id: 'w11-end',
        label: 'One win or lose shows on screen',
        hint: 'Weeks 7 and 9. A `state` change plus one `font.render`. The game must stop being playable when it ends.',
      },
      {
        id: 'w11-twist',
        label: 'Your twist is in and changes what the player does',
        hint: 'Week 10. Play it and say the two sentences: without it the player would ___, with it the player has to ___.',
      },
      {
        id: 'w11-polish',
        label: 'Then, and only then, one polish item from your Should Improve list',
        hint: 'Better visuals, a start screen, sound, more items. Pick one. If you get here with time left, pick another.',
      },
    ],
  },

  related: [
    { slug: 't3-game-states', label: 'Game States' },
    { slug: 'repair-window-opens-closes', label: 'My window opens then closes' },
    { slug: 'repair-black-window', label: 'My window is black' },
    { slug: 'repair-nothing-draws', label: 'Nothing I draw shows up' },
    { slug: 'repair-player-no-move', label: 'My player will not move' },
    { slug: 'repair-moves-once-then-freezes', label: 'My player moves once then freezes' },
    { slug: 'repair-player-too-fast', label: 'My player is too fast or too slow' },
    { slug: 'repair-collision-fails', label: 'My collision never fires' },
    { slug: 'repair-score-resets', label: 'My score keeps resetting' },
    { slug: 'repair-item-spawns-off-screen', label: 'My item spawns half off screen' },
    { slug: 'repair-missing-self', label: 'AttributeError on a line that looks fine' },
  ],

  takeaways: [
    'You built from your own plan and your own file, not from a blank page or a shared example.',
    'The floor ran first: move, one challenge, one win or lose. Polish came after, or not at all.',
    'Your twist changes a rule of the game, and you can say what it changes in two sentences.',
    'When it broke, you read the last line of the red text, checked the Repair Center, then asked.',
  ],
}

export default w11
