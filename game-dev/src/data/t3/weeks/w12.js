// Review by Week 12: Final Project Presentation.
//
// There is no W12 deck. The class is five talks of about five minutes each, a
// live demo in every one, and peer feedback after each. This page is the talk
// order and the feedback format, read before class, so it opens with W10
// (`unlocksWith`).
//
// Sources: the "Suggested Final Presentation Structure" in
// game_dev/docs/2026_t3/Course Syllabus - Game Development with Pygame.md
// (nine steps), W10 deck slides 13 and 15 (the twist test and its two-sentence
// frame), and the syllabus row for Week 12. Feedback format and the five-minute
// length were set by the instructor. No `code` and no `quiz`. Grade weights
// stay off the site on purpose.

const w12 = {
  slug: 'w12',
  title: 'Week 12 · Final Project Presentation',
  subtitle: 'Show your game, explain your twist, and give feedback',
  unlocksWith: 'w10',
  summary:
    'About five minutes each. You show your game running, say what your twist changes about playing it, and name one class in your code. After every talk, everyone else gives two stars and a wish. Rehearse with the list below and tick each step when you can do it without notes.',

  keyPoints: [
    {
      heading: 'Demo the floor live',
      body:
        'Play it, do not describe it. Move the player, meet the challenge, and reach the win or the lose on screen. If a bug shows up during the demo, say what you see and keep going. A game that runs with one bug beats a slide about a game.',
    },
    {
      heading: 'Say your twist as two sentences',
      body:
        'The same frame you wrote in Week 10: "Without it, the player would ___. With it, the player has to ___." If both sentences are about rules, the twist is real. If they are about colours or story, say what rule you changed instead.',
    },
    {
      heading: 'Name one class and what it owns',
      body:
        'Open your file on screen. Point at one class, say what it is a blueprint for, and what its `__init__` stores or its `update` does every frame. One class, explained well, is the whole point. You do not have to walk through the file.',
    },
    {
      heading: 'One bug you beat, one thing you would add',
      body:
        'Everyone hit something in Week 11. Say what broke, how you found it, and what fixed it. Then one honest sentence about what you would build with more time. Honest beats polished.',
    },
    {
      heading: 'Two stars and a wish',
      body:
        'After each talk, everyone gives the presenter **two things that worked** and **one thing to try**. Say it to the person, about the game, in a sentence each. "The jump felt good" is a star. "Make the enemy faster" is a wish. "It was nice" is neither.',
    },
  ],

  checklist: {
    title: 'Your five minutes, in order',
    lead: 'The nine steps from the syllabus. Tick each one when you can say it without reading.',
    items: [
      {
        id: 'w12-title',
        label: 'Game title and your name',
        hint: 'Ten seconds. Say it, then start the game so it is running behind you.',
      },
      {
        id: 'w12-idea',
        label: 'The idea and the objective',
        hint: 'One sentence: what the player is trying to do. The pitch formula from Week 7 works here.',
      },
      {
        id: 'w12-controls',
        label: 'Controls',
        hint: 'Which keys do what. Show them on screen while you say them.',
      },
      {
        id: 'w12-mechanic',
        label: 'The main mechanic',
        hint: 'The one verb from your plan: collect, jump, bounce. What happens every frame because of it.',
      },
      {
        id: 'w12-twist',
        label: 'Your twist, in two sentences',
        hint: 'Without it, the player would ___. With it, the player has to ___.',
      },
      {
        id: 'w12-class',
        label: 'Code structure: one class, on screen',
        hint: 'Point at the class line, then at its `__init__` or `update`. Say what it owns.',
      },
      {
        id: 'w12-challenge',
        label: 'One challenge you hit while building',
        hint: 'What broke, how you found it, what fixed it. Thirty seconds.',
      },
      {
        id: 'w12-demo',
        label: 'Live gameplay: move, challenge, win or lose',
        hint: 'Play to the end state. If it breaks, say what you see and carry on.',
      },
      {
        id: 'w12-improve',
        label: 'What you would improve with more time',
        hint: 'One sentence. The Could Add lane from your plan is a good place to look.',
      },
    ],
  },

  related: [{ slug: 't3-game-states', label: 'Game States' }],

  takeaways: [
    'You presented a working game, live, and reached its win or lose on screen.',
    'You explained your twist as a change to the rules, in two sentences.',
    'You gave feedback that names something specific: two stars and a wish.',
    'Twelve weeks: a Collector, a Platformer, Pong, and one game that is yours.',
  ],
}

export default w12
