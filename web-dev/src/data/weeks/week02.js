// Curated from docs/slides into the Week-3 learning flow. This is plain data — no app logic lives here.

const week02 = {
  "id": 2,
  "slug": "week-02",
  "available": true,
  "title": "Components, Props & Reusable UI",
  "subtitle": "One component. Four cards. Same shape, different data.",
  "goal": "Turn one hard-coded component into a reusable component by passing data through props.",
  "theory": [
    {
      "kind": "heading",
      "text": "Props are arguments for components"
    },
    {
      "kind": "p",
      "text": "A parent component sends props. The child component receives them as an object and uses them inside JSX."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "function ProfileCard(props) {\n  return (\n    <section className=\"profile-card\">\n      <h2>{props.name}</h2>\n      <p>{props.role}</p>\n      <p>{props.skill}</p>\n    </section>\n  );\n}"
    },
    {
      "kind": "heading",
      "text": "Same structure, different data"
    },
    {
      "kind": "p",
      "text": "Reusable UI means you keep one component shape and send different values into it."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "function App() {\n  return (\n    <>\n      <ProfileCard name=\"Sokha\" role=\"Student\" skill=\"HTML\" />\n      <ProfileCard name=\"Dara\" role=\"Student\" skill=\"React\" />\n    </>\n  );\n}"
    },
    {
      "kind": "heading",
      "text": "Exact names and braces matter"
    },
    {
      "kind": "p",
      "text": "`props.name` only works if the parent sends `name`. JSX braces tell React to read a JavaScript value instead of printing literal text."
    }
  ],
  "examples": [
    {
      "id": "week-02-props-flow",
      "title": "1. Props flow from parent to child",
      "caption": "Watch App build a props object, hand it to ProfileCard, and see the child read each value.",
      "tracedDemo": "propsFlow"
    },
    {
      "id": "week-02-multiple-cards",
      "title": "2. One component renders many cards",
      "caption": "Use an array and .map() to reuse the same component shape with different student data.",
      "tracedDemo": "multipleCards"
    },
    {
      "id": "week-02-prop-bug",
      "title": "3. Prop name mismatch bug",
      "caption": "Watch why Name and name are not the same prop, and why the screen renders blank.",
      "tracedDemo": "propBug"
    }
  ],
  "practice": [
    {
      "id": "week-02-study-check",
      "type": "quiz",
      "title": "Study check",
      "intro": "Answer these after the traced example. If one feels fuzzy, go back to Theory and run the trace again.",
      "questions": [
        {
          "q": "What are props?",
          "options": [
            "Values passed from a parent component to a child component",
            "CSS classes",
            "State variables owned by the browser"
          ],
          "answerIndex": 0,
          "explanation": "Props are inputs to a component function."
        },
        {
          "q": "What happens if the parent sends Name but the child reads props.name?",
          "options": [
            "The child gets undefined",
            "React fixes the capitalization",
            "The app automatically lowercases it"
          ],
          "answerIndex": 0,
          "explanation": "Prop names are case-sensitive."
        },
        {
          "q": "Why reuse one ProfileCard function?",
          "options": [
            "One component can render many cards with different data",
            "React forbids multiple functions",
            "It makes CSS unnecessary"
          ],
          "answerIndex": 0,
          "explanation": "Reuse keeps one structure and swaps the data."
        }
      ]
    }
  ],
  "feynman": [
    {
      "q": "Explain props without using React jargon.",
      "a": "Props are information a parent hands to a reusable piece of UI so it can show the right content."
    },
    {
      "q": "What problem do props solve?",
      "a": "They prevent copy-pasting the same component just to change text."
    },
    {
      "q": "Why do braces matter in JSX?",
      "a": "Braces switch from literal text into JavaScript expression mode."
    },
    {
      "q": "What is the smallest proof this week works?",
      "a": "One ProfileCard function renders multiple cards with different names/roles/skills."
    }
  ]
}

export default week02
