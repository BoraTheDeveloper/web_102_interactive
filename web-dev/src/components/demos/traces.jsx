// Trace configs for the debugger-style demos. Each trace scripts what happens,
// step by step, when a student triggers the concept in the live preview.
//
// config shape:
//   code: string
//   state: initial state object
//   live: ({ state, update, start, busy }) => ReactNode
//   inspector: (state) => [{ label, value }]
//   steps: [{ lines, label, desc, delta?, apply? }]

const arr = (a) => `[${a.join(', ')}]`
const str = (s) => `"${s}"`
const yesNo = (value) => (value ? 'yes' : 'no')

function TracePreview({ title, children, start, busy, disabled }) {
  return (
    <div className="trace-preview">
      <div className="trace-preview-title">{title}</div>
      <div className="trace-preview-body">{children}</div>
      <button className="btn btn--primary" onClick={start} disabled={busy || disabled}>
        Start trace
      </button>
    </div>
  )
}

function MiniCard({ eyebrow, title, children }) {
  return (
    <section className="trace-mini-card">
      {eyebrow && <p className="trace-mini-eyebrow">{eyebrow}</p>}
      <h3>{title}</h3>
      {children}
    </section>
  )
}

// ---- Week 1: React component render path ----
const profileCardTrace = {
  code: `function ProfileCard() {
  return (
    <section className="profile-card">
      <h2>My Web 102 Profile</h2>
      <p>I am learning React.</p>
    </section>
  );
}

function App() {
  return (
    <main className="app">
      <ProfileCard />
    </main>
  );
}`,
  state: { phase: 'idle', screen: 'blank' },
  inspector: (s) => [
    { label: 'phase', value: s.phase },
    { label: 'screen', value: s.screen },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="React render preview" start={start} busy={busy}>
      {state.screen === 'card' ? (
        <MiniCard eyebrow="Web Development 102" title="My Web 102 Profile">
          <p>I am learning React.</p>
        </MiniCard>
      ) : (
        <p className="trace-placeholder">The screen is blank until React renders App.</p>
      )}
    </TracePreview>
  ),
  steps: [
    { lines: [10], label: '1 · React calls App', desc: 'The app starts at App(), not at the HTML file.', delta: () => ({ phase: { from: 'idle', to: 'render App' } }) },
    { lines: [13], label: '2 · App asks for ProfileCard', desc: 'The capitalized <ProfileCard /> tag tells React to call your component function.', delta: () => ({ phase: { from: 'render App', to: 'call ProfileCard' } }) },
    { lines: [1, 2], label: '3 · Component function runs', desc: 'ProfileCard is just a JavaScript function that returns JSX.', delta: () => ({ screen: { from: 'blank', to: 'card pending' } }) },
    { lines: [3, 4, 5, 6], label: '4 · JSX becomes DOM', desc: 'React turns the returned JSX into real elements on the page.', apply: () => ({ phase: 'rendered', screen: 'card' }) },
  ],
}

// ---- Week 2: props flow ----
const propsTrace = {
  code: `function ProfileCard(props) {
  return (
    <section className="profile-card">
      <h2>{props.name}</h2>
      <p>{props.role}</p>
      <p>{props.skill}</p>
    </section>
  );
}

function App() {
  return (
    <ProfileCard
      name="Sokha"
      role="Student"
      skill="React"
    />
  );
}`,
  state: { name: '—', role: '—', skill: '—' },
  inspector: (s) => [
    { label: 'name', value: s.name },
    { label: 'role', value: s.role },
    { label: 'skill', value: s.skill },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Props preview" start={start} busy={busy}>
      <MiniCard eyebrow={state.role === '—' ? 'Waiting for props' : state.role} title={state.name === '—' ? 'ProfileCard' : state.name}>
        <p>Skill: {state.skill}</p>
      </MiniCard>
    </TracePreview>
  ),
  steps: [
    { lines: [12], label: '1 · Parent renders child', desc: 'App decides to show ProfileCard.', delta: () => ({ name: { from: '—', to: 'Sokha' } }) },
    { lines: [13, 14, 15], label: '2 · Props object is built', desc: 'React packages name, role, and skill into one props object.', apply: () => ({ name: 'Sokha', role: 'Student', skill: 'React' }) },
    { lines: [1], label: '3 · Component receives props', desc: 'The child function receives that object as its parameter.' },
    { lines: [4, 5, 6], label: '4 · JSX reads props', desc: 'Each {props.x} expression pulls a value out of the object and displays it.' },
  ],
}

// ---- Week 3: counter ----
const counterTrace = {
  code: `function Counter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  return (
    <button onClick={increaseCount}>
      Clicked {count} times
    </button>
  );
}`,
  state: { count: 0 },
  inspector: (s) => [{ label: 'count', value: s.count }],
  live: ({ state, start, busy }) => (
    <button className="live-counter" onClick={start} disabled={busy}>
      Clicked {state.count} {state.count === 1 ? 'time' : 'times'}
    </button>
  ),
  steps: [
    { lines: [9], label: '1 · Event fires', desc: 'You clicked the button, so React calls the function passed to onClick.' },
    { lines: [4], label: '2 · Handler runs', desc: 'increaseCount() starts executing.' },
    { lines: [5], label: '3 · State update queued', desc: 'setCount(count + 1) tells React the next value. The screen has not changed yet.', delta: (s) => ({ count: { from: s.count, to: s.count + 1 } }) },
    { lines: [10], label: '4 · Re-render', desc: 'React re-renders Counter with the new state.', apply: (s) => ({ count: s.count + 1 }) },
  ],
}

// ---- Week 3 / Week 4: controlled task form ----
const taskListTrace = {
  code: `function TaskList() {
  const [tasks, setTasks] = useState(["Study JS"]);
  const [draft, setDraft] = useState("");

  function addTask() {
    setTasks([...tasks, draft]);
    setDraft("");
  }

  return (
    <div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li>{task}</li>
        ))}
      </ul>
    </div>
  );
}`,
  state: { tasks: ['Study JS'], draft: '' },
  inspector: (s) => [
    { label: 'tasks', value: arr(s.tasks) },
    { label: 'draft', value: str(s.draft) },
  ],
  live: ({ state, update, start, busy }) => (
    <div className="live-tasklist">
      <div className="live-tasklist-form">
        <input
          className="live-input"
          value={state.draft}
          placeholder="Type a task, then Add…"
          disabled={busy}
          onChange={(e) => update({ draft: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && state.draft.trim() && start()}
        />
        <button className="btn btn--primary" onClick={start} disabled={busy || !state.draft.trim()}>
          Add
        </button>
      </div>
      <ul className="live-tasks">
        {state.tasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </div>
  ),
  steps: [
    { lines: [16], label: '1 · Event fires', desc: 'You clicked Add (or pressed Enter), so React calls addTask.' },
    { lines: [5], label: '2 · Handler runs', desc: 'addTask() starts executing.' },
    { lines: [6], label: '3 · Build a new tasks array', desc: 'setTasks([...tasks, draft]) creates a new array instead of mutating the old one.', delta: (s) => ({ tasks: { from: arr(s.tasks), to: arr([...s.tasks, s.draft]) } }) },
    { lines: [7], label: '4 · Clear the input', desc: 'setDraft("") queues the input reset.', delta: (s) => ({ draft: { from: str(s.draft), to: str('') } }) },
    { lines: [18, 19], label: '5 · Re-render', desc: '.map() turns the new tasks array into list items.', apply: (s) => ({ tasks: [...s.tasks, s.draft], draft: '' }) },
  ],
}

const controlledFormTrace = {
  code: `function PlannerForm() {
  const [draft, setDraft] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    if (draft.trim() === "") return;
    setTasks([...tasks, draft.trim()]);
    setDraft("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={draft} onChange={(e) => setDraft(e.target.value)} />
      <button>Add</button>
    </form>
  );
}`,
  state: { draft: '', tasks: [], refresh: 'not blocked' },
  inspector: (s) => [
    { label: 'draft', value: str(s.draft) },
    { label: 'tasks', value: arr(s.tasks) },
    { label: 'refresh', value: s.refresh },
  ],
  live: ({ state, update, start, busy }) => (
    <div className="live-tasklist">
      <form className="live-tasklist-form" onSubmit={(e) => { e.preventDefault(); if (state.draft.trim()) start() }}>
        <input className="live-input" value={state.draft} placeholder="New task…" disabled={busy} onChange={(e) => update({ draft: e.target.value })} />
        <button className="btn btn--primary" disabled={busy || !state.draft.trim()}>Add</button>
      </form>
      <ul className="live-tasks">{state.tasks.map((task, i) => <li key={i}>{task}</li>)}</ul>
    </div>
  ),
  steps: [
    { lines: [14], label: '1 · Input change', desc: 'Typing fires onChange and writes the text into draft state.', delta: (s) => ({ draft: { from: str(s.draft), to: str(s.draft || 'Build planner') } }), apply: (s) => ({ ...s, draft: s.draft || 'Build planner' }) },
    { lines: [13], label: '2 · Submit event fires', desc: 'The form calls handleSubmit when the student presses Add.' },
    { lines: [6], label: '3 · Refresh blocked', desc: 'event.preventDefault() stops the browser from reloading the page.', delta: () => ({ refresh: { from: 'not blocked', to: 'blocked' } }), apply: (s) => ({ ...s, refresh: 'blocked' }) },
    { lines: [7], label: '4 · Empty text rejected', desc: 'trim() protects the list from blank tasks.' },
    { lines: [8, 9], label: '5 · Add and clear', desc: 'React gets a new tasks array, then draft resets to empty.', apply: (s) => ({ draft: '', tasks: [...s.tasks, s.draft || 'Build planner'], refresh: 'blocked' }) },
  ],
}

// ---- Week 5: fetch lifecycle ----
const fetchLifecycleTrace = {
  code: `function Planner() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("/tasks.json");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError("Could not load tasks.");
      } finally {
        setIsLoading(false);
      }
    }
    loadTasks();
  }, []);
}`,
  state: { loading: 'true', request: 'none', tasks: '[]', error: 'none' },
  inspector: (s) => [
    { label: 'loading', value: s.loading },
    { label: 'request', value: s.request },
    { label: 'tasks', value: s.tasks },
    { label: 'error', value: s.error },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Fetch preview" start={start} busy={busy}>
      <p>{state.loading === 'true' ? 'Loading…' : state.tasks}</p>
      {state.error !== 'none' && <p className="trace-error">{state.error}</p>}
    </TracePreview>
  ),
  steps: [
    { lines: [6], label: '1 · Component mounts', desc: 'useEffect runs after the first render because of the empty dependency array.' },
    { lines: [9], label: '2 · Request starts', desc: 'fetch asks the pretend API for JSON.', delta: () => ({ request: { from: 'none', to: 'GET /tasks.json' } }), apply: (s) => ({ ...s, request: 'GET /tasks.json' }) },
    { lines: [10], label: '3 · JSON is parsed', desc: 'response.json() converts the response body into JavaScript data.', delta: () => ({ tasks: { from: '[]', to: '[Study JS, Practice React]' } }) },
    { lines: [11], label: '4 · State receives data', desc: 'setTasks(data) stores the loaded tasks and triggers a re-render.', apply: (s) => ({ ...s, tasks: '[Study JS, Practice React]' }) },
    { lines: [15], label: '5 · Loading ends', desc: 'finally runs whether fetch succeeds or fails.', apply: (s) => ({ ...s, loading: 'false' }) },
  ],
}

const fetchLocalServerTrace = {
  code: `const API_URL = "http://localhost:3000/api/tasks";

async function loadTasks() {
  setIsLoading(true);
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Request failed");
  const data = await response.json();
  setTasks(data);
  setIsLoading(false);
}

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});`,
  state: { ui: 'Loading…', request: 'none', server: 'ready', tasks: '[]' },
  inspector: (s) => [
    { label: 'ui', value: s.ui },
    { label: 'request', value: s.request },
    { label: 'server', value: s.server },
    { label: 'tasks', value: s.tasks },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Local API preview" start={start} busy={busy}>
      <p>Frontend: {state.ui}</p>
      <p>Request: {state.request}</p>
      <p>Server: {state.server}</p>
      <p>Tasks: {state.tasks}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [3, 4], label: '1 · React starts loading', desc: 'The page sets loading before asking the local server for data.' },
    { lines: [5], label: '2 · Fetch leaves the frontend', desc: 'The browser sends GET http://localhost:3000/api/tasks.', delta: () => ({ request: { from: 'none', to: 'GET /api/tasks' } }), apply: (s) => ({ ...s, request: 'GET /api/tasks' }) },
    { lines: [12], label: '3 · Express route matches', desc: 'The local Node server receives the request and runs the matching route.', apply: (s) => ({ ...s, server: 'route running' }) },
    { lines: [13], label: '4 · Server sends JSON', desc: 'res.json(tasks) serializes the server array as a response.', delta: () => ({ tasks: { from: '[]', to: '[Study JS, Practice React]' } }) },
    { lines: [7, 8, 9], label: '5 · React renders server data', desc: 'React parses the JSON, stores it in state, and removes Loading.', apply: (s) => ({ ...s, ui: 'Tasks visible', server: 'sent JSON', tasks: '[Study JS, Practice React]' }) },
  ],
}

const fetchDatabaseTrace = {
  code: `const API_URL = "http://localhost:3000/api/tasks";

async function loadTasks() {
  const response = await fetch(API_URL);
  const data = await response.json();
  setTasks(data);
}

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});`,
  state: { request: 'none', backend: 'waiting', database: 'idle', tasks: '[]' },
  inspector: (s) => [
    { label: 'request', value: s.request },
    { label: 'backend', value: s.backend },
    { label: 'database', value: s.database },
    { label: 'tasks', value: s.tasks },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Database API preview" start={start} busy={busy}>
      <p>Backend: {state.backend}</p>
      <p>Database: {state.database}</p>
      <p>Tasks: {state.tasks}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [4], label: '1 · React asks the API', desc: 'The frontend still uses fetch; it does not talk to MongoDB directly.', delta: () => ({ request: { from: 'none', to: 'GET /api/tasks' } }), apply: (s) => ({ ...s, request: 'GET /api/tasks' }) },
    { lines: [9], label: '2 · Express receives request', desc: 'The backend route is the only code allowed to query the database.', apply: (s) => ({ ...s, backend: 'route running' }) },
    { lines: [10], label: '3 · Mongoose reads MongoDB', desc: 'Task.find() asks the database for saved task documents.', delta: () => ({ database: { from: 'idle', to: 'reading tasks' } }), apply: (s) => ({ ...s, database: 'reading tasks' }) },
    { lines: [11], label: '4 · Backend sends JSON', desc: 'Express sends the database documents back as JSON.', apply: (s) => ({ ...s, backend: 'sent JSON', database: 'done', tasks: '[Mongo task, Saved task]' }) },
    { lines: [5, 6], label: '5 · React stores documents', desc: 'React parses the JSON and renders data that came from MongoDB.', apply: (s) => ({ ...s, tasks: '[Mongo task, Saved task]' }) },
  ],
}


// ---- Week 6: Express GET route ----
const expressRouteTrace = {
  code: `const express = require("express");
const app = express();

const tasks = ["Study JS", "Practice React"];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});`,
  state: { server: 'listening', request: 'none', response: 'none' },
  inspector: (s) => [
    { label: 'server', value: s.server },
    { label: 'request', value: s.request },
    { label: 'response', value: s.response },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Express route preview" start={start} busy={busy}>
      <p>Browser asks: <code>/api/tasks</code></p>
      <p>Response: {state.response}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [10], label: '1 · Server is listening', desc: 'app.listen keeps Node running so requests can arrive.' },
    { lines: [6], label: '2 · GET request arrives', desc: 'Express compares the URL and method to registered routes.', delta: () => ({ request: { from: 'none', to: 'GET /api/tasks' } }), apply: (s) => ({ ...s, request: 'GET /api/tasks' }) },
    { lines: [6], label: '3 · Route handler runs', desc: 'The matching callback receives req and res.' },
    { lines: [7], label: '4 · JSON response sent', desc: 'res.json(tasks) serializes the array and ends the response.', apply: (s) => ({ ...s, response: '[Study JS, Practice React]' }) },
  ],
}

// ---- Week 7: POST route and status codes ----
const crudRouteTrace = {
  code: `app.use(express.json());

app.post("/api/tasks", (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res.status(400).json({ error: "title required" });
  }
  const task = { id: Date.now(), title, completed: false };
  tasks.push(task);
  res.status(201).json(task);
});`,
  state: { body: '{ title: "Study" }', status: 'pending', tasks: '[]' },
  inspector: (s) => [
    { label: 'body', value: s.body },
    { label: 'status', value: s.status },
    { label: 'tasks', value: s.tasks },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="POST /api/tasks preview" start={start} busy={busy}>
      <p>Request body: {state.body}</p>
      <p>Status: {state.status}</p>
      <p>Tasks: {state.tasks}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · Body parser runs first', desc: 'express.json() turns the JSON request body into req.body.' },
    { lines: [3, 4], label: '2 · POST handler reads title', desc: 'The route pulls title out of req.body.' },
    { lines: [5, 6], label: '3 · Validation protects the route', desc: 'Bad input gets a 400 instead of silently creating broken data.' },
    { lines: [8, 9], label: '4 · Task is created', desc: 'The server creates a task object and stores it in the in-memory array.', delta: () => ({ tasks: { from: '[]', to: '[Study]' } }), apply: (s) => ({ ...s, tasks: '[Study]' }) },
    { lines: [10], label: '5 · 201 response', desc: '201 means a new resource was created.', apply: (s) => ({ ...s, status: '201 Created' }) },
  ],
}

// ---- Week 8: Mongoose read/create ----
const mongooseTrace = {
  code: `await mongoose.connect(process.env.MONGODB_URI);

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});
const Task = mongoose.model("Task", taskSchema);

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const task = await Task.create({ title: req.body.title, completed: false });
  res.status(201).json(task);
});`,
  state: { db: 'disconnected', model: 'none', result: 'none' },
  inspector: (s) => [
    { label: 'db', value: s.db },
    { label: 'model', value: s.model },
    { label: 'result', value: s.result },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="MongoDB persistence preview" start={start} busy={busy}>
      <p>Database: {state.db}</p>
      <p>Model: {state.model}</p>
      <p>Result: {state.result}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · Connect first', desc: 'The server waits for MongoDB before accepting requests.', apply: (s) => ({ ...s, db: 'connected' }) },
    { lines: [3, 7], label: '2 · Schema becomes model', desc: 'Mongoose uses the schema to create a Task model.', apply: (s) => ({ ...s, model: 'Task' }) },
    { lines: [9, 10], label: '3 · Read from database', desc: 'Task.find() asks MongoDB for saved tasks.', delta: () => ({ result: { from: 'none', to: 'saved tasks' } }) },
    { lines: [14, 15], label: '4 · Create persists', desc: 'Task.create(...) writes a real document that survives server restart.', apply: (s) => ({ ...s, result: 'created document with _id' }) },
  ],
}

// ---- Week 9: MongoDB CRUD update/delete ----
const mongooseCrudTrace = {
  code: `app.put("/api/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  if (!task) return res.status(404).json({ error: "not found" });
  res.json(task);
});

app.delete("/api/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: "not found" });
  res.json({ ok: true });
});`,
  state: { id: 'valid _id', operation: 'PUT', status: 'pending', response: 'none' },
  inspector: (s) => [
    { label: 'id', value: s.id },
    { label: 'operation', value: s.operation },
    { label: 'status', value: s.status },
    { label: 'response', value: s.response },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="MongoDB CRUD preview" start={start} busy={busy}>
      <p>{state.operation} /api/tasks/{state.id}</p>
      <p>Status: {state.status}</p>
      <p>Response: {state.response}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · Route captures :id', desc: 'Express stores the URL id in req.params.id.' },
    { lines: [2, 5], label: '2 · Update asks MongoDB', desc: 'findByIdAndUpdate changes one document by _id.' },
    { lines: [5], label: '3 · { new: true } matters', desc: 'Without it, Mongoose returns the old document.', delta: () => ({ response: { from: 'none', to: 'updated task' } }) },
    { lines: [7], label: '4 · Not found is handled', desc: 'A missing id returns 404 instead of pretending success.' },
    { lines: [8], label: '5 · Updated task returned', desc: 'The client receives the fresh document.', apply: (s) => ({ ...s, status: '200 OK', response: 'updated task' }) },
  ],
}

// ---- Week 10: full-stack React → Express → MongoDB ----
const fullStackTrace = {
  code: `const API_URL = "http://localhost:3000/api/tasks";

async function loadTasks() {
  setIsLoading(true);
  const response = await fetch(API_URL);
  const data = await response.json();
  setTasks(data);
  setIsLoading(false);
}

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});`,
  state: { ui: 'Loading…', request: 'none', backend: 'waiting', tasks: '[]' },
  inspector: (s) => [
    { label: 'ui', value: s.ui },
    { label: 'request', value: s.request },
    { label: 'backend', value: s.backend },
    { label: 'tasks', value: s.tasks },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Full-stack request preview" start={start} busy={busy}>
      <p>React UI: {state.ui}</p>
      <p>Backend: {state.backend}</p>
      <p>Tasks: {state.tasks}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [3, 4], label: '1 · React starts loading', desc: 'The frontend flips its loading state before the request leaves.', apply: (s) => ({ ...s, ui: 'Loading…' }) },
    { lines: [5], label: '2 · Browser sends fetch', desc: 'The request crosses from Vite (:5173) to Express (:3000).', delta: () => ({ request: { from: 'none', to: 'GET /api/tasks' } }), apply: (s) => ({ ...s, request: 'GET /api/tasks' }) },
    { lines: [11], label: '3 · Express route matches', desc: 'The backend receives the HTTP request and runs the route handler.', apply: (s) => ({ ...s, backend: 'route running' }) },
    { lines: [12, 13], label: '4 · MongoDB data returned', desc: 'Task.find() reads saved tasks; res.json sends them back.', apply: (s) => ({ ...s, backend: 'sent JSON', tasks: '[Study JS, Practice React]' }) },
    { lines: [6, 7, 8], label: '5 · React renders data', desc: 'The frontend parses JSON, stores tasks, and leaves Loading.', apply: (s) => ({ ...s, ui: 'Tasks visible', tasks: '[Study JS, Practice React]' }) },
  ],
}


// ---- Additional focused examples for broader week coverage ----
const domUpdateTrace = {
  code: `const title = document.getElementById("title");
title.textContent = "Done";

function App() {
  return <h1>Done</h1>;
}`,
  state: { approach: 'DOM', screen: 'old title' },
  inspector: (s) => [
    { label: 'approach', value: s.approach },
    { label: 'screen', value: s.screen },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="DOM vs React preview" start={start} busy={busy}>
      <MiniCard eyebrow={state.approach} title={state.screen}>
        <p>Both can show text; React keeps the screen tied to component output.</p>
      </MiniCard>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · Find an element', desc: 'Plain DOM code starts by selecting an existing element.' },
    { lines: [2], label: '2 · Mutate the page', desc: 'textContent changes the current DOM node directly.', apply: (s) => ({ ...s, screen: 'Done' }) },
    { lines: [4, 5], label: '3 · React describes output', desc: 'React starts from a component return value instead of manual DOM mutation.', apply: () => ({ approach: 'React', screen: 'Done' }) },
  ],
}

const jsxExpressionTrace = {
  code: `const student = "Sokha";
const skill = "React";

function Badge() {
  return (
    <p className="badge">
      {student} is learning {skill}
    </p>
  );
}`,
  state: { className: 'badge', text: 'literal text' },
  inspector: (s) => [
    { label: 'className', value: s.className },
    { label: 'text', value: s.text },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="JSX expression preview" start={start} busy={busy}>
      <MiniCard eyebrow={`.${state.className}`} title={state.text}>
        <p>Braces read JavaScript values inside JSX.</p>
      </MiniCard>
    </TracePreview>
  ),
  steps: [
    { lines: [1, 2], label: '1 · Values exist in JS', desc: 'student and skill are JavaScript strings.' },
    { lines: [6], label: '2 · className sets CSS class', desc: 'JSX uses className instead of class.', apply: (s) => ({ ...s, className: 'badge' }) },
    { lines: [7], label: '3 · Braces read values', desc: '{student} and {skill} insert JavaScript values into the UI.', apply: (s) => ({ ...s, text: 'Sokha is learning React' }) },
  ],
}

const multipleCardsTrace = {
  code: `const students = [
  { name: "Sokha", skill: "HTML" },
  { name: "Dara", skill: "React" },
];

function App() {
  return students.map((student) => (
    <ProfileCard
      name={student.name}
      skill={student.skill}
    />
  ));
}`,
  state: { data: '2 students', cards: '0 cards' },
  inspector: (s) => [
    { label: 'data', value: s.data },
    { label: 'cards', value: s.cards },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Reusable cards preview" start={start} busy={busy}>
      <p>Cards rendered: {state.cards}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1, 4], label: '1 · Data array exists', desc: 'The parent has two student objects.' },
    { lines: [7], label: '2 · map repeats UI', desc: 'map creates one ProfileCard per student.' },
    { lines: [8, 10], label: '3 · Props change per card', desc: 'The component shape stays the same; the data changes.', apply: (s) => ({ ...s, cards: '2 cards' }) },
  ],
}

const propBugTrace = {
  code: `<ProfileCard Name="Sokha" />

function ProfileCard(props) {
  return <h2>{props.name}</h2>;
}`,
  state: { sent: 'Name', read: 'name', result: 'blank' },
  inspector: (s) => [
    { label: 'sent', value: s.sent },
    { label: 'read', value: s.read },
    { label: 'result', value: s.result },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Prop-name bug preview" start={start} busy={busy}>
      <p>Screen result: {state.result}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · Parent sends Name', desc: 'The prop is capitalized.' },
    { lines: [4], label: '2 · Child reads name', desc: 'The child asks for a different prop name.' },
    { lines: [4], label: '3 · undefined renders blank', desc: 'Props are case-sensitive, so Name and name do not match.', apply: (s) => ({ ...s, result: 'undefined / blank' }) },
  ],
}

const controlledInputTrace = {
  code: `const [draft, setDraft] = useState("");

<input
  value={draft}
  onChange={(event) => setDraft(event.target.value)}
/>`,
  state: { draft: '', input: 'empty' },
  inspector: (s) => [
    { label: 'draft', value: str(s.draft) },
    { label: 'input', value: s.input },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Controlled input preview" start={start} busy={busy}>
      <p>Input shows: {state.input}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · State starts empty', desc: 'draft is the source of truth.' },
    { lines: [5], label: '2 · User types', desc: 'onChange receives the browser event.', delta: () => ({ draft: { from: str(''), to: str('Buy milk') } }) },
    { lines: [4], label: '3 · Value reflects state', desc: 'React re-renders the input with the new draft value.', apply: () => ({ draft: 'Buy milk', input: 'Buy milk' }) },
  ],
}

const formValidationTrace = {
  code: `function handleSubmit(event) {
  event.preventDefault();
  if (draft.trim() === "") return;
  setTasks([...tasks, draft.trim()]);
  setDraft("");
}`,
  state: { draft: '   ', outcome: 'waiting', tasks: '[]' },
  inspector: (s) => [
    { label: 'draft', value: str(s.draft) },
    { label: 'outcome', value: s.outcome },
    { label: 'tasks', value: s.tasks },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Blank-submit guard preview" start={start} busy={busy}>
      <p>Outcome: {state.outcome}</p>
      <p>Tasks: {state.tasks}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [2], label: '1 · Browser refresh blocked', desc: 'preventDefault keeps the app open.' },
    { lines: [3], label: '2 · trim checks blanks', desc: 'Whitespace-only input becomes an empty string.' },
    { lines: [3], label: '3 · Submit stops early', desc: 'No blank task enters the array.', apply: (s) => ({ ...s, outcome: 'rejected blank task' }) },
  ],
}

const nodeServerTrace = {
  code: `const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server running");
});`,
  state: { runtime: 'Node', server: 'stopped' },
  inspector: (s) => [
    { label: 'runtime', value: s.runtime },
    { label: 'server', value: s.server },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Node server preview" start={start} busy={busy}>
      <p>{state.runtime} server is {state.server}.</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · Node loads Express', desc: 'require brings Express into a server file.' },
    { lines: [2], label: '2 · App object created', desc: 'app stores routes and server settings.' },
    { lines: [4], label: '3 · Server listens', desc: 'listen keeps the Node process alive for browser requests.', apply: (s) => ({ ...s, server: 'listening on 3000' }) },
  ],
}

const routePathTrace = {
  code: `app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});`,
  state: { path: '/', response: 'none' },
  inspector: (s) => [
    { label: 'path', value: s.path },
    { label: 'response', value: s.response },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Route matching preview" start={start} busy={busy}>
      <p>Request path: {state.path}</p>
      <p>Response: {state.response}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · Browser asks for /', desc: 'Express checks the path and method.', apply: (s) => ({ ...s, response: 'Home' }) },
    { lines: [5], label: '2 · Browser asks for /api/tasks', desc: 'A different path matches a different route.', delta: () => ({ path: { from: '/', to: '/api/tasks' } }), apply: (s) => ({ ...s, path: '/api/tasks' }) },
    { lines: [6], label: '3 · API returns JSON', desc: 'API routes usually send data, not HTML text.', apply: (s) => ({ ...s, response: '[Study JS, Practice React]' }) },
  ],
}

const crudReadTrace = {
  code: `app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "not found" });
  res.json(task);
});`,
  state: { route: 'GET all', status: 'pending', response: 'none' },
  inspector: (s) => [
    { label: 'route', value: s.route },
    { label: 'status', value: s.status },
    { label: 'response', value: s.response },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Read routes preview" start={start} busy={busy}>
      <p>{state.route}: {state.status}</p>
      <p>{state.response}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1, 2], label: '1 · GET all tasks', desc: 'The collection route returns the whole array.', apply: (s) => ({ ...s, status: '200 OK', response: '[all tasks]' }) },
    { lines: [5, 6], label: '2 · GET one task', desc: 'The :id route reads req.params.id and searches the array.', apply: (s) => ({ ...s, route: 'GET by id' }) },
    { lines: [7], label: '3 · Missing id returns 404', desc: 'Not-found is a normal API response, not a crash.', apply: (s) => ({ ...s, status: '404 Not Found', response: '{ error: "not found" }' }) },
  ],
}

const crudUpdateTrace = {
  code: `app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "not found" });
  task.completed = req.body.completed;
  res.json(task);
});`,
  state: { completed: 'false', status: 'pending' },
  inspector: (s) => [
    { label: 'completed', value: s.completed },
    { label: 'status', value: s.status },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="PUT route preview" start={start} busy={busy}>
      <p>completed: {state.completed}</p>
      <p>Status: {state.status}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1, 2], label: '1 · Route finds task', desc: 'PUT targets one resource by id.' },
    { lines: [3], label: '2 · 404 guard protects route', desc: 'Missing tasks get a clear response.' },
    { lines: [4], label: '3 · Field updates', desc: 'The server changes the requested field.', delta: () => ({ completed: { from: 'false', to: 'true' } }) },
    { lines: [5], label: '4 · Updated task returned', desc: 'The API returns the new task state.', apply: () => ({ completed: 'true', status: '200 OK' }) },
  ],
}

const crudDeleteTrace = {
  code: `app.delete("/api/tasks/:id", (req, res) => {
  const before = tasks.length;
  tasks = tasks.filter((task) => task.id !== Number(req.params.id));
  if (tasks.length === before) {
    return res.status(404).json({ error: "not found" });
  }
  res.json({ ok: true });
});`,
  state: { tasks: '3 tasks', status: 'pending' },
  inspector: (s) => [
    { label: 'tasks', value: s.tasks },
    { label: 'status', value: s.status },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="DELETE route preview" start={start} busy={busy}>
      <p>{state.tasks}</p>
      <p>Status: {state.status}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [2], label: '1 · Count before delete', desc: 'The route remembers the old length.' },
    { lines: [3], label: '2 · Filter removes one task', desc: 'The new array keeps every task except the matching id.', delta: () => ({ tasks: { from: '3 tasks', to: '2 tasks' } }) },
    { lines: [4, 5], label: '3 · 404 if nothing changed', desc: 'If the length stayed the same, no task matched.' },
    { lines: [7], label: '4 · Success response', desc: 'The API confirms deletion.', apply: () => ({ tasks: '2 tasks', status: '200 OK' }) },
  ],
}

const mongooseConnectTrace = {
  code: `mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));`,
  state: { db: 'disconnected', server: 'waiting' },
  inspector: (s) => [
    { label: 'db', value: s.db },
    { label: 'server', value: s.server },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Mongo connection preview" start={start} busy={busy}>
      <p>Database: {state.db}</p>
      <p>Server: {state.server}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · Connect called', desc: 'The server uses the MongoDB URI from environment variables.' },
    { lines: [2], label: '2 · Success path', desc: 'A successful connection means routes can use the database.', apply: () => ({ db: 'connected', server: 'ready' }) },
    { lines: [3], label: '3 · Failure path exists', desc: 'Connection errors should be visible during startup.' },
  ],
}

const mongooseModelTrace = {
  code: `const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);`,
  state: { schema: 'none', model: 'none', defaults: 'not applied' },
  inspector: (s) => [
    { label: 'schema', value: s.schema },
    { label: 'model', value: s.model },
    { label: 'defaults', value: s.defaults },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Schema/model preview" start={start} busy={busy}>
      <p>Schema: {state.schema}</p>
      <p>Model: {state.model}</p>
      <p>Defaults: {state.defaults}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1, 4], label: '1 · Schema defines shape', desc: 'title is required; completed has a default.' , apply: (s) => ({ ...s, schema: 'Task shape' }) },
    { lines: [6], label: '2 · Model created', desc: 'The Task model is the API for that MongoDB collection.', apply: (s) => ({ ...s, model: 'Task' }) },
    { lines: [3], label: '3 · Default applies on create', desc: 'New tasks can omit completed and still get false.', apply: (s) => ({ ...s, defaults: 'completed=false' }) },
  ],
}

const mongoFindByIdTrace = {
  code: `app.get("/api/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: "not found" });
  res.json(task);
});`,
  state: { id: 'valid _id', status: 'pending', response: 'none' },
  inspector: (s) => [
    { label: 'id', value: s.id },
    { label: 'status', value: s.status },
    { label: 'response', value: s.response },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Find by _id preview" start={start} busy={busy}>
      <p>Status: {state.status}</p>
      <p>Response: {state.response}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · URL carries _id', desc: 'The document id comes from req.params.id.' },
    { lines: [2], label: '2 · Mongoose searches', desc: 'findById asks MongoDB for one matching document.', delta: () => ({ response: { from: 'none', to: 'task document' } }) },
    { lines: [3], label: '3 · Missing task handled', desc: 'No match becomes 404.' },
    { lines: [4], label: '4 · Task returned', desc: 'A match returns JSON.', apply: () => ({ id: 'valid _id', status: '200 OK', response: 'task document' }) },
  ],
}

const invalidObjectIdTrace = {
  code: `if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ error: "invalid id" });
}

const task = await Task.findById(req.params.id);`,
  state: { id: 'abc', status: 'pending', query: 'not run' },
  inspector: (s) => [
    { label: 'id', value: s.id },
    { label: 'status', value: s.status },
    { label: 'query', value: s.query },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="Invalid ObjectId preview" start={start} busy={busy}>
      <p>ID: {state.id}</p>
      <p>Status: {state.status}</p>
      <p>Mongo query: {state.query}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [1], label: '1 · Validate id shape', desc: 'Malformed ids should be caught before MongoDB is queried.' },
    { lines: [2], label: '2 · Return 400', desc: '400 means the client sent an invalid id format.', apply: (s) => ({ ...s, status: '400 Bad Request' }) },
    { lines: [5], label: '3 · Query skipped', desc: 'The database call does not run for abc.', apply: (s) => ({ ...s, query: 'skipped' }) },
  ],
}

const corsTrace = {
  code: `const cors = require("cors");
app.use(cors());

// React: http://localhost:5173
// API:   http://localhost:3000`,
  state: { frontend: ':5173', backend: ':3000', browser: 'blocked' },
  inspector: (s) => [
    { label: 'frontend', value: s.frontend },
    { label: 'backend', value: s.backend },
    { label: 'browser', value: s.browser },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="CORS preview" start={start} busy={busy}>
      <p>{state.frontend} → {state.backend}</p>
      <p>Browser: {state.browser}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [4, 5], label: '1 · Different ports', desc: 'The browser treats different ports as different origins.' },
    { lines: [1, 2], label: '2 · Backend enables CORS', desc: 'Express adds headers that allow the frontend request.', apply: (s) => ({ ...s, browser: 'allowed' }) },
  ],
}

const reactPostTrace = {
  code: `await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: draft }),
});`,
  state: { method: 'GET default', header: 'none', body: 'none' },
  inspector: (s) => [
    { label: 'method', value: s.method },
    { label: 'header', value: s.header },
    { label: 'body', value: s.body },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="React POST preview" start={start} busy={busy}>
      <p>Method: {state.method}</p>
      <p>Header: {state.header}</p>
      <p>Body: {state.body}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [2], label: '1 · Method changes to POST', desc: 'POST tells Express to create a task.', apply: (s) => ({ ...s, method: 'POST' }) },
    { lines: [3], label: '2 · JSON header added', desc: 'Content-Type tells Express how to parse the body.', apply: (s) => ({ ...s, header: 'application/json' }) },
    { lines: [4], label: '3 · Body stringified', desc: 'React sends JSON text over HTTP.', apply: (s) => ({ ...s, body: '{ title: draft }' }) },
  ],
}

const reactDeleteTrace = {
  code: `async function deleteTask(task) {
  await fetch(API_URL + "/" + task._id, {
    method: "DELETE",
  });
  setTasks(tasks.filter((item) => item._id !== task._id));
}`,
  state: { url: '/api/tasks', method: 'GET default', ui: 'task visible' },
  inspector: (s) => [
    { label: 'url', value: s.url },
    { label: 'method', value: s.method },
    { label: 'ui', value: s.ui },
  ],
  live: ({ state, start, busy }) => (
    <TracePreview title="React DELETE preview" start={start} busy={busy}>
      <p>{state.method} {state.url}</p>
      <p>UI: {state.ui}</p>
    </TracePreview>
  ),
  steps: [
    { lines: [2], label: '1 · URL uses task._id', desc: 'MongoDB tasks use _id, not the old id field.', apply: (s) => ({ ...s, url: '/api/tasks/:_id' }) },
    { lines: [3], label: '2 · DELETE method sent', desc: 'The backend receives a delete request for one document.', apply: (s) => ({ ...s, method: 'DELETE' }) },
    { lines: [5], label: '3 · UI removes task', desc: 'After the API succeeds, React removes the deleted task from state.', apply: (s) => ({ ...s, ui: 'task removed' }) },
  ],
}

const traces = {
  profileCard: profileCardTrace,
  domUpdate: domUpdateTrace,
  jsxExpression: jsxExpressionTrace,
  propsFlow: propsTrace,
  multipleCards: multipleCardsTrace,
  propBug: propBugTrace,
  counter: counterTrace,
  taskList: taskListTrace,
  controlledInput: controlledInputTrace,
  controlledForm: controlledFormTrace,
  formValidation: formValidationTrace,
  fetchLifecycle: fetchLifecycleTrace,
  fetchLocalServer: fetchLocalServerTrace,
  fetchDatabase: fetchDatabaseTrace,
  nodeServer: nodeServerTrace,
  expressRoute: expressRouteTrace,
  routePath: routePathTrace,
  crudRead: crudReadTrace,
  crudRoute: crudRouteTrace,
  crudUpdate: crudUpdateTrace,
  crudDelete: crudDeleteTrace,
  mongooseConnect: mongooseConnectTrace,
  mongooseModel: mongooseModelTrace,
  mongooseReadCreate: mongooseTrace,
  mongoFindById: mongoFindByIdTrace,
  mongooseCrud: mongooseCrudTrace,
  invalidObjectId: invalidObjectIdTrace,
  cors: corsTrace,
  fullStackFetch: fullStackTrace,
  reactPost: reactPostTrace,
  reactDelete: reactDeleteTrace,
}

export default traces
