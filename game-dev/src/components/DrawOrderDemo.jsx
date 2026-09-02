import { useRef, useState, useEffect } from 'react'
import { clear, drawRect, strokeRect, drawText, sharpCtx } from '../lib/canvas.js'

// Three overlapping sprites. The user reorders the draw list with up/down
// buttons. The canvas renders them in order — the last sprite drawn is on
// top. Later blits cover earlier ones.
//
// The scene is config-driven: pass config.sprites as
// { key: { color, stroke, label, w, h, x, y } } plus config.order to teach the
// same rule with a different set of shapes.
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
  const sprites = config?.sprites || SPRITES
  const positions = config?.sprites
    ? Object.fromEntries(Object.entries(config.sprites).map(([k, v]) => [k, { x: v.x, y: v.y }]))
    : POSITIONS
  const canvasRef = useRef(null)
  const W = 480
  const H = 300

  // White text on a dark tag, so the label reads on every sprite colour. A tag
  // drawn with its sprite is covered by whatever is drawn later, which is the
  // lesson: the label disappears with the sprite it belongs to.
  function tag(ctx, text, x, y) {
    ctx.font = 'bold 11px JetBrains Mono, monospace'
    const w = ctx.measureText(text).width + 12
    drawRect(ctx, x, y, w, 20, 'rgba(18, 20, 28, 0.78)')
    drawText(ctx, text, x + 6, y + 14, '#ffffff', 'bold 11px JetBrains Mono, monospace')
  }

  const [order, setOrder] = useState(config?.order || ['player', 'meteor', 'laser'])

  useEffect(() => {
    const ctx = sharpCtx(canvasRef.current, W, H)
    clear(ctx, W, H, config?.bg || '#171a24')
    order.forEach((key, i) => {
      const s = sprites[key]
      const p = positions[key]
      drawRect(ctx, p.x, p.y, s.w, s.h, s.color)
      strokeRect(ctx, p.x, p.y, s.w, s.h, s.stroke, 2)
      tag(ctx, `${s.label}  (#${i + 1} drawn)`, p.x + 6, p.y + 6)
    })
    tag(ctx, 'Last drawn = on top', 10, H - 30)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, config])

  function move(index, dir) {
    const newIndex = index + dir
    if (newIndex < 0 || newIndex >= order.length) return
    const next = [...order]
    ;[next[index], next[newIndex]] = [next[newIndex], next[index]]
    setOrder(next)
  }

  return (
    <div className="demo">
      <div className="demo-row">
        <canvas ref={canvasRef} width={W} height={H} className="trace-canvas" />
        <div className="draw-order-list">
        <p className="draw-order-hint">Draw order (first = bottom, last = top):</p>
        {order.map((key, i) => (
          <div key={key} className="draw-order-row">
            <span className="draw-order-num">#{i + 1}</span>
            <span className="draw-order-dot" style={{ background: sprites[key].stroke }} />
            <span className="draw-order-label">{sprites[key].label}</span>
            <button disabled={i === 0} onClick={() => move(i, -1)} className="draw-order-btn">↑</button>
            <button disabled={i === order.length - 1} onClick={() => move(i, 1)} className="draw-order-btn">↓</button>
          </div>
        ))}
        </div>
      </div>
      <p className="demo-caption">
        {config?.caption ||
          'In Pygame, screen.blit() draws one image on top of another. The order of your blit calls decides what is visible. Reorder the list and watch the canvas: the sprite drawn last is always on top.'}
      </p>
    </div>
  )
}
