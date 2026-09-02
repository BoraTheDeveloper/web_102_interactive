import { useEffect, useRef, useState } from 'react'
import { clear, drawRect, drawText, sharpCtx } from '../lib/canvas.js'

// The W8 platformer, run with the deck's exact numbers. GRAVITY, JUMP and
// MOVE are pixels per frame, never multiplied by dt, so the sim steps a fixed
// 60 times a second no matter the monitor. Untick the landing line
// `self.direction.y = 0` and the player stands for a moment, then drops
// through the ground, exactly as W8 slide 19 shows in class.
const W = 480
const H = 300
const GAME_W = 800
const GAME_H = 600
const GRAVITY = 1
const JUMP = -16
const MOVE = 5
const STEP = 1 / 60

const GROUND = { x: 0, y: 560, width: 800, height: 40 }
const START = { x: 380, y: 500, width: 40, height: 60 } // midbottom (400, 560)

function fitScene(w, h) {
  const k = Math.min(w / GAME_W, h / GAME_H)
  return { k, ox: (w - GAME_W * k) / 2, oy: (h - GAME_H * k) / 2 }
}

function box(ctx, f, r, color) {
  drawRect(ctx, f.ox + r.x * f.k, f.oy + r.y * f.k, r.width * f.k, r.height * f.k, color)
}

function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}

function fresh() {
  return { player: { ...START }, dirX: 0, dirY: 0, onFloor: false, frame: 0, fellThrough: false, sinceLanded: 0 }
}

export default function GravityJumpDemo({ config }) {
  const canvasRef = useRef(null)
  const [stopOnLand, setStopOnLand] = useState(true)
  const [status, setStatus] = useState('standing')
  const stopRef = useRef(true)
  stopRef.current = stopOnLand
  const keysRef = useRef({ left: false, right: false, jump: false })
  const simRef = useRef(fresh())

  useEffect(() => {
    function set(e, on) {
      const k = e.key
      if (k === 'ArrowLeft' || k === 'ArrowRight' || k === ' ' || e.code === 'Space') e.preventDefault()
      if (k === 'ArrowLeft') keysRef.current.left = on
      if (k === 'ArrowRight') keysRef.current.right = on
      if (k === ' ' || e.code === 'Space') keysRef.current.jump = on
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
    let acc = 0

    // One Pygame frame. Same order as Player.update in the deck:
    // keys and jump, gravity, move down, land.
    function update(s) {
      const keys = keysRef.current
      s.dirX = (keys.right ? 1 : 0) - (keys.left ? 1 : 0)
      s.player.x += s.dirX * MOVE
      s.player.x = Math.max(0, Math.min(GAME_W - s.player.width, s.player.x))

      if (keys.jump && s.onFloor) s.dirY = JUMP

      s.dirY += GRAVITY
      s.player.y += s.dirY

      s.onFloor = false
      if (overlaps(s.player, GROUND) && s.dirY >= 0) {
        s.player.y = GROUND.y - s.player.height // snap the feet
        if (stopRef.current) s.dirY = 0 // stop the speed
        s.onFloor = true // remember you are standing
      }
      s.frame += 1
      if (s.onFloor) s.sinceLanded += 1
      if (s.player.y > GAME_H + 100 && !s.fellThrough) {
        s.fellThrough = true
        setStatus('fell')
      }
    }

    function frame(ts) {
      acc += Math.min((ts - last) / 1000, 0.1)
      last = ts
      const s = simRef.current
      while (acc >= STEP) {
        update(s)
        acc -= STEP
      }

      const ctx = sharpCtx(canvasRef.current, W, H)
      clear(ctx, W, H, '#12141c')
      const f = fitScene(W, H)
      drawRect(ctx, f.ox, f.oy, GAME_W * f.k, GAME_H * f.k, '#87ceeb')
      box(ctx, f, GROUND, '#3f3f46')
      if (!s.fellThrough) box(ctx, f, s.player, '#ff6347')
      const font = 'bold 15px JetBrains Mono, monospace'
      // With the landing line deleted, direction.y never stops growing. Paint
      // it red and say when the fall comes, or the box looks like it did nothing.
      const broken = !stopRef.current
      drawText(ctx, `direction.y = ${s.dirY}`, f.ox + 14, f.oy + 28, broken ? '#b4341f' : '#12141c', font)
      drawText(ctx, `on_floor = ${s.onFloor ? 'True' : 'False'}`, f.ox + 14, f.oy + 50, '#12141c', font)
      if (s.fellThrough) {
        drawText(ctx, 'Gone. direction.y grew past the ground.', f.ox + 14, f.oy + 78, '#b4341f', font)
      } else if (broken && s.onFloor) {
        drawText(ctx, `still growing: falls through at about ${GAME_H - START.y}`, f.ox + 14, f.oy + 78, '#b4341f', font)
      }
      drawText(ctx, `frame ${s.frame}`, 8, H - 8, 'rgba(255,255,255,0.55)')

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  function reset() {
    simRef.current = fresh()
    setStatus('standing')
  }

  function press(key, on) {
    keysRef.current[key] = on
  }

  let caption = config?.caption || 'Space jumps, but only while on_floor is True. Watch direction.y: it starts at -16, gravity eats it one per frame, and the arc comes back down.'
  if (!stopOnLand && status !== 'fell') caption = 'Wait and watch the red number. The snap still drags the feet back each frame, so it looks like standing. But direction.y is growing by 1 every frame. Once one step is taller than the ground and the player together, the box lands fully below the ground, spritecollide finds nothing, and there is nothing left to snap to.'
  if (status === 'fell') caption = 'Thickness would only buy time. The one fix is `self.direction.y = 0` on landing. Tick the box and reset.'

  return (
    <div className="demo">
      <canvas ref={canvasRef} width={W} height={H} className="trace-canvas" tabIndex={0} />
      <div className="run-bar">
        <button className="btn" onPointerDown={() => press('left', true)} onPointerUp={() => press('left', false)} onPointerLeave={() => press('left', false)}>
          Left
        </button>
        <button className="btn" onPointerDown={() => press('right', true)} onPointerUp={() => press('right', false)} onPointerLeave={() => press('right', false)}>
          Right
        </button>
        <button className="btn btn--primary" onPointerDown={() => press('jump', true)} onPointerUp={() => press('jump', false)} onPointerLeave={() => press('jump', false)}>
          Jump (Space)
        </button>
        <button className="btn btn--ghost" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="demo-controls">
        <label>
          <input
            type="checkbox"
            checked={stopOnLand}
            onChange={(e) => {
              setStopOnLand(e.target.checked)
              reset()
            }}
          />{' '}
          Landing does job 2: <code className="inline-code">self.direction.y = 0</code>
        </label>
      </div>
      <p className="demo-caption">{caption}</p>
    </div>
  )
}
