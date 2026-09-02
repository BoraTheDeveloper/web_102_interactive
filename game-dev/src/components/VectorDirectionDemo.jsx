import { useEffect, useRef, useState } from 'react'
import { clear, drawRect, drawText, sharpCtx } from '../lib/canvas.js'

// A race between two players holding the same keys from the same spot. Red
// moves the W3 way: four separate ifs, each adding a whole step, so Right and
// Down together is a 1.41 step. Green builds one Vector2 from the same four
// ifs and normalizes it to length 1. Hold both keys and red pulls ahead along
// the diagonal. Hold one key and the two never separate, which is the point.
const W = 480
const H = 300
const SPEED = 150 // px per second in canvas space, so a run across takes ~3 s
const SIZE = 26
const START = { x: 30, y: 70 }

function arrow(ctx, x, y, dx, dy, color) {
  if (dx === 0 && dy === 0) return
  const len = 30
  const ex = x + dx * len
  const ey = y + dy * len
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(ex, ey)
  ctx.stroke()
  const a = Math.atan2(dy, dx)
  ctx.beginPath()
  ctx.moveTo(ex, ey)
  ctx.lineTo(ex - 8 * Math.cos(a - 0.5), ey - 8 * Math.sin(a - 0.5))
  ctx.lineTo(ex - 8 * Math.cos(a + 0.5), ey - 8 * Math.sin(a + 0.5))
  ctx.closePath()
  ctx.fill()
}

function fresh() {
  return {
    a: { x: START.x, y: START.y, dist: 0, trail: [] },
    b: { x: START.x, y: START.y, dist: 0, trail: [] },
    held: 0, // seconds any key has been held
    sinceDot: 0,
    finished: false,
  }
}

export default function VectorDirectionDemo({ config }) {
  const canvasRef = useRef(null)
  const [held, setHeld] = useState({ right: false, down: false })
  const heldRef = useRef(held)
  heldRef.current = held
  const simRef = useRef(fresh())

  useEffect(() => {
    function set(e, on) {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setHeld((h) => ({ ...h, right: on }))
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHeld((h) => ({ ...h, down: on }))
      }
    }
    const down = (e) => set(e, true)
    const up = (e) => set(e, false)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useEffect(() => {
    let raf
    let last = performance.now()
    function frame(ts) {
      const dt = Math.min((ts - last) / 1000, 0.05)
      last = ts
      const { right, down } = heldRef.current
      const sim = simRef.current

      // Red, the W3 way: each if adds a whole step of its own.
      let ax = 0
      let ay = 0
      if (right) ax += 1
      if (down) ay += 1
      // Green, the W7 way: the same four ifs build one arrow, then normalize.
      let bx = ax
      let by = ay
      const len = Math.hypot(bx, by)
      if (len > 0) {
        bx /= len
        by /= len
      }

      const moving = (ax !== 0 || ay !== 0) && !sim.finished
      const maxX = W - SIZE - 10
      const maxY = H - SIZE - 10
      if (moving) {
        sim.held += dt
        sim.sinceDot += dt
        for (const [p, dx, dy] of [
          [sim.a, ax, ay],
          [sim.b, bx, by],
        ]) {
          const nx = Math.min(maxX, p.x + dx * SPEED * dt)
          const ny = Math.min(maxY, p.y + dy * SPEED * dt)
          p.dist += Math.hypot(nx - p.x, ny - p.y)
          p.x = nx
          p.y = ny
        }
        // A dot every quarter second, so the spacing shows who is faster.
        if (sim.sinceDot >= 0.25) {
          sim.sinceDot = 0
          sim.a.trail.push({ x: sim.a.x, y: sim.a.y })
          sim.b.trail.push({ x: sim.b.x, y: sim.b.y })
        }
        // First square to touch an edge ends the race, as if you let go.
        // Otherwise green keeps going and closes the gap red just opened.
        const atEdge = (p) => p.x >= maxX || p.y >= maxY
        if (!sim.finished && (atEdge(sim.a) || atEdge(sim.b))) {
          sim.finished = true
          setHeld({ right: false, down: false })
        }
      }

      const ctx = sharpCtx(canvasRef.current, W, H)
      clear(ctx, W, H, '#171a24')
      const mono = '12px JetBrains Mono'
      const bold = 'bold 12px JetBrains Mono'

      // Trails first, so the squares sit on top of them.
      for (const d of sim.a.trail) drawRect(ctx, d.x + SIZE / 2 - 2, d.y + SIZE / 2 - 2, 4, 4, 'rgba(255,139,139,0.55)')
      for (const d of sim.b.trail) drawRect(ctx, d.x + SIZE / 2 - 2, d.y + SIZE / 2 - 2, 4, 4, 'rgba(124,246,160,0.55)')

      // Green drawn first so red is visible on top when they overlap.
      drawRect(ctx, sim.b.x, sim.b.y, SIZE, SIZE, '#15803d')
      drawRect(ctx, sim.a.x, sim.a.y, SIZE, SIZE, '#b4341f')
      arrow(ctx, sim.b.x + SIZE / 2, sim.b.y + SIZE / 2, bx, by, '#7cf6a0')
      arrow(ctx, sim.a.x + SIZE / 2, sim.a.y + SIZE / 2, ax, ay, '#ff8b8b')

      // Scoreboard.
      drawText(
        ctx,
        'RED   four separate moves       arrow length ' + Math.hypot(ax, ay).toFixed(2),
        12,
        22,
        '#ff8b8b',
        bold,
      )
      drawText(
        ctx,
        'GREEN one arrow, normalized     arrow length ' + Math.hypot(bx, by).toFixed(2),
        12,
        40,
        '#7cf6a0',
        bold,
      )
      const secs = sim.held.toFixed(1)
      drawText(
        ctx,
        `held ${secs}s   red moved ${Math.round(sim.a.dist)} px   green moved ${Math.round(sim.b.dist)} px`,
        12,
        H - 14,
        '#e6e8ef',
        mono,
      )

      if (!moving && sim.held === 0) {
        drawText(
          ctx,
          'Both start on the same spot. Hold Right + Down and watch who gets ahead.',
          12,
          H / 2 + 40,
          '#9aa0ad',
          mono,
        )
      } else if (!moving) {
        if (sim.finished) drawText(ctx, 'Race over. Reset to run it again.', 12, H / 2 + 58, '#9aa0ad', mono)
        const gap = Math.round(sim.a.dist - sim.b.dist)
        drawText(
          ctx,
          gap > 0
            ? `red is ${gap} px ahead: diagonal was ${(sim.a.dist / Math.max(1, sim.b.dist)).toFixed(2)}x faster`
            : 'same distance: one key, no difference',
          12,
          H / 2 + 40,
          '#9aa0ad',
          mono,
        )
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  const both = held.right && held.down
  const onlyRight = held.right && !held.down
  const hold = (right, down) => setHeld({ right, down })
  const reset = () => {
    simRef.current = fresh()
    setHeld({ right: false, down: false })
  }

  return (
    <div className="demo">
      <div className="demo-row">
        <canvas ref={canvasRef} width={W} height={H} className="trace-canvas" tabIndex={0} />
        <div className="demo-controls demo-controls--center">
          <div className="run-bar">
            <button className={'btn' + (both ? ' btn--primary' : '')} onClick={() => hold(true, true)}>
              Hold Right + Down
            </button>
            <button className={'btn' + (onlyRight ? ' btn--primary' : '')} onClick={() => hold(true, false)}>
              Hold Right only
            </button>
            <button className="btn btn--ghost" onClick={() => hold(false, false)}>
              Let go
            </button>
            <button className="btn btn--ghost" onClick={reset}>
              Reset
            </button>
          </div>
          {/* Strings are never parsed as HTML in React, so a <br /> inside one
              is just text. A new line is a new element: here, a second <p>. */}
          <p className="demo-caption">
            {config?.caption ||
              'Two players, same keys, same start. Hold Right + Down: the red one adds a whole step on x and a whole step on y, so its arrow is 1.41 long and it pulls ahead along the diagonal.'}
          </p>
          <p className="demo-caption">
            The green one normalizes the same arrow to length 1 and moves at the speed you asked for. Reset, then hold
            Right only: the arrows are both length 1 and the two never separate. The arrow keys work too.
          </p>
        </div>
      </div>
    </div>
  )
}
