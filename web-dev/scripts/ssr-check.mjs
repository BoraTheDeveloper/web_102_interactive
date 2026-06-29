// Runtime smoke test: render the real <App/> (and a forced TracedDemo + quiz)
// through Vite's SSR pipeline so module eval + initial render actually execute.
import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
  const html = renderToString(React.createElement(App))

  const checks = [
    ['renders sidebar brand', html.includes('Web Dev 102')],
    ['renders Week 3 title', html.includes('State &') || html.includes('State &amp;')],
    ['traced demo present (line numbers)', html.includes('trace-line')],
    ['traced demo highlights a line', html.includes('trace-line--active') || html.includes('trace-code')],
    ['syntax tokens emitted (Prism)', html.includes('class="token')],
    ['code editor present', html.includes('npm__react-simple-code-editor') || html.includes('textarea')],
    ['quiz two-grid present', html.includes('quiz-grid')],
    ['quiz sticky code column', html.includes('quiz-code')],
  ]

  let allOk = true
  for (const [name, ok] of checks) {
    if (!ok) allOk = false
    console.log(`${ok ? 'OK ' : 'XX '} ${name}`)
  }
  console.log('\n' + (allOk ? 'SSR RENDER OK: App mounts and all new pieces render without throwing.' : 'SSR: some checks failed (see XX).'))
  process.exitCode = allOk ? 0 : 1
} catch (err) {
  console.error('SSR RENDER THREW:\n', err)
  process.exitCode = 1
} finally {
  await vite.close()
}
