import { useState, useEffect } from 'react'
import { highlight } from '../lib/prism.js'

// A "debugger-style" demo. Given a config (see components/demos/traces.jsx) it
// shows the source on the left with the active line highlighted, and on the
// right: the live element, a state inspector, and a step list. Stepping through
// reveals what happens on an interaction — event → handler → setState → re-render.
//
// config shape:
//   code: string
//   state: initial state object
//   live: ({ state, update, start, busy }) => ReactNode  // the interactive element
//     - update(partial): shallow-merge into state (e.g. typing into an input)
//     - start(): begin the trace; busy is true while it runs
//   inspector: (state) => [{ label, value }]
//   steps: [{ lines:[n], label, desc, delta?:(s)=>({key:{from,to}}), apply?:(s)=>newState }]
//     - delta is MERGED across steps (so two pending changes can show together)
//       and cleared when an apply commits the new state.

function CodePane({ code, activeLines }) {
  const lines = code.split('\n')
  return (
    <div className="trace-code">
      {lines.map((line, i) => {
        const n = i + 1
        const active = activeLines.includes(n)
        const html = highlight(line.length ? line : ' ', 'jsx')
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

export default function TracedDemo({ config }) {
  const steps = config.steps
  const [state, setState] = useState(config.state)
  const [step, setStep] = useState(0) // number of steps revealed (0 = idle)
  const [delta, setDelta] = useState(null) // { key: { from, to } } shown during setState
  const [auto, setAuto] = useState(false)

  const atEnd = step >= steps.length
  const running = auto || (step > 0 && !atEnd)
  const current = step > 0 ? steps[step - 1] : null
  const activeLines = current ? current.lines : []

  function update(partial) {
    setState((s) => ({ ...s, ...partial }))
  }

  function advance() {
    if (step >= steps.length) {
      setAuto(false)
      return
    }
    const next = steps[step] // 0-based index of the step we're entering
    if (next.delta) setDelta((prev) => ({ ...(prev || {}), ...next.delta(state) }))
    if (next.apply) {
      setState(next.apply(state))
      setDelta(null) // values are committed now, so stop showing "from → to"
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

  // Auto-play: advance one step per second while `auto` is on.
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

  return (
    <div className="traced">
      <div className="traced-grid">
        <CodePane code={config.code} activeLines={activeLines} />

        <div className="traced-side">
          <div className="traced-live">{config.live({ state, update, start, busy: running })}</div>

          <div className="inspector">
            <div className="inspector-label">State</div>
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
              const status =
                i === step - 1 ? 'active' : i < step - 1 ? 'done' : 'pending'
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
            Tip: click the element above, or press <strong>Step ▶</strong> to walk through one
            line at a time.
          </p>
        </div>
      </div>
    </div>
  )
}
