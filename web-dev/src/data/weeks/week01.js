// Curated from docs/slides into the Week-3 learning flow. This is plain data — no app logic lives here.

const week01 = {
  "id": 1,
  "slug": "week-01",
  "available": true,
  "title": "Web 101 Review & Intro to React",
  "subtitle": "Same web. New way to build it.",
  "goal": "Move from manually changing the DOM to building a React component that returns JSX and appears on screen through App.",
  "theory": [
    {
      "kind": "heading",
      "text": "From DOM updates to React updates"
    },
    {
      "kind": "p",
      "text": "In Web 101, you changed the page by finding an element and editing it directly."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "const title = document.getElementById('title');\ntitle.textContent = 'Done';"
    },
    {
      "kind": "p",
      "text": "In React, you describe what the screen should look like. React turns your component output into real DOM updates."
    },
    {
      "kind": "heading",
      "text": "A component is a function that returns JSX"
    },
    {
      "kind": "p",
      "text": "A component name starts with a capital letter because JSX treats lowercase names as built-in HTML tags."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "function ProfileCard() {\n  return (\n    <section className=\"profile-card\">\n      <h2>My Web 102 Profile</h2>\n      <p>I am learning React.</p>\n    </section>\n  );\n}\n\nfunction App() {\n  return <ProfileCard />;\n}"
    },
    {
      "kind": "heading",
      "text": "JSX looks like HTML, but it is JavaScript"
    },
    {
      "kind": "p",
      "text": "Use `className`, not `class`. Use braces when you want JavaScript values inside JSX. The browser does not run JSX directly; Vite compiles it for you."
    }
  ],
  "examples": [
    {
      "id": "week-01-dom-update",
      "title": "1. DOM update vs React render",
      "caption": "Compare manually changing the page with describing the same screen through a React component.",
      "tracedDemo": "domUpdate"
    },
    {
      "id": "week-01-profileCard",
      "title": "2. A component renders, step by step",
      "caption": "Watch React call App, find <ProfileCard />, call the component function, and place the JSX on screen.",
      "tracedDemo": "profileCard"
    },
    {
      "id": "week-01-jsx-expression",
      "title": "3. JSX values and className",
      "caption": "See how className and braces work when JSX needs CSS classes and JavaScript values.",
      "tracedDemo": "jsxExpression"
    }
  ],
  "practice": [
    {
      "id": "week-01-study-check",
      "type": "quiz",
      "title": "Study check",
      "intro": "Answer these after the traced example. If one feels fuzzy, go back to Theory and run the trace again.",
      "questions": [
        {
          "q": "In React, who updates the DOM after your component returns JSX?",
          "options": [
            "React",
            "document.getElementById",
            "The CSS file"
          ],
          "answerIndex": 0,
          "explanation": "You describe the UI; React updates the DOM to match."
        },
        {
          "q": "Why must ProfileCard start with a capital letter?",
          "options": [
            "React treats capitalized JSX as a custom component",
            "CSS requires capital names",
            "Vite only imports capitalized files"
          ],
          "answerIndex": 0,
          "explanation": "Lowercase JSX is treated like a native HTML tag."
        },
        {
          "q": "Which JSX attribute should you use for CSS classes?",
          "options": [
            "className",
            "class",
            "cssClass"
          ],
          "answerIndex": 0,
          "explanation": "`className` maps to the DOM class attribute without colliding with the JavaScript `class` keyword."
        }
      ]
    }
  ],
  "feynman": [
    {
      "q": "What is a React component?",
      "a": "A JavaScript function that returns JSX describing a piece of the screen."
    },
    {
      "q": "How is React different from manually changing textContent?",
      "a": "You change data or component output; React figures out the DOM updates."
    },
    {
      "q": "Why does capitalization matter?",
      "a": "React calls capitalized JSX tags as components. Lowercase tags are treated as built-in HTML elements."
    },
    {
      "q": "What is the smallest proof this week works?",
      "a": "Run the Vite app and point to a visible ProfileCard rendered through App."
    }
  ]
}

export default week01
