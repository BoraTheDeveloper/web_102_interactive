// Curated from docs/slides into the Week-3 learning flow. This is plain data — no app logic lives here.

const week06 = {
  "id": 6,
  "slug": "week-06",
  "available": true,
  "title": "Intro to Node.js & Express",
  "subtitle": "You asked. Today, you answer.",
  "goal": "Run a Node + Express server, create routes, and return JSON from `/api/tasks` in the browser.",
  "theory": [
    {
      "kind": "heading",
      "text": "Node runs JavaScript outside the browser"
    },
    {
      "kind": "p",
      "text": "Frontend JavaScript runs in the browser. Node lets JavaScript run in a terminal as a server program."
    },
    {
      "kind": "heading",
      "text": "Express maps requests to route handlers"
    },
    {
      "kind": "p",
      "text": "A route combines an HTTP method, a URL path, and a callback that receives `req` and `res`."
    },
    {
      "kind": "code",
      "lang": "jsx",
      "code": "const express = require('express');\nconst app = express();\n\nconst tasks = ['Study JS', 'Practice React'];\n\napp.get('/api/tasks', (req, res) => {\n  res.json(tasks);\n});\n\napp.listen(3000, () => {\n  console.log('Server running on 3000');\n});"
    },
    {
      "kind": "heading",
      "text": "Servers keep running"
    },
    {
      "kind": "p",
      "text": "A script can run once and exit. A server calls `app.listen(...)` and stays alive so future requests can reach it."
    }
  ],
  "examples": [
    {
      "id": "week-06-node-server",
      "title": "1. Node starts a server",
      "caption": "See how require(), express(), and app.listen() turn JavaScript into a running backend.",
      "tracedDemo": "nodeServer"
    },
    {
      "id": "week-06-route-paths",
      "title": "2. Different routes return different responses",
      "caption": "Compare a home route that sends text with an API route that sends JSON.",
      "tracedDemo": "routePath"
    },
    {
      "id": "week-06-express-route",
      "title": "3. Express GET route returns JSON",
      "caption": "Watch a browser request reach Express, match a route, and return JSON.",
      "tracedDemo": "expressRoute"
    }
  ],
  "practice": [
    {
      "id": "week-06-study-check",
      "type": "quiz",
      "title": "Study check",
      "intro": "Answer these after the traced example. If one feels fuzzy, go back to Theory and run the trace again.",
      "questions": [
        {
          "q": "What does app.get(\"/api/tasks\", handler) define?",
          "options": [
            "A GET route for /api/tasks",
            "A React component",
            "A MongoDB collection"
          ],
          "answerIndex": 0,
          "explanation": "Express uses method + path to choose a handler."
        },
        {
          "q": "What does res.json(tasks) do?",
          "options": [
            "Sends tasks as a JSON response",
            "Reads the browser URL",
            "Starts the server"
          ],
          "answerIndex": 0,
          "explanation": "res.json serializes data and ends the response."
        },
        {
          "q": "Why is app.listen important?",
          "options": [
            "It keeps the server waiting for requests",
            "It creates the tasks array",
            "It installs Express"
          ],
          "answerIndex": 0,
          "explanation": "Without listen, there is no running server to answer."
        }
      ]
    }
  ],
  "feynman": [
    {
      "q": "What is Express?",
      "a": "A Node library for receiving HTTP requests and sending responses."
    },
    {
      "q": "What are req and res?",
      "a": "req describes what the client asked for; res is how the server answers."
    },
    {
      "q": "What is JSON in this lesson?",
      "a": "The data format the backend sends so a frontend can read it later."
    },
    {
      "q": "What is the smallest proof this week works?",
      "a": "Visit /api/tasks in the browser and see JSON from your Express server."
    }
  ]
}

export default week06
