import { useEffect, useRef, useState } from 'react'
import { clear, drawRect, drawText, sharpCtx } from '../lib/canvas.js'

// A sprite is a game object that can join a team. Two lines in __init__ decide
// whether the team can use it: super().__init__(groups) puts it on the roster,
// self.image gives the team something to draw. The student deletes either line
// with a button, the way the instructor does on W6 slide 15, and watches the
// Collector. The two failures look nothing alike, which is the lesson.
const W = 480
const H = 300
const GAME_W = 800
const GAME_H = 600

function fitScene(w, h) {
  const k = Math.min(w / GAME_W, h / GAME_H)
  return { k, ox: (w - GAME_W * k) / 2, oy: (h - GAME_H * k) / 2 }
}

function box(ctx, f, r, color) {
  drawRect(ctx, f.ox + r.x * f.k, f.oy + r.y * f.k, r.width * f.k, r.height * f.k, color)
}

const PLAYER = { x: 380, y: 280, width: 40, height: 40 }
const COIN = { x: 200, y: 150, width: 30, height: 30 }

export default function InheritanceDemo({ config }) {
  const canvasRef = useRef(null)
  const [hasSuper, setHasSuper] = useState(true)
  const [hasImage, setHasImage] = useState(true)

  const roster = hasSuper ? ['Player', 'Coin'] : ['Coin']
  const crashes = hasSuper && !hasImage

  useEffect(() => {
    const ctx = sharpCtx(canvasRef.current, W, H)
    clear(ctx, W, H, '#12141c')
    const f = fitScene(W, H)
    drawRect(ctx, f.ox, f.oy, GAME_W * f.k, GAME_H * f.k, '#191970')
    const font = 'bold 16px JetBrains Mono, monospace'

    if (crashes) {
      // all_sprites.draw(screen) blits every member's image at its rect. The
      // Player is a member with no image, so the draw call is where it dies.
      drawRect(ctx, f.ox, f.oy, GAME_W * f.k, GAME_H * f.k, '#1a1a1a')
      drawText(ctx, 'Traceback (most recent call last):', 14, 40, '#ff8b8b', '12px JetBrains Mono')
      drawText(ctx, '  File "week6_collector.py", line 58, in <module>', 14, 62, '#e6e8ef', '12px JetBrains Mono')
      drawText(ctx, '    all_sprites.draw(screen)', 14, 84, '#e6e8ef', '12px JetBrains Mono')
      drawText(ctx, "AttributeError: 'Player' object has no attribute 'image'", 14, 120, '#ff8b8b', 'bold 12px JetBrains Mono')
      drawText(ctx, 'The crash lands on the draw line, not in __init__.', 14, 160, '#9aa0ad', '12px JetBrains Mono')
      return
    }

    box(ctx, f, COIN, '#ffd700')
    if (hasSuper) box(ctx, f, PLAYER, '#1e90ff')
    drawText(ctx, 'Score: 0', f.ox + 14, f.oy + 30, '#ffffff', font)
    if (!hasSuper) {
      drawText(ctx, 'No error. No player.', f.ox + 280 * f.k, f.oy + 300 * f.k, 'rgba(255,255,255,0.7)', font)
    }
  }, [hasSuper, hasImage, crashes])

  let caption = config?.caption || 'Both lines in place: the Player is on the roster and the team draws it. Delete one line and watch what changes.'
  if (!hasSuper) caption = 'Nothing crashed. The Player is a perfectly good object, it is just not on anybody\'s list. The team updates and draws its members, and the Player is not one.'
  if (crashes) caption = 'The Player joined the team, so the team tries to draw it, and there is nothing to draw. The crash arrives on all_sprites.draw(screen), a long way from the line you deleted.'

  const chip = (label, color, dim) => (
    <span className="sprite-member" style={{ borderColor: color, opacity: dim ? 0.35 : 1, textDecoration: dim ? 'line-through' : 'none' }}>
      {label}
    </span>
  )

  return (
    <div className="demo inherit">
      <div className="inherit-grid">
        <div className="inherit-side">
          <div className="sprite-group">
            <div className="sprite-group-name">pygame.sprite.Sprite (Pygame wrote this)</div>
            <div className="sprite-group-members">
              {chip('can join groups', '#9aa0ad')}
              {chip('update() by team', '#9aa0ad')}
              {chip('draw() by team', '#9aa0ad')}
            </div>
          </div>
          <div className={'sprite-group' + (hasSuper ? ' sprite-group--hit' : '')}>
            <div className="sprite-group-name">class Player(pygame.sprite.Sprite) (you add)</div>
            <div className="sprite-group-members">
              {chip('super().__init__(groups)', '#1e90ff', !hasSuper)}
              {chip('image', '#1e90ff', !hasImage)}
              {chip('rect', '#1e90ff')}
              {chip('speed', '#1e90ff')}
              {chip('update(dt)', '#1e90ff')}
            </div>
          </div>
          <div className="sprite-group">
            <div className="sprite-group-name">all_sprites (the roster)</div>
            <div className="sprite-group-members">
              {roster.map((m) => (
                <span key={m} className="sprite-member" style={{ borderColor: m === 'Player' ? '#1e90ff' : '#ffd700' }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          <p className="demo-caption">Delete one line from <code className="inline-code">__init__</code>, the way we did in class:</p>
          <div className="run-bar inherit-actions">
            <button className={'btn' + (hasSuper ? '' : ' btn--primary')} onClick={() => setHasSuper((v) => !v)}>
              {hasSuper ? 'Delete' : 'Put back'} <code className="inline-code">super().__init__(groups)</code>
            </button>
            <button className={'btn' + (hasImage ? '' : ' btn--primary')} onClick={() => setHasImage((v) => !v)}>
              {hasImage ? 'Delete' : 'Put back'} <code className="inline-code">self.image = ...</code>
            </button>
          </div>
        </div>

        <div className="inherit-side">
          <canvas ref={canvasRef} width={W} height={H} className="trace-canvas" />
          <p className="demo-caption">{caption}</p>
        </div>
      </div>
    </div>
  )
}
