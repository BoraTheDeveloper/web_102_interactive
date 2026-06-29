// Week 3 content. This is plain data — no app logic lives here.
// Mirrors js_learning_materials/week_03_events_state_and_array_updates.md
// and adds an interactive practice layer.
//
// Block / exercise shapes are documented in ../schema.js

const week03 = {
  id: 3,
  slug: 'week-03',
  available: true,
  title: 'State & User Interaction',
  subtitle: 'Events, State, and Array Updates',
  goal: 'Understand the JavaScript behind React state and user interaction — events, event handlers, useState, and the immutable array updates (spread and .map()) that React relies on.',

  // ---- Theory: ordered blocks of prose ("p") and code ("code") ----
  theory: [
    { kind: 'p', text: 'An **event** is something the user does — for example clicking a button, typing in an input, or submitting a form.' },
    { kind: 'p', text: 'In React, an **event handler** is a function that runs after an event happens.' },
    { kind: 'code', code: `function handleClick() {\n  console.log("Button clicked");\n}` },
    { kind: 'p', text: '**State** stores data that can change on the screen. In React we create it with `useState`.' },
    { kind: 'code', code: `const [count, setCount] = useState(0);` },
    { kind: 'p', text: 'When state changes, React automatically updates the UI to match.' },
    { kind: 'p', text: 'For arrays, React expects you to create a **new** array instead of changing the old one directly. The spread syntax `...tasks` copies the old values into a new array.' },
    { kind: 'code', code: `const tasks = ["Study JS", "Practice React"];\nconst newTasks = [...tasks, "Build planner"];` },
    { kind: 'p', text: '`.map()` runs a function on every item and returns a **new array** with the results. In React, `.map()` is how you turn a list of data into a list of elements.' },
    { kind: 'code', code: `const tasks = ["Study JS", "Practice React"];\nconst louder = tasks.map((task) => task.toUpperCase());\n// ["STUDY JS", "PRACTICE REACT"]` },
    { kind: 'code', lang: 'jsx', code: `function TaskList({ tasks }) {\n  return (\n    <div>\n      {tasks.map((task) => (\n        <p>{task}</p>\n      ))}\n    </div>\n  );\n}` },
  ],

  // ---- Examples: read + run. Plain-JS examples are runnable in the browser. ----
  examples: [
    {
      id: 'ex-plain-counter',
      title: 'Plain JavaScript: a counter',
      caption: 'Run this. Each call to increaseCount adds 1 and logs the new value.',
      runnable: true,
      code: `let count = 0;\n\nfunction increaseCount() {\n  count = count + 1;\n  console.log(count);\n}\n\nincreaseCount();\nincreaseCount();`,
    },
    {
      id: 'demo-counter',
      title: 'A click, step by step (debugger view)',
      caption: 'Click the button — or press Step ▶ — to watch what happens inside React: the event fires, the handler runs, setState queues the new value, and only then does the screen re-render.',
      tracedDemo: 'counter',
    },
    {
      id: 'demo-tasklist',
      title: 'Updating an array in state, step by step (debugger view)',
      caption: 'Type a task and press Add — or Step ▶ — to watch one click change two pieces of state: tasks gets a new item (via [...tasks, draft]) and draft clears, then the list re-renders with .map().',
      tracedDemo: 'taskList',
    },
  ],

  // ---- Practice: interactive. type = predict | code | quiz ----
  practice: [
    {
      id: 'predict-counter',
      type: 'predict',
      title: 'Predict the output',
      prompt: 'Before running it, write down what you think this code prints. Then run it and compare.',
      code: `let count = 0;\n\nfunction increaseCount() {\n  count = count + 1;\n  console.log(count);\n}\n\nincreaseCount();\nincreaseCount();`,
    },
    {
      id: 'ex1-count',
      type: 'code',
      title: 'Exercise 1 — Counting',
      prompt: 'Finish `increaseCount` so it adds 1 to `count`. It is called three times, so the final value of `count` should be **3**.',
      starter: `let count = 0;\n\nfunction increaseCount() {\n  // your code here\n}\n\nincreaseCount();\nincreaseCount();\nincreaseCount();`,
      // harness runs after the student's code; __CHECK__ line is read by the grader and hidden from output
      harness: `console.log('__CHECK__' + JSON.stringify(count));`,
      expected: 3,
      hints: [
        'Inside the function, change the value of count.',
        'count = count + 1 increases it by one each time the function runs.',
      ],
      solution: `let count = 0;\n\nfunction increaseCount() {\n  count = count + 1;\n}\n\nincreaseCount();\nincreaseCount();\nincreaseCount();`,
    },
    {
      id: 'ex2-spread',
      type: 'code',
      title: 'Exercise 2 — Add with spread syntax',
      prompt: 'Change the marked line so `newTasks` is a new array equal to `["Study JS", "Practice React", "Build planner"]`, using spread syntax.',
      starter: `const tasks = ["Study JS", "Practice React"];\n\n// make newTasks add "Build planner" to the end, using ...tasks\nconst newTasks = tasks; // <-- change this line`,
      harness: `console.log('__CHECK__' + JSON.stringify(newTasks));`,
      expected: ['Study JS', 'Practice React', 'Build planner'],
      hints: [
        'Use square brackets to build a new array: [ ... , ... ]',
        'Spread the old array first, then add the new item: [...tasks, "Build planner"]',
      ],
      solution: `const tasks = ["Study JS", "Practice React"];\n\nconst newTasks = [...tasks, "Build planner"];`,
    },
    {
      id: 'ex3-map',
      type: 'code',
      title: 'Exercise 3 — Immutable update with .map()',
      prompt: 'Create `updatedTasks` where the **first** task has `isCompleted: true`, without changing the original `tasks` array.',
      starter: `const tasks = [\n  { title: "Study JS", isCompleted: false },\n  { title: "Practice React", isCompleted: false }\n];\n\n// build updatedTasks with the first task completed\nconst updatedTasks = tasks; // <-- change this line`,
      harness: `console.log('__CHECK__' + JSON.stringify(updatedTasks));`,
      expected: [
        { title: 'Study JS', isCompleted: true },
        { title: 'Practice React', isCompleted: false },
      ],
      hints: [
        'Use tasks.map((task, index) => { ... }) to return a new array.',
        'When index === 0, return { ...task, isCompleted: true }. Otherwise return task unchanged.',
      ],
      solution: `const tasks = [\n  { title: "Study JS", isCompleted: false },\n  { title: "Practice React", isCompleted: false }\n];\n\nconst updatedTasks = tasks.map((task, index) => {\n  if (index === 0) {\n    return { ...task, isCompleted: true };\n  }\n  return task;\n});`,
    },
    {
      id: 'quiz-tasklist',
      type: 'quiz',
      title: 'Read the React code',
      intro: 'Read this component carefully, then answer the questions.',
      code: `function TaskList() {\n  const [tasks, setTasks] = useState(["Study JS"]);\n\n  function addTask() {\n    setTasks([...tasks, "Practice React"]);\n  }\n\n  return (\n    <div>\n      <button onClick={addTask}>Add Task</button>\n      {tasks.map((task) => (\n        <p>{task}</p>\n      ))}\n    </div>\n  );\n}`,
      questions: [
        {
          q: 'What happens when the button is clicked?',
          options: [
            '"Practice React" is added to the list and the screen updates',
            'The first task is deleted',
            'Nothing happens until the page reloads',
          ],
          answerIndex: 0,
          explanation: 'addTask calls setTasks with a new array containing the old tasks plus "Practice React". Updating state re-renders the component.',
        },
        {
          q: 'Why does the code use [...tasks, "Practice React"]?',
          options: [
            'To create a NEW array with the old tasks plus the new one (instead of mutating the old array)',
            'To remove items from tasks',
            'To sort the tasks alphabetically',
          ],
          answerIndex: 0,
          explanation: 'React relies on a new array reference to detect the change. The spread copies the existing tasks, then we add one more.',
        },
        {
          q: 'What does .map() do here?',
          options: [
            'Turns each task string into a <p> element to display',
            'Adds the task numbers together',
            'Sends the tasks to an API',
          ],
          answerIndex: 0,
          explanation: '.map() returns a new array of <p> elements, one per task — this is how React renders a list.',
        },
      ],
    },
  ],

  // ---- Feynman check: explain it simply. Each has a model answer to reveal. ----
  feynman: [
    { q: 'What is an event?', a: 'Something the user does in the page — a click, a keystroke, a form submit. React lets you run a function in response to it.' },
    { q: 'What is an event handler?', a: 'A function that runs after an event happens, e.g. onClick={handleClick}.' },
    { q: 'Why does React use state?', a: 'To store data that can change. When state changes, React re-renders the UI so the screen always matches the data.' },
    { q: 'Why do we create a new array instead of changing the old one?', a: 'React compares references to know what changed. A brand-new array (via spread or .map()) signals "this data changed" so the UI updates reliably.' },
    { q: 'What does .map() do, and how is it different from a for loop?', a: '.map() runs a function on every item and returns a new array of the results. A for loop just repeats statements; .map() is an expression that produces a value, which is why it fits inside JSX.' },
  ],

}

export default week03
