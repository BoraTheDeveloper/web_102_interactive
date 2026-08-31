import { useState, useEffect } from 'react'

// Hand-rolled hash routing. No dependency, no server config.
//   #/                -> term picker
//   #/<termId>        -> canonicalized to that term's first unlocked page
//   #/<termId>/<slug> -> a page inside that term
//
// Every route hash starts with '#/'. Section ids ('cause', 'code', 'trace') never
// do, so the browser can't resolve a route to an anchor and scroll-jump.

export function parseHash(hash = location.hash) {
  const parts = String(hash).replace(/^#\/?/, '').split('/').filter(Boolean)
  return { termId: parts[0] || null, slug: parts[1] || null }
}

export const buildHash = (termId, slug) =>
  !termId ? '#/' : slug ? `#/${termId}/${slug}` : `#/${termId}`

// Adds a history entry. Use for anything the student clicked.
export function navigate(termId, slug) {
  const next = buildHash(termId, slug)
  if (location.hash !== next) location.hash = next
}

// No history entry. Use for canonicalizing a URL the student didn't type.
// Rebuilds from pathname + search so the /game-dev/ base prefix survives.
export function replaceRoute(termId, slug) {
  const next = location.pathname + location.search + buildHash(termId, slug)
  history.replaceState(null, '', next)
  // replaceState does NOT fire hashchange, so without this the address bar
  // updates while every listener stays on the old route.
  window.dispatchEvent(new Event('hashchange'))
}

export function useRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    onChange() // catch a hash written between first render and this effect
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
