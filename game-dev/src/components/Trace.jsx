import { useState, useEffect, useRef } from 'react'
import { highlight } from '../lib/prism.js'
import { clear, drawRect, drawCircle, drawText } from '../lib/canvas.js'

// Generic step trace for Game Dev. Source on the left with the active line
// highlighted; on the right: an optional Canvas scene, a variable inspector,
// and the step list. Trace style: frame -> input -> update -> collision -> draw.
//
// config shape:
//   code: string
//   state: initial state object
//   sceneKind?: 'spaceShooter'        // built-in scene renderer
//   render?: (ctx, state, w, h) => void  // custom canvas renderer (else none)
//   inspector: (state) => [{ label, value }]
//   steps: [{ lines:[n], label, desc, frame?, delta?:(s)=>({key:{from,to}}), apply?:(s)=>newState }]

const SCENE_W = 480
const SCENE_H = 300

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

// Built-in Space Shooter scene: player + meteors + lasers + score.
function drawSpaceShooter(ctx, s, w, h) {
  clear(ctx, w, h, '#3a2e3f')
  // static starfield (deterministic from index)
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  for (let i = 0; i < 30; i++) {
    const sx = (i * 73) % w
    const sy = (i * 137) % h
    ctx.fillRect(sx, sy, 2, 2)
  }
  // meteors
  ;(s.meteors || []).forEach((m) => {
    drawCircle(ctx, m.x, m.y, m.r || 14, '#9c7a5a')
  })
  // lasers
  ;(s.lasers || []).forEach((l) => {
    drawRect(ctx, l.x - 2, l.y - 8, 4, 16, '#7cf6ff')
  })
  // player
  if (s.player) {
    const { x, y } = s.player
    ctx.fillStyle = '#dfe6f2'
    ctx.beginPath()
    ctx.moveTo(x, y - 14)
    ctx.lineTo(x - 12, y + 12)
    ctx.lineTo(x + 12, y + 12)
    ctx.closePath()
    ctx.fill()
  }
  drawText(ctx, String(s.score ?? 0), w / 2 - 10, 34, '#f0f0f0', 'bold 22px JetBrains Mono')
  drawText(ctx, `frame ${s.frame ?? 0}`, 10, 20, 'rgba(255,255,255,0.6)')
}

export default function Trace({ config }) {
  const steps = config.steps
  const [state, setState] = useState(config.state)
  const [step, setStep] = useState(0)
  const [delta, setDelta] = useState(null)
  const [auto, setAuto] = useState(false)
  const canvasRef = useRef(null)

  const atEnd = step >= steps.length
  const running = auto || (step > 0 && !atEnd)
  const current = step > 0 ? steps[step - 1] : null
  const activeLines = current ? current.lines : []
  const currentFrame = current ? current.frame : null

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

  // redraw the canvas whenever state/step changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (config.sceneKind === 'spaceShooter') {
      drawSpaceShooter(ctx, state, SCENE_W, SCENE_H)
    } else if (config.render) {
      config.render(ctx, state, SCENE_W, SCENE_H)
    }
  }, [state, step, config])

  const showCanvas = config.sceneKind || config.render

  return (
    <div className="traced">
      <div className="traced-grid">
        <CodePane code={config.code} activeLines={activeLines} />

        <div className="traced-side">
          {showCanvas && (
            <div className="trace-canvas-wrap">
              <canvas
                ref={canvasRef}
                width={SCENE_W}
                height={SCENE_H}
                className="trace-canvas"
              />
              {currentFrame && <div className="trace-frame-label">{currentFrame}</div>}
            </div>
          )}

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
              const status = i === step - 1 ? 'active' : i < step - 1 ? 'done' : 'pending'
              return (
                <li key={i} className={'trace-step trace-step--' + status}>
                  {s.frame && <div className="trace-step-frame">{s.frame}</div>}
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
            Press <strong>Step ▶</strong> to walk one line at a time and watch the scene update.
          </p>
        </div>
      </div>
    </div>
  )
}
