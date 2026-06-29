import { useState } from 'react'
import CodeEditor from '../CodeEditor.jsx'
import CodeBlock from '../CodeBlock.jsx'
import OutputPanel from '../OutputPanel.jsx'
import RichText from '../RichText.jsx'
import { runUserCode, CHECK_PREFIX } from '../../lib/runner.js'
import { deepEqual } from '../../lib/equal.js'

export default function CodeExercise({ item }) {
  const [code, setCode] = useState(item.starter)
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState(null) // 'pass' | 'fail' | 'error'
  const [running, setRunning] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  async function check() {
    setRunning(true)
    const fullCode = code + '\n;\n' + item.harness
    const res = await runUserCode(fullCode)
    setRunning(false)
    setResult(res)

    if (res.error) {
      setStatus('error')
      return
    }
    const checkLine = (res.logs || []).find((l) => l.startsWith(CHECK_PREFIX))
    if (!checkLine) {
      setStatus('error')
      return
    }
    let value
    try {
      value = JSON.parse(checkLine.slice(CHECK_PREFIX.length))
    } catch {
      setStatus('error')
      return
    }
    setStatus(deepEqual(value, item.expected) ? 'pass' : 'fail')
  }

  function reset() {
    setCode(item.starter)
    setResult(null)
    setStatus(null)
    setShowSolution(false)
    setHintsShown(0)
  }

  const hints = item.hints || []
  const minRows = Math.max(6, code.split('\n').length + 1)

  return (
    <div className={'exercise' + (status === 'pass' ? ' exercise--pass' : '')}>
      <h4 className="exercise-title">
        {item.title}
        {status === 'pass' && <span className="badge badge--pass">Passed ✓</span>}
      </h4>
      <p className="exercise-prompt">
        <RichText>{item.prompt}</RichText>
      </p>

      <CodeEditor value={code} onChange={setCode} minRows={minRows} />

      <div className="run-bar">
        <button className="btn btn--primary" onClick={check} disabled={running}>
          {running ? 'Checking…' : 'Run & check'}
        </button>
        {hints.length > 0 && hintsShown < hints.length && (
          <button className="btn btn--ghost" onClick={() => setHintsShown((n) => n + 1)}>
            Show hint
          </button>
        )}
        <button className="btn btn--ghost" onClick={() => setShowSolution((s) => !s)}>
          {showSolution ? 'Hide solution' : 'Show solution'}
        </button>
        <button className="btn btn--ghost" onClick={reset}>
          Reset
        </button>
      </div>

      {status === 'pass' && (
        <div className="feedback feedback--pass">Correct — nicely done.</div>
      )}
      {status === 'fail' && (
        <div className="feedback feedback--fail">
          Not quite. Check the output below, then try a hint.
        </div>
      )}
      {status === 'error' && (
        <div className="feedback feedback--fail">
          Your code didn’t run. See the error below.
        </div>
      )}

      {result && <OutputPanel result={result} hideChecks />}

      {hintsShown > 0 && (
        <ul className="hints">
          {hints.slice(0, hintsShown).map((h, i) => (
            <li key={i}>
              <RichText>{h}</RichText>
            </li>
          ))}
        </ul>
      )}

      {showSolution && (
        <div className="solution">
          <div className="output-label">Solution</div>
          <CodeBlock code={item.solution} />
        </div>
      )}
    </div>
  )
}
