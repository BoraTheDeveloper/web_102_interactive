// Curated from docs/slides into the Week-3 learning flow. This is plain data — no app logic lives here.

const week05 = {
  "id": 5,
  "slug": "week-05",
  "available": true,
  "title": "Fetching Data from APIs",
  "subtitle": "Ask the page for data. Show Loading. Then show the answer.",
  "goal": "Load starter tasks with fetch inside useEffect, show loading/success/error states, and render API data without crashing.",
  "theory": [
    {
      "kind": "heading",
      "text": "useEffect runs after render"
    },
    {
      "kind": "p",
      "text": "Fetching data is a side effect. The component renders first, then `useEffect` starts the request."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "useEffect(() => {\n  loadTasks();\n}, []);"
    },
    {
      "kind": "heading",
      "text": "Fetch is asynchronous"
    },
    {
      "kind": "p",
      "text": "`fetch()` returns a response later. `await response.json()` parses the JSON body into JavaScript data."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "async function loadTasks() {\n  try {\n    setIsLoading(true);\n    const response = await fetch('/tasks.json');\n    const data = await response.json();\n    setTasks(data);\n  } catch (err) {\n    setError('Could not load tasks.');\n  } finally {\n    setIsLoading(false);\n  }\n}"
    },
    {
      "kind": "heading",
      "text": "Users need screen states"
    },
    {
      "kind": "p",
      "text": "A good fetch UI handles loading, success, and error. A broken fetch should show a readable message, not a blank page."
    }
  ],
  "examples": [
    {
      "id": "week-05-fetch-file",
      "title": "1. Fetch from a static file",
      "caption": "Start with /tasks.json. The frontend asks for a file, parses JSON, stores tasks, and leaves Loading.",
      "tracedDemo": "fetchLifecycle"
    },
    {
      "id": "week-05-fetch-local-server",
      "title": "2. Fetch from a local Express server",
      "caption": "Move from a static file to http://localhost:3000/api/tasks. React still uses fetch; Express now provides the JSON.",
      "tracedDemo": "fetchLocalServer"
    },
    {
      "id": "week-05-fetch-database",
      "title": "3. Fetch from a database-backed API",
      "caption": "The frontend still fetches the same API route. The backend reads MongoDB with Mongoose before sending JSON back.",
      "tracedDemo": "fetchDatabase"
    }
  ],
  "practice": [
    {
      "id": "week-05-study-check",
      "type": "quiz",
      "title": "Study check",
      "intro": "Answer these after the traced example. If one feels fuzzy, go back to Theory and run the trace again.",
      "questions": [
        {
          "q": "Why use useEffect for fetch?",
          "options": [
            "Fetching is a side effect that should run after render",
            "CSS requires it",
            "It replaces useState"
          ],
          "answerIndex": 0,
          "explanation": "Effects are where React code talks to the outside world."
        },
        {
          "q": "What does the empty dependency array [] mean?",
          "options": [
            "Run this effect after the first render only",
            "Run on every keystroke",
            "Never run"
          ],
          "answerIndex": 0,
          "explanation": "For this lesson, [] prevents an infinite fetch loop."
        },
        {
          "q": "Why keep isLoading and error state?",
          "options": [
            "The screen needs to explain what is happening",
            "They make fetch faster",
            "They replace response.json()"
          ],
          "answerIndex": 0,
          "explanation": "Students should see loading, data, or a readable error."
        }
      ]
    }
  ],
  "feynman": [
    {
      "q": "What does fetch do?",
      "a": "It asks another file or server for data and gives you a response asynchronously."
    },
    {
      "q": "Why does useEffect need [] here?",
      "a": "So the fetch runs once after the first render instead of looping after every state update."
    },
    {
      "q": "What are the three screen states?",
      "a": "Loading while waiting, success when data arrives, and error when the request fails."
    },
    {
      "q": "What is the smallest proof this week works?",
      "a": "Reload the page, see Loading, then see tasks from JSON render on screen."
    }
  ]
}

export default week05
