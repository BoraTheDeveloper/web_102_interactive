import { useRef, useState, useEffect } from 'react'
import { clear, drawRect, drawText } from '../lib/canvas.js'

// Compare event-based input (KEYDOWN fires once per press) with continuous
// key-state input (get_pressed is True the whole time a key is held).
export default function InputDemo({ config }) {
  const canvasRef = useRef(null)
  const W = 480
  const H = 300
  const pressesRef = useRef(0)
  const heldRef = useRef(false)
  const pxRef = useRef(40)
  const [, force] = useState(0)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        pressesRef.current += 1
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        heldRef.current = true
      }
    }
    function onKeyUp(e) {
      if (e.key === 'ArrowRight') heldRef.current = false
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
      if (heldRef.current) pxRef.current = Math.min(W - 70, pxRef.current + 3)
      if (!heldRef.current && pxRef.current > 40) {
        // ease back when released so the difference stays visible
      }
      const ctx = canvasRef.current.getContext('2d')
      clear(ctx, W, H, '#171a24')
      ctx.fillStyle = 'rgba(255,255,255,0.12)'
      ctx.fillRect(W / 2 - 1, 0, 2, H)

      drawText(ctx, 'Event: KEYDOWN', 14, 28, '#9aa0ad', 'bold 13px JetBrains Mono')
      drawText(ctx, 'Press Space a few times', 14, 50, '#6b7280', '11px JetBrains Mono')
      drawText(ctx, `count = ${pressesRef.current}`, 14, 96, '#7cf6a0', 'bold 30px JetBrains Mono')
      drawText(ctx, 'fires once per press (good for shooting)', 14, 124, '#6b7280', '11px JetBrains Mono')

      drawText(ctx, 'Key state: get_pressed()', W / 2 + 14, 28, '#9aa0ad', 'bold 13px JetBrains Mono')
      drawText(ctx, 'Hold the → arrow', W / 2 + 14, 50, '#6b7280', '11px JetBrains Mono')
      drawRect(ctx, pxRef.current, 200, 44, 44, '#4f46e5')
      drawText(ctx, 'moves every frame while held', W / 2 + 14, 276, '#6b7280', '11px JetBrains Mono')

      force((n) => (n + 1) % 1000000)
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
          'Click the canvas first. Left: KEYDOWN fires once per press, so it is right for shooting a laser. Right: get_pressed() is True the whole time you hold the key, so it is right for smooth movement.'}
      </p>
    </div>
  )
}
