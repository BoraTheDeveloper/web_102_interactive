// Curated from docs/slides into the Week-3 learning flow. This is plain data — no app logic lives here.

const week07 = {
  "id": 7,
  "slug": "week-07",
  "available": true,
  "title": "API Design, HTTP Methods & Debugging",
  "subtitle": "The same URL — four different jobs.",
  "goal": "Extend the Express server into an in-memory CRUD API with GET, POST, PUT, DELETE, sensible status codes, and request logs.",
  "theory": [
    {
      "kind": "heading",
      "text": "HTTP method tells the job"
    },
    {
      "kind": "p",
      "text": "The path can stay `/api/tasks`; the method says whether the client wants to read, create, update, or delete."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "GET    /api/tasks      // read all\nPOST   /api/tasks      // create one\nPUT    /api/tasks/:id  // update one\nDELETE /api/tasks/:id  // delete one"
    },
    {
      "kind": "heading",
      "text": "JSON body parsing is explicit"
    },
    {
      "kind": "p",
      "text": "Express cannot read JSON request bodies until you add `app.use(express.json())`."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "app.use(express.json());\n\napp.post('/api/tasks', (req, res) => {\n  const title = req.body.title;\n  if (!title) {\n    return res.status(400).json({ error: 'title required' });\n  }\n  const task = { id: Date.now(), title, completed: false };\n  tasks.push(task);\n  res.status(201).json(task);\n});"
    },
    {
      "kind": "heading",
      "text": "Status codes are part of the design"
    },
    {
      "kind": "p",
      "text": "Use `201` for created, `400` for bad input, and `404` when an id does not match anything."
    }
  ],
  "examples": [
    {
      "id": "week-07-crud-read",
      "title": "1. GET all and GET by id",
      "caption": "See the difference between collection reads and one-resource reads with a 404 guard.",
      "tracedDemo": "crudRead"
    },
    {
      "id": "week-07-crud-create",
      "title": "2. POST route and status codes",
      "caption": "Watch Express parse a JSON body, validate it, create a task, and respond with 201.",
      "tracedDemo": "crudRoute"
    },
    {
      "id": "week-07-crud-update",
      "title": "3. PUT updates one task",
      "caption": "Trace the id lookup, not-found guard, field update, and 200 response.",
      "tracedDemo": "crudUpdate"
    },
    {
      "id": "week-07-crud-delete",
      "title": "4. DELETE removes one task",
      "caption": "Watch filter remove one item and see why delete routes still need 404 handling.",
      "tracedDemo": "crudDelete"
    }
  ],
  "practice": [
    {
      "id": "week-07-study-check",
      "type": "quiz",
      "title": "Study check",
      "intro": "Answer these after the traced example. If one feels fuzzy, go back to Theory and run the trace again.",
      "questions": [
        {
          "q": "What does POST /api/tasks mean?",
          "options": [
            "Create a new task",
            "Delete all tasks",
            "Render a React component"
          ],
          "answerIndex": 0,
          "explanation": "POST usually creates a new resource."
        },
        {
          "q": "Why add app.use(express.json())?",
          "options": [
            "So req.body contains parsed JSON",
            "So CSS loads faster",
            "So MongoDB connects"
          ],
          "answerIndex": 0,
          "explanation": "Without it, req.body is missing for JSON requests."
        },
        {
          "q": "Which status code fits a missing title?",
          "options": [
            "400",
            "201",
            "200"
          ],
          "answerIndex": 0,
          "explanation": "400 means the client sent bad input."
        }
      ]
    }
  ],
  "feynman": [
    {
      "q": "What is CRUD?",
      "a": "Create, Read, Update, Delete — the four basic data operations."
    },
    {
      "q": "How can one URL do multiple jobs?",
      "a": "The HTTP method changes the job even when the path is similar."
    },
    {
      "q": "Why do status codes matter?",
      "a": "They let clients and humans know whether the request succeeded and what kind of failure happened."
    },
    {
      "q": "What is the smallest proof this week works?",
      "a": "Use Postman or Insomnia to GET, POST, PUT, and DELETE tasks with expected status codes."
    }
  ]
}

export default week07
