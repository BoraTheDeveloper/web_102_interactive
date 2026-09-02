// Week 10 quiz. Transcribed from
// game_dev/docs/2026_t3/quizzes/W10 - Quiz Questions.md, including the answer key.
// Traps: Q6, Q7, Q10.

const w10Quiz = {
  title: 'Week 10 check',
  intro: 'Ten questions on scope guardrails, verbs and what counts as a real twist. Same questions as next class\'s Kahoot.',
  questions: [
    {
      q: 'What is the main goal of Week 10?',
      options: [
        'Write a short plan for a realistic final game',
        'Finish a new game in this hour',
        'Build an online multiplayer game in one class',
        'Learn a new language for 3D',
      ],
      answerIndex: 0,
      explanation: 'Week 10 is for writing a short final-project plan. It is not a build day.',
    },
    {
      q: 'Which project idea is most realistic for this final project?',
      options: [
        'A 3D online world',
        'A full social media app',
        'A small Collector, Platformer or Pong-style game, or a mashup of those',
        'A game with 100 levels and multiplayer',
      ],
      answerIndex: 2,
      explanation: 'A small Collector, Platformer, Pong-style game, or a mashup, fits the course.',
    },
    {
      q: 'What are the scope guardrails for the plan?',
      options: [
        'Ten players, ten verbs, ten maps, and no end',
        'One player, one verb, one challenge, and one end',
        'One camera, one tile map, and one save file',
        'One website, one password, and one chat room',
      ],
      answerIndex: 1,
      explanation: 'The guardrails are one player, one verb, one challenge, and one end.',
    },
    {
      q: 'In the plan, what is a verb?',
      options: [
        'The main action the player repeats (collect, jump, bounce)',
        'The file extension',
        'The class name `Player`',
        'A way to quit Python',
      ],
      answerIndex: 0,
      explanation: 'The verb is the main action, such as collect, jump, or bounce the ball.',
    },
    {
      q: 'Which twist is allowed for the final project?',
      options: [
        'Changing only the pictures and keeping the same gameplay',
        'Adding online networking',
        'A change that makes the game play differently',
        'Planning 50 extra levels before anything runs',
      ],
      answerIndex: 2,
      explanation: 'The final twist must change gameplay, not just the theme.',
    },
    {
      q: 'Which change is theme-only, so it does not count as the final twist?',
      trap: true,
      options: [
        'A chasing enemy that the player must avoid',
        'The same collect game, but the coin picture is a star',
        'A time limit that ends the run',
        'A double jump that reaches new platforms',
      ],
      answerIndex: 1,
      explanation: 'New pictures with the same rules are theme-only and do not count. A chasing enemy, a timer, or a double jump would change play.',
    },
    {
      q: 'This plan: two players, collect **and** shoot, eight levels, win at 10 points **or** survive a timer. Which guardrail does it break?',
      trap: true,
      options: [
        'None, more features are always better',
        'One player, one verb, one challenge and one end. This plan has two of each',
        'Only the "one player" rule. The rest is fine',
        'Only the twist rule, because there is no new picture',
      ],
      answerIndex: 1,
      explanation: 'Count the blanks: two players, two verbs, two challenges, two ends. Shrink until each is one.',
    },
    {
      q: 'A smaller finished game is usually better than a huge unfinished game.',
      options: ['True', 'False'],
      answerIndex: 0,
      explanation: 'Finishing a small game is better than planning too much and not completing it.',
    },
    {
      q: 'Changing only the pictures, not how the game plays, is enough for the final twist.',
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'Theme-only swaps are not enough. The twist must change how the game plays.',
    },
    {
      q: '"Same Pong, but the ball is a pizza" meets the twist rule.',
      trap: true,
      options: ['True', 'False'],
      answerIndex: 1,
      explanation: 'A pizza ball is a picture swap. A twist would change the rules: a third paddle, a shrinking table, a timer.',
    },
  ],
}

export default w10Quiz
