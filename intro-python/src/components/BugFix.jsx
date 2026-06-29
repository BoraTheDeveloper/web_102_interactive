import { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor.jsx'
import CodeBlock from './CodeBlock.jsx'
import OutputPanel from './OutputPanel.jsx'
import RichText from './RichText.jsx'
import { runPython, preloadPyodide, CHECK_PREFIX } from '../lib/pyodideRunner.js'
import { deepEqual } from '../lib/equal.js'

// Editable Python exercise graded by a real Pyodide run.
// item shape: { title, prompt, starter, check, hints, solution }
//   check: { kind: 'stdout', expected }
//        | { kind: 'noError' }
//        | { kind: 'expr', expr, expected }   // expr is a Python expression

function norm(s) {
  return String(s)
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '')
}

export default function BugFix({ item }) {
  const [code, setCode] = useState(item.starter)
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState(null) // 'pass' | 'fail' | 'error'
  const [running, setRunning] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  // Start loading Pyodide on mount so the first Run is fast.
  useEffect(() => {
    preloadPyodide()
  }, [])

  async function check() {
    setRunning(true)
    const checkCfg = item.check || { kind: 'noError' }
    let toRun = code
    if (checkCfg.kind === 'expr') {
      toRun =
        code + '\nimport json as __json\nprint("' + CHECK_PREFIX + '" + __json.dumps(' + checkCfg.expr + '))'
    }
    const res = await runPython(toRun, item.stdin)
    setRunning(false)
    setResult(res)

    if (res.error) {
      setStatus('error')
      return
    }

    let pass = false
    if (checkCfg.kind === 'stdout') {
      pass = norm(res.output) === norm(checkCfg.expected)
    } else if (checkCfg.kind === 'noError') {
      pass = true
    } else if (checkCfg.kind === 'expr') {
      const line = (res.output || '').split('\n').find((l) => l.startsWith(CHECK_PREFIX))
      if (!line) {
        setStatus('error')
        return
      }
      try {
        pass = deepEqual(JSON.parse(line.slice(CHECK_PREFIX.length)), checkCfg.expected)
      } catch {
        setStatus('error')
        return
      }
    }
    setStatus(pass ? 'pass' : 'fail')
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
      {item.prompt && (
        <p className="exercise-prompt">
          <RichText>{item.prompt}</RichText>
        </p>
      )}

      <CodeEditor value={code} onChange={setCode} minRows={minRows} />

      <div className="run-bar">
        <button className="btn btn--primary" onClick={check} disabled={running}>
          {running ? 'Running… (loading Python first run)' : 'Run & check'}
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

      {status === 'pass' && <div className="feedback feedback--pass">Fixed — nicely done.</div>}
      {status === 'fail' && (
        <div className="feedback feedback--fail">Not quite. Check the output below, then try a hint.</div>
      )}
      {status === 'error' && (
        <div className="feedback feedback--fail">Your code raised an error. Read the traceback below.</div>
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
