import { useRef, useState, useEffect } from 'react'
import { clear, drawRect, strokeRect, drawText } from '../lib/canvas.js'

// Two draggable rects; live readout of rect.colliderect() -> True/False.
export default function RectVisualizer({ config }) {
  const canvasRef = useRef(null)
  const W = 480
  const H = 300
  const [a, setA] = useState({ x: 110, y: 110, w: 96, h: 72 })
  const [b, setB] = useState({ x: 270, y: 150, w: 96, h: 72 })
  const [drag, setDrag] = useState(null)

  const overlap =
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    clear(ctx, W, H, '#171a24')
    drawRect(ctx, a.x, a.y, a.w, a.h, 'rgba(79,70,229,0.45)')
    strokeRect(ctx, a.x, a.y, a.w, a.h, '#4f46e5', 2)
    drawRect(ctx, b.x, b.y, b.w, b.h, 'rgba(22,184,166,0.4)')
    strokeRect(ctx, b.x, b.y, b.w, b.h, '#16b8a6', 2)
    drawText(ctx, 'player_rect', a.x, a.y - 6, '#9aa0ad', '11px JetBrains Mono')
    drawText(ctx, 'meteor_rect', b.x, b.y - 6, '#9aa0ad', '11px JetBrains Mono')
    drawText(
      ctx,
      `player_rect.colliderect(meteor_rect)  ->  ${overlap ? 'True' : 'False'}`,
      10,
      H - 12,
      overlap ? '#7cf6a0' : '#ff8b8b',
      'bold 14px JetBrains Mono',
    )
  }, [a, b, overlap])

  function ptr(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (W / rect.width),
      y: (e.clientY - rect.top) * (H / rect.height),
    }
  }
  function down(e) {
    const p = ptr(e)
    if (p.x >= a.x && p.x <= a.x + a.w && p.y >= a.y && p.y <= a.y + a.h) {
      setDrag('a')
      e.currentTarget.setPointerCapture(e.pointerId)
    } else if (p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h) {
      setDrag('b')
      e.currentTarget.setPointerCapture(e.pointerId)
    }
  }
  function move(e) {
    if (!drag) return
    const p = ptr(e)
    const set = drag === 'a' ? setA : setB
    set((s) => ({
      ...s,
      x: Math.max(0, Math.min(W - s.w, Math.round(p.x - s.w / 2))),
      y: Math.max(0, Math.min(H - s.h, Math.round(p.y - s.h / 2))),
    }))
  }

  return (
    <div className="demo">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="trace-canvas"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={() => setDrag(null)}
      />
      <p className="demo-caption">
        {config?.caption ||
          'Drag either rectangle. colliderect() is True only when the two rects overlap. That is how Pygame detects a hit.'}
      </p>
    </div>
  )
}
