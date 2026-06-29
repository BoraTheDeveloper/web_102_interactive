import { useRef, useState, useEffect } from 'react'
import { clear, drawRect, drawText } from '../lib/canvas.js'

// Two players: one moves without dt (speed depends on frame rate), one moves
// with speed * dt (stable in real time). A slider changes the simulated FPS.
export default function DeltaTimeDemo({ config }) {
  const canvasRef = useRef(null)
  const W = 480
  const H = 300
  const [fps, setFps] = useState(60)
  const xARef = useRef(20)
  const xBRef = useRef(20)

  useEffect(() => {
    const id = setInterval(() => {
      const dtFrames = 60 / fps // dt normalized to a 60fps frame
      xARef.current += 4 // no dt: 4px every frame
      xBRef.current += 4 * dtFrames // with dt: scales so real speed is constant
      if (xARef.current > W - 34) xARef.current = 20
      if (xBRef.current > W - 34) xBRef.current = 20

      const ctx = canvasRef.current.getContext('2d')
      clear(ctx, W, H, '#171a24')
      drawText(ctx, 'Without dt:  rect.x += speed', 12, 30, '#ff8b8b', 'bold 12px JetBrains Mono')
      drawRect(ctx, xARef.current, 48, 30, 30, '#b4341f')
      drawText(ctx, `x = ${Math.round(xARef.current)} px  (faster at higher FPS)`, 12, 104, '#e6e8ef', '12px JetBrains Mono')

      drawText(ctx, 'With dt:  rect.x += speed * dt', 12, 150, '#7cf6a0', 'bold 12px JetBrains Mono')
      drawRect(ctx, xBRef.current, 168, 30, 30, '#15803d')
      drawText(ctx, `x = ${Math.round(xBRef.current)} px  (same real speed any FPS)`, 12, 224, '#e6e8ef', '12px JetBrains Mono')
    }, 1000 / fps)
    return () => clearInterval(id)
  }, [fps])

  return (
    <div className="demo">
      <canvas ref={canvasRef} width={W} height={H} className="trace-canvas" />
      <div className="demo-controls">
        <label htmlFor="fps-slider">
          Simulated frame rate: <strong>{fps} FPS</strong>
        </label>
        <input
          id="fps-slider"
          type="range"
          min={30}
          max={120}
          step={30}
          value={fps}
          onChange={(e) => setFps(Number(e.target.value))}
        />
      </div>
      <p className="demo-caption">
        {config?.caption ||
          'Change the frame rate. The red player (no dt) speeds up at high FPS and slows at low FPS. The green player (speed * dt) moves at the same real-world speed no matter the frame rate.'}
      </p>
    </div>
  )
}
