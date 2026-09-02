// Review by Week 10: Final Project Planning.
// Source: game_dev/docs/2026_t3/slides/W10 - Final Project Planning.md
//
// A planning week. No code was written in class, so this page has no `code` field.
// The deck's section E is a filled worked plan, and it is deliberately not
// reproduced here: a shared example turns into five copies of the same game.

import quiz from '../quizzes/w10.js'

const w10 = {
  slug: 'w10',
  title: 'Week 10 · Final Project Planning',
  subtitle: 'Structure, twist, scope guardrails, and a first-build checklist',
  summary:
    'No code this week. You designed instead. For six weeks you were told what to build, and this week you decided: which of the three skeletons you are starting from, what your twist is, and how small it has to be to actually finish. The plan you signed is what you build from in Week 11, so the work today was making it small enough to be real.',
  keyPoints: [
    {
      heading: 'You keep the skeleton, you change the rules',
      body: 'A game design is not a burst of inspiration. It is a small number of decisions, and each one has a right-sized answer. You already have the skeleton from Week 7: loop, `dt`, input, classes, collisions, score, states. None of that changes for your project. What changes is the rules you hang on it. Nobody starts from a blank file.',
    },
    {
      heading: 'Pick a structure you already built',
      body: 'Collector-style is move, touch a thing, score goes up. Platformer-style is gravity, jump, reach a goal. Pong-style is paddles, bounce, score to win. A mashup of two is allowed and is often good, but a mashup counts as **both** the structure and the twist. You reuse your own file from that week, so your Week 11 starter is code you already understand.',
    },
    {
      heading: 'A twist changes what the player does, not what they see',
      body: 'Here is the test: if you close your eyes and someone only tells you the rules, can you tell their game apart from the class version? A new rule, a new threat, or a new way to win or lose all pass. New colours, a new story, or the same game with different pictures all fail. Turning the coins into cats is a new **look**, not a new **game**. Re-skinning is encouraged on top of a real twist. It just cannot be the twist.',
    },
    {
      heading: 'Four guardrails: one player, one verb, one challenge, one end',
      body: 'The verb is the main action the player repeats: collect, jump, bounce. Two of any of these four and the project is over scope. A plan with two players, two verbs, eight levels and two win conditions breaks all four at once, and the fix is to shrink each one back to one. Avoid many levels, online play, a new physics engine, and saving to files.',
    },
    {
      heading: 'Ship the floor, then polish',
      body: 'By Week 12 your game must at least do three things: the player moves, there is one challenge, and there is one win or lose. That is the playable-core floor, and it is the first three boxes of your build checklist for a reason. **If time gets short, ship the floor and cut the polish.** A student who plans three systems ships none. A student who ships the floor early gets weeks to enjoy the extra art and sound.',
    },
    {
      heading: 'What is on the sheet',
      body: 'Structure, scope guardrail check, title, objective, controls, main mechanic, challenge, assets, first-build checklist, and my twist. The one people blur is objective against challenge. The **objective** is what the player wants (reach the flag). The **challenge** is what stops them (the thirty-second timer). If those two are the same sentence, one of them is missing. Shapes are fine for version 1 assets.',
    },
  ],
  related: [
    { slug: 'game-loop', label: 'Game Loop' },
    { slug: 't3-game-states', label: 'Game States' },
    { slug: 'classes', label: 'Classes and Objects' },
    { slug: 'rect-collision', label: 'Rects and Collision' },
  ],
  quiz,
  takeaways: [
    'You can choose a structure you have already built and name the file you start from',
    'You can tell a real twist from a re-skin',
    'You can run the four guardrails over a plan and cut what breaks them',
    'You can say what the playable-core floor is for your own game',
    'You can write a first-build checklist in the order you will actually build it',
  ],
}

export default w10
