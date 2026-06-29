import { useRef, useState, useEffect } from 'react'
import { clear, drawRect, strokeRect, drawText } from '../lib/canvas.js'

// A running mini game loop with multiple lasers (moving up) and meteors
// (falling down). When a laser overlaps a meteor, both are removed —
// simulating pygame.sprite.spritecollide and groupcollide.
export default function CollisionGroupsDemo({ config }) {
  const canvasRef = useRef(null)
  const W = 480
  const H = 300
  const [collisions, setCollisions] = useState(0)
  const lasersRef = useRef([])
  const meteorsRef = useRef([])
  const lastSpawnRef = useRef(0)
  const lastFrameRef = useRef(0)
  const collisionsRef = useRef(0)

  function fireLaser() {
    lasersRef.current.push({
      x: 200 + Math.random() * 80,
      y: H - 30,
      speed: 300,
    })
  }

  useEffect(() => {
    let raf
    let mounted = true

    function frame(ts) {
      if (!mounted) return
      const ctx = canvasRef.current.getContext('2d')
      clear(ctx, W, H, '#171a24')

      const dt = lastFrameRef.current ? (ts - lastFrameRef.current) / 1000 : 0.016
      lastFrameRef.current = ts

      // Spawn meteor on timer (~700ms)
      if (ts - lastSpawnRef.current >= 700) {
        lastSpawnRef.current = ts
        meteorsRef.current.push({
          x: 40 + Math.random() * (W - 80),
          y: -20,
          speed: 60 + Math.random() * 40,
        })
      }

      // Update meteors
      meteorsRef.current = meteorsRef.current.filter((m) => {
        m.y += m.speed * dt
        return m.y < H + 20
      })

      // Update lasers
      lasersRef.current = lasersRef.current.filter((l) => {
        l.y -= l.speed * dt
        return l.y > -30
      })

      // Group collision: check each laser vs each meteor
      const remainingLasers = []
      const remainingMeteors = []

      for (const laser of lasersRef.current) {
        let hit = false
        for (const meteor of meteorsRef.current) {
          if (
            laser.x < meteor.x + 24 &&
            laser.x + 10 > meteor.x - 12 &&
            laser.y < meteor.y + 12 &&
            laser.y + 28 > meteor.y - 12
          ) {
            hit = true
            collisionsRef.current++
            setCollisions(collisionsRef.current)
            // meteor is consumed (don't add to remainingMeteors)
            break
          }
        }
        if (!hit) remainingLasers.push(laser)
      }

      // Keep meteors that were not hit
      const hitMeteors = new Set()
      for (const laser of lasersRef.current) {
        for (const meteor of meteorsRef.current) {
          if (
            laser.x < meteor.x + 24 &&
            laser.x + 10 > meteor.x - 12 &&
            laser.y < meteor.y + 12 &&
            laser.y + 28 > meteor.y - 12
          ) {
            hitMeteors.add(meteor)
          }
        }
      }
      meteorsRef.current = meteorsRef.current.filter((m) => !hitMeteors.has(m))
      lasersRef.current = remainingLasers

      // Draw meteors
      meteorsRef.current.forEach((m) => {
        drawCircle(ctx, m.x, m.y, 12, 'rgba(22,184,166,0.7)')
        strokeCircle(ctx, m.x, m.y, 12, '#16b8a6', 2)
      })

      // Draw lasers
      lasersRef.current.forEach((l) => {
        drawRect(ctx, l.x, l.y, 8, 24, 'rgba(249,115,22,0.8)')
        strokeRect(ctx, l.x, l.y, 8, 24, '#f97316', 2)
      })

      drawText(ctx, `Collisions: ${collisionsRef.current}`, 10, 22, '#7cf6a0', 'bold 12px JetBrains Mono')
      drawText(ctx, `Lasers: ${lasersRef.current.length}  Meteors: ${meteorsRef.current.length}`, 10, 42, '#9aa0ad', 'bold 12px JetBrains Mono')
      drawText(ctx, 'spritecollide(laser, meteor_sprites, True)', 10, H - 12, '#e6e8ef', '11px JetBrains Mono')

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
        <button onClick={fireLaser} className="btn">
          Fire Laser ↑
        </button>
        <span className="demo-stat">Collisions detected: {collisions}</span>
      </div>
      <p className="demo-caption">
        {config?.caption ||
          'pygame.sprite.spritecollide(sprite, group, True) checks one sprite against every sprite in a group. When a laser hits a meteor, both are killed (True = dokill). Click Fire Laser to shoot. Meteors spawn automatically. Watch the collision counter go up.'}
      </p>
    </div>
  )
}

function drawCircle(ctx, x, y, r, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}

function strokeCircle(ctx, x, y, r, color, lineWidth) {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.stroke()
}
