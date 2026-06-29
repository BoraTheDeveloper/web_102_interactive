// Runs student JavaScript in a Web Worker so an infinite loop or error
// can't freeze or crash the page. console.log output is captured and returned.
//
// runUserCode(code) -> Promise<{ logs: string[], error: string | null }>

const WORKER_SOURCE = `
self.onmessage = (e) => {
  const code = e.data.code;
  const logs = [];

  function format(v) {
    if (typeof v === 'string') return v;
    if (typeof v === 'undefined') return 'undefined';
    if (typeof v === 'function') return '[Function]';
    try { return JSON.stringify(v); } catch (_) { return String(v); }
  }

  const sandboxConsole = {
    log:   (...a) => logs.push(a.map(format).join(' ')),
    error: (...a) => logs.push(a.map(format).join(' ')),
    warn:  (...a) => logs.push(a.map(format).join(' ')),
    info:  (...a) => logs.push(a.map(format).join(' ')),
  };

  let error = null;
  try {
    // 'use strict' so re-declaring a const, etc., is a real error like in a module.
    const fn = new Function('console', '"use strict";\\n' + code);
    fn(sandboxConsole);
  } catch (err) {
    error = (err && err.message) ? err.message : String(err);
  }

  self.postMessage({ logs, error });
};
`

const TIMEOUT_MS = 2000

export function runUserCode(code) {
  return new Promise((resolve) => {
    let url
    let worker
    try {
      const blob = new Blob([WORKER_SOURCE], { type: 'application/javascript' })
      url = URL.createObjectURL(blob)
      worker = new Worker(url)
    } catch (err) {
      resolve({ logs: [], error: 'Could not start the code runner: ' + err.message })
      return
    }

    const cleanup = () => {
      clearTimeout(timer)
      worker.terminate()
      URL.revokeObjectURL(url)
    }

    const timer = setTimeout(() => {
      cleanup()
      resolve({ logs: [], error: 'Timed out after 2s — check for an infinite loop.' })
    }, TIMEOUT_MS)

    worker.onmessage = (e) => {
      cleanup()
      resolve(e.data)
    }
    worker.onerror = (e) => {
      cleanup()
      resolve({ logs: [], error: e.message || 'Unknown error while running your code.' })
    }

    worker.postMessage({ code })
  })
}

// Marker the grader uses to pull a value out of the logs without showing it.
export const CHECK_PREFIX = '__CHECK__'
