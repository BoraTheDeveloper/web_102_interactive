// Shared canvas drawing helpers for the Game Dev visual demos.
// All draws use the canvas's internal pixel coordinate space.

export function fitCanvas(canvas) {
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  const w = rect.width || canvas.width
  const h = rect.height || canvas.height
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { ctx, w, h }
}

export function clear(ctx, w, h, color = '#171a24') {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, w, h)
}

export function drawRect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

export function strokeRect(ctx, x, y, w, h, color, lineWidth = 2) {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.strokeRect(x, y, w, h)
}

export function drawCircle(ctx, x, y, r, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}

export function drawText(ctx, text, x, y, color = '#e6e8ef', font = '13px JetBrains Mono, monospace') {
  ctx.fillStyle = color
  ctx.font = font
  ctx.fillText(text, x, y)
}

export function drawGrid(ctx, w, h, step, color) {
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  for (let x = 0; x <= w; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = 0; y <= h; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }
}
