import { useState, useEffect } from 'react'
import { highlight } from '../lib/prism.js'

// Python "debugger-style" trace. Source on the left with the active line
// highlighted; on the right: an optional visual, a console that accumulates
// output, a variable inspector, and the step list. Trace style:
//   line -> variable change -> output
//
// config shape:
//   code: string
//   state: initial state object (typically { <vars>, output: [] })
//   visual?: (state) => ReactNode   // optional small preview (e.g. a board)
//   inspector: (state) => [{ label, value }]
//   steps: [{ lines:[n], label, desc, delta?:(s)=>({key:{from,to}}), apply?:(s)=>newState }]

function CodePane({ code, activeLines }) {
  const lines = code.split('\n')
  return (
    <div className="trace-code">
      {lines.map((line, i) => {
        const n = i + 1
        const active = activeLines.includes(n)
        const html = highlight(line.length ? line : ' ', 'python')
        return (
          <div key={i} className={'trace-line' + (active ? ' trace-line--active' : '')}>
            <span className="trace-ln">{n}</span>
            <code className="trace-src" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )
      })}
    </div>
  )
}

export default function PythonTrace({ config }) {
  const steps = config.steps
  const [state, setState] = useState(config.state)
  const [step, setStep] = useState(0)
  const [delta, setDelta] = useState(null)
  const [auto, setAuto] = useState(false)

  const atEnd = step >= steps.length
  const running = auto || (step > 0 && !atEnd)
  const current = step > 0 ? steps[step - 1] : null
  const activeLines = current ? current.lines : []

  function advance() {
    if (step >= steps.length) {
      setAuto(false)
      return
    }
    const next = steps[step]
    if (next.delta) setDelta((prev) => ({ ...(prev || {}), ...next.delta(state) }))
    if (next.apply) {
      setState(next.apply(state))
      setDelta(null)
    }
    setStep(step + 1)
  }

  function start() {
    setDelta(null)
    setStep(0)
    setAuto(true)
  }

  function reset() {
    setAuto(false)
    setStep(0)
    setDelta(null)
  }

  useEffect(() => {
    if (!auto) return
    if (step >= steps.length) {
      setAuto(false)
      return
    }
    const id = setTimeout(advance, 1000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, step])

  const consoleText = Array.isArray(state.output)
    ? state.output.join('\n')
    : typeof state.output === 'string'
      ? state.output
      : ''

  return (
    <div className="traced">
      <div className="traced-grid">
        <CodePane code={config.code} activeLines={activeLines} />

        <div className="traced-side">
          {config.visual && <div className="traced-live">{config.visual(state)}</div>}

          <div className="console">
            <div className="console-label">Console</div>
            <pre className="console-body">{consoleText || '(nothing printed yet)'}</pre>
          </div>

          <div className="inspector">
            <div className="inspector-label">Variables</div>
            <div className="inspector-pills">
              {config.inspector(state).map((p) => {
                const d = delta && delta[p.label]
                return (
                  <div className={'pill' + (d ? ' pill--changing' : '')} key={p.label}>
                    <span className="pill-key">{p.label}</span>
                    <span className="pill-val">{d ? `${d.from} → ${d.to}` : String(p.value)}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <ol className="trace-steps">
            {steps.map((s, i) => {
              const status = i === step - 1 ? 'active' : i < step - 1 ? 'done' : 'pending'
              return (
                <li key={i} className={'trace-step trace-step--' + status}>
                  <div className="trace-step-label">{s.label}</div>
                  {status === 'active' && <p className="trace-step-desc">{s.desc}</p>}
                </li>
              )
            })}
          </ol>

          <div className="run-bar">
            <button className="btn btn--primary" onClick={advance} disabled={atEnd || auto}>
              Step ▶
            </button>
            <button className="btn btn--ghost" onClick={() => setAuto(true)} disabled={auto || atEnd}>
              Auto-play
            </button>
            <button className="btn btn--ghost" onClick={reset} disabled={step === 0 && !auto}>
              Reset
            </button>
          </div>
          <p className="trace-tip">
            Press <strong>Step ▶</strong> to walk through one line at a time and watch the variables change.
          </p>
        </div>
      </div>
    </div>
  )
}
