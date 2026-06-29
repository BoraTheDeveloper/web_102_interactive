import { useRef, useState, useEffect } from 'react'
import { clear, drawCircle, drawText } from '../lib/canvas.js'

// A running mini game loop. Meteors spawn from the top at a regular interval
// (adjustable with a slider) and fall down. Simulates
// pygame.time.set_timer(meteor_event, interval).
export default function TimerEventsDemo({ config }) {
  const canvasRef = useRef(null)
  const W = 480
  const H = 300
  const [interval, setIntervalMs] = useState(800)
  const meteorsRef = useRef([])
  const spawnCountRef = useRef(0)
  const lastSpawnRef = useRef(0)
  const lastFrameRef = useRef(0)
  const intervalRef = useRef(interval)

  useEffect(() => {
    intervalRef.current = interval
  }, [interval])

  useEffect(() => {
    let raf
    let mounted = true

    function frame(ts) {
      if (!mounted) return
      const ctx = canvasRef.current.getContext('2d')
      clear(ctx, W, H, '#171a24')

      // Spawn meteor on timer
      if (ts - lastSpawnRef.current >= intervalRef.current) {
        lastSpawnRef.current = ts
        spawnCountRef.current++
        meteorsRef.current.push({
          x: 40 + Math.random() * (W - 80),
          y: -20,
          speed: 80 + Math.random() * 60,
        })
      }

      const dt = lastFrameRef.current ? (ts - lastFrameRef.current) / 1000 : 0.016
      lastFrameRef.current = ts

      // Update + draw meteors
      meteorsRef.current = meteorsRef.current.filter((m) => {
        m.y += m.speed * dt
        drawCircle(ctx, m.x, m.y, 12, 'rgba(22,184,166,0.8)')
        strokeCircle(ctx, m.x, m.y, 12, '#16b8a6', 2)
        return m.y < H + 20
      })

      drawText(ctx, `Interval: ${intervalRef.current} ms`, 10, 22, '#9aa0ad', 'bold 12px JetBrains Mono')
      drawText(ctx, `Spawns: ${spawnCountRef.current}`, 10, 42, '#7cf6a0', 'bold 12px JetBrains Mono')
      drawText(ctx, 'pygame.time.set_timer(meteor_event, interval)', 10, H - 12, '#e6e8ef', '11px JetBrains Mono')

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => {
      mounted = false
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="demo">
      <canvas ref={canvasRef} width={W} height={H} className="trace-canvas" />
      <div className="demo-controls">
        <label htmlFor="timer-slider">
          Spawn interval: <strong>{interval} ms</strong>
        </label>
        <input
          id="timer-slider"
          type="range"
          min={200}
          max={2000}
          step={100}
          value={interval}
          onChange={(e) => setIntervalMs(Number(e.target.value))}
        />
      </div>
      <p className="demo-caption">
        {config?.caption ||
          'pygame.time.set_timer(event, interval) pushes a custom event into the queue at a regular interval. Slide the timer to change how often meteors spawn. A shorter interval means more frequent events.'}
      </p>
    </div>
  )
}

function strokeCircle(ctx, x, y, r, color, lineWidth) {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.stroke()
}
