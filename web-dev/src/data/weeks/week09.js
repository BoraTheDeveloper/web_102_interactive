// Curated from docs/slides into the Week-3 learning flow. This is plain data — no app logic lives here.

const week09 = {
  "id": 9,
  "slug": "week-09",
  "available": true,
  "title": "Full CRUD with Express & MongoDB",
  "subtitle": "Find. Update. Delete. By _id.",
  "goal": "Complete MongoDB-backed CRUD with find-by-id, update, delete, validation, and 200/201/400/404 responses.",
  "theory": [
    {
      "kind": "heading",
      "text": "CRUD now talks to MongoDB"
    },
    {
      "kind": "p",
      "text": "Week 7 used an array. Week 9 uses Mongoose methods that target real MongoDB documents."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "app.get('/api/tasks/:id', async (req, res) => {\n  const task = await Task.findById(req.params.id);\n  if (!task) return res.status(404).json({ error: 'not found' });\n  res.json(task);\n});"
    },
    {
      "kind": "heading",
      "text": "Update should return the new document"
    },
    {
      "kind": "p",
      "text": "`{ new: true }` tells Mongoose to return the updated task instead of the old one."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "app.put('/api/tasks/:id', async (req, res) => {\n  const task = await Task.findByIdAndUpdate(\n    req.params.id,\n    { completed: req.body.completed },\n    { new: true }\n  );\n  if (!task) return res.status(404).json({ error: 'not found' });\n  res.json(task);\n});"
    },
    {
      "kind": "heading",
      "text": "Delete still needs an answer"
    },
    {
      "kind": "p",
      "text": "A DELETE route should handle missing ids and return a clear success response when deletion works."
    }
  ],
  "examples": [
    {
      "id": "week-09-find-by-id",
      "title": "1. GET one MongoDB document by _id",
      "caption": "Watch Express capture _id, ask Mongoose for one document, and handle not-found.",
      "tracedDemo": "mongoFindById"
    },
    {
      "id": "week-09-mongoose-crud",
      "title": "2. PUT and DELETE with MongoDB",
      "caption": "Trace update/delete routes, { new: true }, and clear success responses.",
      "tracedDemo": "mongooseCrud"
    },
    {
      "id": "week-09-invalid-object-id",
      "title": "3. Invalid ObjectId returns 400",
      "caption": "See why malformed ids should be rejected before Mongoose queries MongoDB.",
      "tracedDemo": "invalidObjectId"
    }
  ],
  "practice": [
    {
      "id": "week-09-study-check",
      "type": "quiz",
      "title": "Study check",
      "intro": "Answer these after the traced example. If one feels fuzzy, go back to Theory and run the trace again.",
      "questions": [
        {
          "q": "Why use req.params.id?",
          "options": [
            "It holds the id captured from /api/tasks/:id",
            "It holds the JSON body",
            "It starts MongoDB"
          ],
          "answerIndex": 0,
          "explanation": "Route params come from the URL."
        },
        {
          "q": "Why include { new: true } in findByIdAndUpdate?",
          "options": [
            "To return the updated document",
            "To create a new collection",
            "To delete old data"
          ],
          "answerIndex": 0,
          "explanation": "Without it, Mongoose returns the pre-update document."
        },
        {
          "q": "Which status fits a well-formed id that matches no task?",
          "options": [
            "404",
            "201",
            "500"
          ],
          "answerIndex": 0,
          "explanation": "404 means the requested resource was not found."
        }
      ]
    }
  ],
  "feynman": [
    {
      "q": "What does full CRUD mean by Week 9?",
      "a": "The backend can create, read, update, and delete MongoDB task documents."
    },
    {
      "q": "Why is _id important?",
      "a": "It is the stable MongoDB document id used in route URLs."
    },
    {
      "q": "What bug does { new: true } prevent?",
      "a": "It prevents the API from returning stale pre-update data."
    },
    {
      "q": "What is the smallest proof this week works?",
      "a": "Run a complete Postman flow: create, read, update, delete, then confirm not found."
    }
  ]
}

export default week09
