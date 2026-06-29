// Curated from docs/slides into the Week-3 learning flow. This is plain data — no app logic lives here.

const week04 = {
  "id": 4,
  "slug": "week-04",
  "available": true,
  "title": "Forms & Controlled Components",
  "subtitle": "Type → React holds it → Submit → New task appears.",
  "goal": "Build a controlled form that stores typed text in state, blocks page refresh, validates input, appends a task, and clears the field.",
  "theory": [
    {
      "kind": "heading",
      "text": "Controlled inputs keep React and the input in sync"
    },
    {
      "kind": "p",
      "text": "The input displays the state value. `onChange` writes each keystroke back into state."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "const [draft, setDraft] = useState('');\n\n<input\n  value={draft}\n  onChange={(event) => setDraft(event.target.value)}\n/>"
    },
    {
      "kind": "heading",
      "text": "Form submit is an event"
    },
    {
      "kind": "p",
      "text": "A normal form submit reloads the page. React apps usually block that with `event.preventDefault()` and handle the data in JavaScript."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "function handleSubmit(event) {\n  event.preventDefault();\n  if (draft.trim() === '') return;\n  setTasks([...tasks, draft.trim()]);\n  setDraft('');\n}"
    },
    {
      "kind": "heading",
      "text": "The same immutable array rule returns"
    },
    {
      "kind": "p",
      "text": "Adding a task still means building a new array. Never use `tasks.push(...)` to update React state."
    }
  ],
  "examples": [
    {
      "id": "week-04-controlled-input",
      "title": "1. Controlled input typing",
      "caption": "Watch each keystroke move from the browser event into React state and back into the input value.",
      "tracedDemo": "controlledInput"
    },
    {
      "id": "week-04-controlled-form",
      "title": "2. Controlled form submit",
      "caption": "Type a task and watch draft state, preventDefault, the new array update, and the cleared input.",
      "tracedDemo": "controlledForm"
    },
    {
      "id": "week-04-form-validation",
      "title": "3. Blank-submit validation",
      "caption": "See how trim() blocks whitespace-only tasks before they enter the list.",
      "tracedDemo": "formValidation"
    }
  ],
  "practice": [
    {
      "id": "week-04-study-check",
      "type": "quiz",
      "title": "Study check",
      "intro": "Answer these after the traced example. If one feels fuzzy, go back to Theory and run the trace again.",
      "questions": [
        {
          "q": "What makes an input controlled?",
          "options": [
            "Its value comes from React state and onChange updates that state",
            "It has a placeholder",
            "It is inside a form"
          ],
          "answerIndex": 0,
          "explanation": "Controlled inputs use state as the source of truth."
        },
        {
          "q": "Why call event.preventDefault()?",
          "options": [
            "To stop the browser from refreshing the page",
            "To delete the input value",
            "To make CSS apply"
          ],
          "answerIndex": 0,
          "explanation": "A submit event normally navigates/reloads; preventDefault keeps the app running."
        },
        {
          "q": "Why use [...tasks, newTask]?",
          "options": [
            "It creates a new array React can detect",
            "It sorts the tasks",
            "It changes the old array in place"
          ],
          "answerIndex": 0,
          "explanation": "React state updates should hand React a new array reference."
        }
      ]
    }
  ],
  "feynman": [
    {
      "q": "What is a controlled input?",
      "a": "An input whose displayed value comes from React state, with onChange keeping state updated."
    },
    {
      "q": "What does preventDefault do in a form?",
      "a": "It stops the browser’s default page refresh so React can handle the submit."
    },
    {
      "q": "Why trim the draft?",
      "a": "It catches empty or whitespace-only tasks before they enter the list."
    },
    {
      "q": "What is the smallest proof this week works?",
      "a": "Type a task, submit it, see it appear, see the input clear, and confirm the page did not refresh."
    }
  ]
}

export default week04
