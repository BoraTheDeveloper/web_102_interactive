import { useEffect } from 'react'
import { TERMS, getTerm } from './data/terms.js'
import { useRoute, navigate, replaceRoute } from './lib/router.js'
import { clockSource } from './lib/clock.js'
import TermPicker from './components/TermPicker.jsx'
import TermShell from './components/TermShell.jsx'

export default function App() {
  const { termId, slug } = useRoute()
  const term = termId ? getTerm(termId) : null

  // A hash naming a term that doesn't exist has nothing to render.
  useEffect(() => {
    if (termId && !term) replaceRoute(null, null)
  }, [termId, term])

  return (
    // data-clock exposes 'server' | 'local' | 'override' in the Elements panel,
    // so the clock path is inspectable in production with no student-visible UI.
    <div className="app-shell" data-clock={clockSource()}>
      {term ? (
        // key remounts on a term switch so TermShell's useState initializer
        // re-reads the right namespaced localStorage key.
        <TermShell key={term.id} term={term} slug={slug} />
      ) : (
        <TermPicker terms={TERMS} onPick={(id) => navigate(id, null)} />
      )}
    </div>
  )
}
