// Curated from docs/slides into the Week-3 learning flow. This is plain data — no app logic lives here.

const week08 = {
  "id": 8,
  "slug": "week-08",
  "available": true,
  "title": "Intro to MongoDB & Mongoose",
  "subtitle": "Stop. Restart. Your tasks survive.",
  "goal": "Connect Express to MongoDB with Mongoose, define a Task model, and replace in-memory GET/POST with database-backed routes.",
  "theory": [
    {
      "kind": "heading",
      "text": "MongoDB stores documents"
    },
    {
      "kind": "p",
      "text": "The in-memory array disappears when the server restarts. MongoDB keeps documents after the process stops."
    },
    {
      "kind": "heading",
      "text": "Mongoose is the bridge"
    },
    {
      "kind": "p",
      "text": "A schema describes the shape of a document. A model gives your server methods like `find()` and `create()`."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "await mongoose.connect(process.env.MONGODB_URI);\n\nconst taskSchema = new mongoose.Schema({\n  title: String,\n  completed: Boolean\n});\n\nconst Task = mongoose.model('Task', taskSchema);"
    },
    {
      "kind": "heading",
      "text": "Database calls are async"
    },
    {
      "kind": "p",
      "text": "Routes that talk to MongoDB use `async` and `await` because the database answers later."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "app.get('/api/tasks', async (req, res) => {\n  const tasks = await Task.find();\n  res.json(tasks);\n});\n\napp.post('/api/tasks', async (req, res) => {\n  const task = await Task.create({ title: req.body.title, completed: false });\n  res.status(201).json(task);\n});"
    }
  ],
  "examples": [
    {
      "id": "week-08-mongoose-connect",
      "title": "1. Connect Express to MongoDB",
      "caption": "Start with the database connection so the server can read and write persistent data.",
      "tracedDemo": "mongooseConnect"
    },
    {
      "id": "week-08-mongoose-model",
      "title": "2. Schema and model",
      "caption": "See how a schema defines task shape and how a model becomes the database API.",
      "tracedDemo": "mongooseModel"
    },
    {
      "id": "week-08-mongoose-read-create",
      "title": "3. Read and create with Mongoose",
      "caption": "Watch the server read saved tasks and persist a new document.",
      "tracedDemo": "mongooseReadCreate"
    }
  ],
  "practice": [
    {
      "id": "week-08-study-check",
      "type": "quiz",
      "title": "Study check",
      "intro": "Answer these after the traced example. If one feels fuzzy, go back to Theory and run the trace again.",
      "questions": [
        {
          "q": "What problem does MongoDB solve here?",
          "options": [
            "Tasks survive server restart",
            "React renders faster",
            "CSS gets bundled"
          ],
          "answerIndex": 0,
          "explanation": "A database persists data outside the Node process."
        },
        {
          "q": "What is a Mongoose model?",
          "options": [
            "An object with methods for reading/writing one collection shape",
            "A React component",
            "A browser tab"
          ],
          "answerIndex": 0,
          "explanation": "The model is how route handlers talk to MongoDB."
        },
        {
          "q": "Why use await Task.find()?",
          "options": [
            "The database responds asynchronously",
            "find() returns CSS",
            "await starts Express"
          ],
          "answerIndex": 0,
          "explanation": "Database calls take time and return promises."
        }
      ]
    }
  ],
  "feynman": [
    {
      "q": "What is MongoDB doing for us?",
      "a": "It stores task documents outside the server process so they persist."
    },
    {
      "q": "What is Mongoose doing?",
      "a": "It gives JavaScript methods for working with MongoDB documents through schemas and models."
    },
    {
      "q": "What is _id?",
      "a": "MongoDB’s automatically generated document identifier."
    },
    {
      "q": "What is the smallest proof this week works?",
      "a": "Create a task, restart the server, and still see the task from MongoDB."
    }
  ]
}

export default week08
