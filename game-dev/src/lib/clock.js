import { useState, useEffect } from 'react'

// The unlock gate must not trust the student's device clock. Hosting on Vercel
// does not give you server time by itself: this code runs in the browser, so
// new Date() reads whatever the student's machine says. We ask the server once
// via its Date response header, then advance from performance.now(), which is
// monotonic and immune to the clock being changed mid-session.

let originServerMs = null // server epoch ms at the moment of sync
let originPerfMs = null // performance.now() at that same moment
let source = 'local' // 'server' | 'local' | 'override'

export function clockSource() {
  return source
}

export function now() {
  if (originServerMs === null) return new Date() // pre-sync, or fallback
  return new Date(originServerMs + (performance.now() - originPerfMs))
}

// Dev-only time travel, so the gate can be exercised without waiting for Sunday.
// import.meta.env.DEV is statically replaced at build time, so this whole branch
// is dropped from the production bundle. Students cannot use ?now= to unlock early.
if (import.meta.env.DEV) {
  const override = new URLSearchParams(location.search).get('now')
  const ms = override ? Date.parse(override) : NaN
  if (!Number.isNaN(ms)) {
    originServerMs = ms
    originPerfMs = performance.now()
    source = 'override'
  }
}

export async function syncClock({ timeoutMs = 2500 } = {}) {
  if (source === 'override') return source // don't stomp the dev override

  try {
    const ctl = new AbortController()
    const timer = setTimeout(() => ctl.abort(), timeoutMs)
    // The fragment is never sent to the server, so location.href is fine here.
    const res = await fetch(location.href, {
      method: 'HEAD',
      cache: 'no-store',
      signal: ctl.signal,
    })
    clearTimeout(timer)

    const ms = Date.parse(res.headers.get('date'))
    if (Number.isNaN(ms)) return source // header missing or unparseable: stay local

    // cache: 'no-store' bypasses the browser cache, not the CDN. A cached edge
    // response carries the origin's Date plus an Age saying how stale it is.
    const age = Number(res.headers.get('age') || 0)
    originServerMs = ms + (Number.isFinite(age) ? age * 1000 : 0)
    originPerfMs = performance.now()
    source = 'server'
  } catch {
    // Blocked, offline, aborted: fall through to the device clock.
  }
  return source
}

// Ticks the countdown. 30s, because the smallest label unit is a minute, so
// nothing visible can go stale. Pass 0 to disable for a term with no gated pages.
export function useNow(intervalMs = 30000) {
  const [t, setT] = useState(now)
  useEffect(() => {
    if (!intervalMs) return undefined
    const update = () => setT(now())
    const id = setInterval(update, intervalMs)
    // Background tabs throttle setInterval to about once a minute and frozen
    // tabs stop it, so re-read the moment the student comes back.
    const onVisible = () => {
      if (!document.hidden) update()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [intervalMs])
  return t
}
