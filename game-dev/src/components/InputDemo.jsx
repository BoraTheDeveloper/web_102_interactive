import { useRef, useEffect } from 'react'
import { clear, drawRect, drawText, sharpCtx } from '../lib/canvas.js'

// Compare event-based input (KEYDOWN fires once per press) with continuous
// key-state input (get_pressed is True the whole time a key is held).
export default function InputDemo({ config }) {
  const canvasRef = useRef(null)
  const W = 480
  const H = 300
  const pressesRef = useRef(0)
  // Both arrows, tracked independently. Holding both at once cancels out,
  // which is the same thing that happens in Pygame when two opposite
  // get_pressed() checks both add to x.
  const heldRef = useRef({ left: false, right: false })
  // The square lives in the right half of the canvas, beside its own label.
  const MIN_X = W / 2 + 14
  const MAX_X = W - 14 - 44
  const pxRef = useRef(Math.round((MIN_X + MAX_X) / 2))

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        // The browser repeats keydown while a key is held, so a held Space
        // would tick the counter over and over and teach the opposite of the
        // lesson. Pygame's KEYDOWN does not repeat unless you ask for it with
        // pygame.key.set_repeat(), so ignore the repeats and match Pygame.
        if (!e.repeat) pressesRef.current += 1
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        heldRef.current[e.key === 'ArrowLeft' ? 'left' : 'right'] = true
      }
    }
    function onKeyUp(e) {
      if (e.key === 'ArrowLeft') heldRef.current.left = false
      if (e.key === 'ArrowRight') heldRef.current.right = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useEffect(() => {
    let raf
    function loop() {
      // int(right) - int(left) is exactly the shape W3 teaches: two
      // independent checks, both allowed to be true at the same time.
      const dir = (heldRef.current.right ? 1 : 0) - (heldRef.current.left ? 1 : 0)
      pxRef.current = Math.max(MIN_X, Math.min(MAX_X, pxRef.current + dir * 3))
      const ctx = sharpCtx(canvasRef.current, W, H)
      clear(ctx, W, H, '#171a24')
      ctx.fillStyle = 'rgba(255,255,255,0.12)'
      ctx.fillRect(W / 2 - 1, 0, 2, H)

      drawText(ctx, 'Event: KEYDOWN', 14, 28, '#9aa0ad', 'bold 13px JetBrains Mono')
      drawText(ctx, 'Press Space a few times', 14, 50, '#6b7280', '11px JetBrains Mono')
      drawText(ctx, `count = ${pressesRef.current}`, 14, 96, '#7cf6a0', 'bold 30px JetBrains Mono')
      drawText(ctx, 'fires once per press', 14, 124, '#6b7280', '11px JetBrains Mono')
      drawText(ctx, '(good for shooting)', 14, 142, '#6b7280', '11px JetBrains Mono')

      drawText(ctx, 'Key state: get_pressed()', W / 2 + 14, 28, '#9aa0ad', 'bold 13px JetBrains Mono')
      drawText(ctx, 'Hold ← or →', W / 2 + 14, 50, '#6b7280', '11px JetBrains Mono')
      drawText(ctx, `direction = ${dir}`, W / 2 + 14, 96, '#7cf6a0', 'bold 20px JetBrains Mono')
      drawRect(ctx, pxRef.current, 200, 44, 44, '#4f46e5')
      drawText(ctx, 'moves every frame while held', W / 2 + 14, 276, '#6b7280', '11px JetBrains Mono')

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="demo">
      <canvas ref={canvasRef} width={W} height={H} className="trace-canvas" tabIndex={0} />
      <p className="demo-caption">
        {config?.caption ||
          'Click the canvas first. Left: KEYDOWN fires once per press, so it is right for shooting. Right: get_pressed() is True the whole time you hold an arrow, so it is right for smooth movement.'}
      </p>
    </div>
  )
}
