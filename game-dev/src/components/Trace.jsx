import { useState, useEffect, useRef } from 'react'
import { highlight } from '../lib/prism.js'
import { clear, drawRect, drawCircle, drawText, sharpCtx } from '../lib/canvas.js'

// Generic step trace for Game Dev. Source on the left with the active line
// highlighted; on the right: an optional Canvas scene, a variable inspector,
// and the step list. Trace style: frame -> input -> update -> collision -> draw.
//
// config shape:
//   code: string
//   state: initial state object
//   sceneKind?: 'spaceShooter' | 'collector' | 'platformer' | 'pong'
//                                     // built-in scene renderer
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

// T3's three games are all 800x600 and the trace canvas is 480x300, so every
// T3 scene letterboxes through one scale factor. Rects in a scene's state are
// therefore written in real game coordinates: `{ x: 380, y: 280, width: 40,
// height: 40 }` is the same FRect the student typed in class.
const GAME_W = 800
const GAME_H = 600

function fitScene(w, h) {
  const k = Math.min(w / GAME_W, h / GAME_H)
  return { k, ox: (w - GAME_W * k) / 2, oy: (h - GAME_H * k) / 2 }
}

function box(ctx, f, r, color) {
  if (!r) return
  drawRect(ctx, f.ox + r.x * f.k, f.oy + r.y * f.k, r.width * f.k, r.height * f.k, color)
}

function stage(ctx, w, h, bg) {
  clear(ctx, w, h, '#12141c')
  const f = fitScene(w, h)
  drawRect(ctx, f.ox, f.oy, GAME_W * f.k, GAME_H * f.k, bg)
  return f
}

// Collector (class weeks 4-7): dodgerblue player, gold coin, score top left.
// Colours match the strings in the deck so the canvas and the code agree.
function drawCollector(ctx, s, w, h) {
  const f = stage(ctx, w, h, '#191970') // midnightblue
  const items = s.items || (s.item ? [s.item] : [])
  items.forEach((it) => box(ctx, f, it, '#ffd700')) // gold
  box(ctx, f, s.player, '#1e90ff') // dodgerblue
  const font = 'bold 16px JetBrains Mono, monospace'
  // W7 onward: the room decides the text, the same way the three drawing
  // branches do in the deck. No state means a pre-W7 Collector, score only.
  if (s.state === 'start') {
    drawText(ctx, 'SPACE to start', f.ox + 300 * f.k, f.oy + 300 * f.k, '#ffffff', font)
  } else if (s.state === 'gameover') {
    drawText(ctx, 'You collected 10!', f.ox + 280 * f.k, f.oy + 300 * f.k, '#ffffff', font)
  } else {
    drawText(ctx, `Score: ${s.score ?? 0}`, f.ox + 14, f.oy + 30, '#ffffff', font)
  }
  if (s.state) drawText(ctx, `state = "${s.state}"`, w - 150, 20, 'rgba(255,255,255,0.7)')
  if (s.frame != null) drawText(ctx, `frame ${s.frame}`, 8, h - 8, 'rgba(255,255,255,0.55)')
}

// Platformer (class weeks 8-9). direction.y and on_floor are drawn on the
// scene because the whole lesson is that one of them accumulates and the
// other gates the jump.
function drawPlatformer(ctx, s, w, h) {
  const f = stage(ctx, w, h, '#87ceeb') // skyblue
  ;(s.platforms || []).forEach((p) => box(ctx, f, p, '#3f3f46'))
  box(ctx, f, s.goal, '#32cd32') // limegreen
  box(ctx, f, s.player, '#ff6347') // tomato
  const font = 'bold 15px JetBrains Mono, monospace'
  if (s.direction) {
    drawText(ctx, `direction.y = ${s.direction.y}`, f.ox + 14, f.oy + 28, '#12141c', font)
  }
  if (s.on_floor != null) {
    drawText(ctx, `on_floor = ${s.on_floor ? 'True' : 'False'}`, f.ox + 14, f.oy + 50, '#12141c', font)
  }
  if (s.frame != null) drawText(ctx, `frame ${s.frame}`, 8, h - 8, 'rgba(255,255,255,0.55)')
}

// Pong (homework chunks 1-5): two white paddles, a white ball, one score.
function drawPong(ctx, s, w, h) {
  const f = stage(ctx, w, h, '#000000')
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 1
  ctx.setLineDash([6, 6])
  ctx.beginPath()
  ctx.moveTo(f.ox + (GAME_W / 2) * f.k, f.oy)
  ctx.lineTo(f.ox + (GAME_W / 2) * f.k, f.oy + GAME_H * f.k)
  ctx.stroke()
  ctx.setLineDash([])
  ;(s.paddles || []).forEach((p) => box(ctx, f, p, '#ffffff'))
  box(ctx, f, s.ball, '#ffffff')
  drawText(ctx, String(s.score ?? 0), f.ox + (GAME_W / 2 - 10) * f.k, f.oy + 34, '#ffffff', 'bold 18px JetBrains Mono, monospace')
  if (s.state) drawText(ctx, s.state, f.ox + 14, f.oy + 26, 'rgba(255,255,255,0.7)')
  if (s.frame != null) drawText(ctx, `frame ${s.frame}`, 8, h - 8, 'rgba(255,255,255,0.55)')
}

const SCENES = {
  spaceShooter: drawSpaceShooter,
  collector: drawCollector,
  platformer: drawPlatformer,
  pong: drawPong,
}

export default function Trace({ config }) {
  const steps = config.steps
  const [state, setState] = useState(config.state)
  const [step, setStep] = useState(0)
  const [delta, setDelta] = useState(null)
  const [auto, setAuto] = useState(false)
  const canvasRef = useRef(null)
  const activeStepRef = useRef(null)

  useEffect(() => {
    activeStepRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [step])

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
    // The delta is what this step changed, so it is set fresh each step and
    // cleared by the next one. Setting it before apply and clearing it after
    // meant a step carrying both showed no highlight at all.
    setDelta(next.delta ? next.delta(state) : null)
    if (next.apply) setState(next.apply(state))
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
    const ctx = sharpCtx(canvas, SCENE_W, SCENE_H)
    const scene = SCENES[config.sceneKind]
    if (scene) {
      scene(ctx, state, SCENE_W, SCENE_H)
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

          {/* The list scrolls inside its own box so the canvas above it never
              leaves the screen, and the active step scrolls itself into view. */}
          <ol className="trace-steps">
            {steps.map((s, i) => {
              const status = i === step - 1 ? 'active' : i < step - 1 ? 'done' : 'pending'
              return (
                <li
                  key={i}
                  ref={status === 'active' ? activeStepRef : null}
                  className={'trace-step trace-step--' + status}
                >
                  {s.frame && <div className="trace-step-frame">{s.frame}</div>}
                  <div className="trace-step-label">{s.label}</div>
                  {status === 'active' && <p className="trace-step-desc">{s.desc}</p>}
                </li>
              )
            })}
          </ol>
          <p className="trace-tip">
            Press <strong>Step ▶</strong> to walk one line at a time and watch the scene update.
          </p>
        </div>
      </div>
    </div>
  )
}
