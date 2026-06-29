import { useRef, useState, useEffect } from 'react'
import { clear, drawRect, strokeRect, drawText } from '../lib/canvas.js'

// Three overlapping sprites. The user reorders the draw list with up/down
// buttons. The canvas renders them in order — the last sprite drawn is on
// top. Later blits cover earlier ones.
const SPRITES = {
  player: { color: 'rgba(79,70,229,0.7)', stroke: '#4f46e5', label: 'player', w: 100, h: 70 },
  meteor: { color: 'rgba(22,184,166,0.7)', stroke: '#16b8a6', label: 'meteor', w: 90, h: 90 },
  laser: { color: 'rgba(249,115,22,0.7)', stroke: '#f97316', label: 'laser', w: 36, h: 120 },
}

const POSITIONS = {
  player: { x: 140, y: 80 },
  meteor: { x: 220, y: 110 },
  laser: { x: 280, y: 70 },
}

export default function DrawOrderDemo({ config }) {
  const canvasRef = useRef(null)
  const W = 480
  const H = 300
  const [order, setOrder] = useState(['player', 'meteor', 'laser'])

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    clear(ctx, W, H, '#171a24')
    order.forEach((key, i) => {
      const s = SPRITES[key]
      const p = POSITIONS[key]
      drawRect(ctx, p.x, p.y, s.w, s.h, s.color)
      strokeRect(ctx, p.x, p.y, s.w, s.h, s.stroke, 2)
      drawText(ctx, `${s.label}  (#${i + 1} drawn)`, p.x + 4, p.y + 16, s.stroke, 'bold 11px JetBrains Mono')
    })
    drawText(ctx, 'Last drawn = on top', 10, H - 12, '#9aa0ad', '12px JetBrains Mono')
  }, [order])

  function move(index, dir) {
    const newIndex = index + dir
    if (newIndex < 0 || newIndex >= order.length) return
    const next = [...order]
    ;[next[index], next[newIndex]] = [next[newIndex], next[index]]
    setOrder(next)
  }

  return (
    <div className="demo">
      <canvas ref={canvasRef} width={W} height={H} className="trace-canvas" />
      <div className="draw-order-list">
        <p className="draw-order-hint">Draw order (first = bottom, last = top):</p>
        {order.map((key, i) => (
          <div key={key} className="draw-order-row">
            <span className="draw-order-num">#{i + 1}</span>
            <span className="draw-order-dot" style={{ background: SPRITES[key].stroke }} />
            <span className="draw-order-label">{SPRITES[key].label}</span>
            <button disabled={i === 0} onClick={() => move(i, -1)} className="draw-order-btn">↑</button>
            <button disabled={i === order.length - 1} onClick={() => move(i, 1)} className="draw-order-btn">↓</button>
          </div>
        ))}
      </div>
      <p className="demo-caption">
        {config?.caption ||
          'In Pygame, screen.blit() draws one image on top of another. The order of your blit calls decides what is visible. Reorder the list and watch the canvas: the sprite drawn last is always on top.'}
      </p>
    </div>
  )
}
