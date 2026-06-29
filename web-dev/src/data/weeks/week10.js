// Curated from docs/slides into the Week-3 learning flow. This is plain data — no app logic lives here.

const week10 = {
  "id": 10,
  "slug": "week-10",
  "available": true,
  "title": "Connecting React to Express",
  "subtitle": "Two terminals. Two servers. One app.",
  "goal": "Connect the React Daily Planner to the Express + MongoDB backend with fetch, CORS, JSON headers, _id, and readable errors.",
  "theory": [
    {
      "kind": "heading",
      "text": "The frontend now talks to the backend"
    },
    {
      "kind": "p",
      "text": "In Week 5, React fetched `/tasks.json`. Now it fetches the Express API running on port 3000."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "const API_URL = 'http://localhost:3000/api/tasks';\n\nasync function loadTasks() {\n  setIsLoading(true);\n  const response = await fetch(API_URL);\n  const data = await response.json();\n  setTasks(data);\n  setIsLoading(false);\n}"
    },
    {
      "kind": "heading",
      "text": "CORS allows the browser to cross ports"
    },
    {
      "kind": "p",
      "text": "Vite runs on `localhost:5173`; Express runs on `localhost:3000`. The backend must allow that browser request with CORS."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "const cors = require('cors');\napp.use(cors());"
    },
    {
      "kind": "heading",
      "text": "Writes need method, headers, and body"
    },
    {
      "kind": "p",
      "text": "POST and PUT send JSON from React to Express. Use `_id` when building task-specific URLs."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "await fetch(`${API_URL}/${task._id}`, {\n  method: 'PUT',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ completed: true })\n});"
    }
  ],
  "examples": [
    {
      "id": "week-10-cors",
      "title": "1. CORS allows React to call Express",
      "caption": "See why localhost:5173 and localhost:3000 are different origins and how the backend allows the request.",
      "tracedDemo": "cors"
    },
    {
      "id": "week-10-full-stack-fetch",
      "title": "2. React loads tasks from Express and MongoDB",
      "caption": "Watch a React fetch cross to Express, read MongoDB, return JSON, and update the UI.",
      "tracedDemo": "fullStackFetch"
    },
    {
      "id": "week-10-react-post",
      "title": "3. React creates a task with POST",
      "caption": "Trace method, JSON headers, and body when React sends new task data to Express.",
      "tracedDemo": "reactPost"
    },
    {
      "id": "week-10-react-delete",
      "title": "4. React deletes a task by _id",
      "caption": "See how React builds the URL with task._id, sends DELETE, and removes the task from state.",
      "tracedDemo": "reactDelete"
    }
  ],
  "practice": [
    {
      "id": "week-10-study-check",
      "type": "quiz",
      "title": "Study check",
      "intro": "Answer these after the traced example. If one feels fuzzy, go back to Theory and run the trace again.",
      "questions": [
        {
          "q": "Why does CORS matter in Week 10?",
          "options": [
            "React and Express run on different ports",
            "MongoDB requires CSS",
            "useState only works with CORS"
          ],
          "answerIndex": 0,
          "explanation": "The browser blocks cross-origin requests unless the backend allows them."
        },
        {
          "q": "What id should React use for MongoDB tasks?",
          "options": [
            "task._id",
            "task.id",
            "task.index"
          ],
          "answerIndex": 0,
          "explanation": "MongoDB documents use `_id`."
        },
        {
          "q": "Which headers are needed when React sends JSON?",
          "options": [
            "Content-Type: application/json",
            "Accept-Language: Khmer",
            "Cache-Control: none only"
          ],
          "answerIndex": 0,
          "explanation": "The backend needs Content-Type to parse the JSON body correctly."
        }
      ]
    }
  ],
  "feynman": [
    {
      "q": "What connects in Week 10?",
      "a": "The React UI connects to the Express API, which reads and writes MongoDB documents."
    },
    {
      "q": "Why do we run two terminals?",
      "a": "One runs the backend server on port 3000; one runs the Vite frontend on port 5173."
    },
    {
      "q": "Why does _id replace id?",
      "a": "MongoDB documents come with `_id`, so React must use that id for keys and request URLs."
    },
    {
      "q": "What is the smallest proof this week works?",
      "a": "Add, complete, delete, refresh, and confirm the UI still matches MongoDB."
    }
  ]
}

export default week10
