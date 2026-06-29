import { useState } from 'react'
import CodeBlock from './CodeBlock.jsx'
import OutputPanel from './OutputPanel.jsx'
import { runUserCode } from '../lib/runner.js'

export default function RunnableExample({ code }) {
  const [result, setResult] = useState(null)
  const [running, setRunning] = useState(false)

  async function run() {
    setRunning(true)
    const res = await runUserCode(code)
    setRunning(false)
    setResult(res)
  }

  return (
    <div className="runnable">
      <CodeBlock code={code} />
      <div className="run-bar">
        <button className="btn btn--primary" onClick={run} disabled={running}>
          {running ? 'Running…' : 'Run ▶'}
        </button>
      </div>
      {result && <OutputPanel result={result} />}
    </div>
  )
}
