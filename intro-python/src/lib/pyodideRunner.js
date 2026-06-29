// Lazy Pyodide runner. Loads real CPython (compiled to WASM) from a CDN
// inside a Web Worker on first use, so student Python can't freeze the page.
// stdout/stderr and tracebacks are captured and returned.
//
// runPython(code, stdin?) -> Promise<{ output, error, timedOut }>
// preloadPyodide() -> starts loading Pyodide in the background
//
// The Pyodide download (~10MB) is awaited WITHOUT a timeout, so a slow first
// load is not mistaken for an infinite loop. Only code *execution* is bounded
// by TIMEOUT_MS. On an execution timeout the worker is terminated and rebuilt
// next call, so a hung run can never block later runs.

const PYODIDE_VERSION = '0.26.4'
const CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full`
const TIMEOUT_MS = 4000
const LOAD_TIMEOUT_MS = 45000

const WORKER_SOURCE = `
let py = null
async function ensure() {
  if (py) return py
  importScripts('${CDN}/pyodide.js')
  py = await loadPyodide()
  return py
}
self.onmessage = async (e) => {
  if (e.data.load) {
    try { await ensure(); self.postMessage({ ready: true }) }
    catch (err) { self.postMessage({ ready: false, error: (err && err.message) ? err.message : String(err) }) }
    return
  }
  const { code, id, stdin } = e.data
  let output = ''
  let error = null
  try {
    const pyodide = await ensure()
    pyodide.setStdout({ batched: (s) => { output += s } })
    pyodide.setStderr({ batched: (s) => { output += s } })
    if (stdin) {
      const lines = stdin.split('\\n')
      let i = 0
      pyodide.setStdin({ stdin: () => (i < lines.length ? lines[i++] + '\\n' : null) })
    } else {
      // No stdin: input() hits EOF immediately instead of hanging the worker.
      pyodide.setStdin({ stdin: () => null })
    }
    await pyodide.runPythonAsync(code)
  } catch (err) {
    error = (err && err.message) ? err.message : String(err)
  }
  self.postMessage({ id, output, error })
}
`

let worker = null
let readyPromise = null // resolves to null on ready, or an error string on load failure
let nextId = 0
const pending = new Map() // id -> { resolve, timer }

function resetWorker(reason) {
  if (worker) {
    worker.terminate()
    worker = null
  }
  readyPromise = null
  for (const [, job] of pending) {
    clearTimeout(job.timer)
    job.resolve({ output: '', error: reason, timedOut: false })
  }
  pending.clear()
}

function ensureWorker() {
  if (readyPromise) return readyPromise
  const blob = new Blob([WORKER_SOURCE], { type: 'application/javascript' })
  const url = URL.createObjectURL(blob)
  worker = new Worker(url)
  readyPromise = new Promise((resolve) => {
    let settled = false
    const loadTimer = setTimeout(() => {
      if (settled) return
      settled = true
      resetWorker('Could not load Python in time (check your internet connection).')
      resolve('Could not load Python in time (check your internet connection).')
    }, LOAD_TIMEOUT_MS)

    worker.onmessage = (e) => {
      if (e.data.ready !== undefined) {
        if (settled) return
        settled = true
        clearTimeout(loadTimer)
        if (e.data.ready) {
          resolve(null)
        } else {
          resetWorker('Could not load Python: ' + (e.data.error || 'unknown error'))
          resolve('Could not load Python: ' + (e.data.error || 'unknown error'))
        }
        return
      }
      const { id, output, error } = e.data
      const job = pending.get(id)
      if (!job) return
      clearTimeout(job.timer)
      pending.delete(id)
      job.resolve({ output, error, timedOut: false })
    }
    worker.onerror = (e) => {
      if (settled) return
      settled = true
      clearTimeout(loadTimer)
      resetWorker(e.message || 'Worker error')
      resolve(e.message || 'Worker error')
    }
  })
  worker.postMessage({ load: true })
  return readyPromise
}

export function preloadPyodide() {
  ensureWorker()
}

export async function runPython(code, stdin) {
  const loadError = await ensureWorker()
  if (loadError) {
    return { output: '', error: loadError, timedOut: false }
  }
  return new Promise((resolve) => {
    const id = nextId++
    const timer = setTimeout(() => {
      pending.delete(id)
      // Execution hung (infinite loop). Kill the worker so it can't keep
      // spinning; it is rebuilt on the next runPython call.
      resetWorker('Runner was reset after a timeout.')
      resolve({
        output: '',
        error: 'Timed out after 4s — check for an infinite loop.',
        timedOut: true,
      })
    }, TIMEOUT_MS)
    pending.set(id, { resolve, timer })
    worker.postMessage({ code, id, stdin })
  })
}

// Marker the grader uses to pull a value out of stdout without showing it.
export const CHECK_PREFIX = '__CHECK__'
