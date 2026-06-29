import { useRef, useState, useEffect } from 'react'
import { clear, drawGrid, drawRect, strokeRect, drawText } from '../lib/canvas.js'

// Drag a player square on a grid; watch x, y, and rect.center change.
// Shows the Pygame coordinate system: origin top-left, y grows downward.
export default function CoordinatesDemo({ config }) {
  const canvasRef = useRef(null)
  const W = 480
  const H = 300
  const SIZE = 44
  const [pos, setPos] = useState({ x: 196, y: 130 })

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    clear(ctx, W, H, '#171a24')
    drawGrid(ctx, W, H, 40, 'rgba(255,255,255,0.07)')
    drawText(ctx, '(0, 0)', 6, 16, 'rgba(255,255,255,0.45)')
    // player rect
    drawRect(ctx, pos.x, pos.y, SIZE, SIZE, 'rgba(79,70,229,0.55)')
    strokeRect(ctx, pos.x, pos.y, SIZE, SIZE, '#8b86f0', 2)
    // center point
    const cx = pos.x + SIZE / 2
    const cy = pos.y + SIZE / 2
    ctx.fillStyle = '#ffd56b'
    ctx.beginPath()
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
    ctx.fill()
    drawText(ctx, `rect.x = ${pos.x}    rect.y = ${pos.y}`, 10, H - 28, '#e6e8ef', 'bold 13px JetBrains Mono')
    drawText(ctx, `rect.center = (${cx}, ${cy})`, 10, H - 10, '#9aa0ad', '13px JetBrains Mono')
  }, [pos])

  function move(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const sx = W / rect.width
    const sy = H / rect.height
    let x = (e.clientX - rect.left) * sx - SIZE / 2
    let y = (e.clientY - rect.top) * sy - SIZE / 2
    x = Math.max(0, Math.min(W - SIZE, Math.round(x)))
    y = Math.max(0, Math.min(H - SIZE, Math.round(y)))
    setPos({ x, y })
  }

  return (
    <div className="demo">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="trace-canvas"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          move(e)
        }}
        onPointerMove={(e) => e.buttons && move(e)}
      />
      <p className="demo-caption">
        {config?.caption ||
          'Drag the player. In Pygame, (0,0) is the top-left corner and y grows downward. rect.center is the middle of the rect.'}
      </p>
    </div>
  )
}
