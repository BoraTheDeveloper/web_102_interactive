import { useState, useEffect } from 'react'
import { allPages, findPage } from '../data/terms.js'
import { useNow } from '../lib/clock.js'
import { isUnlocked, msUntil, formatCountdown, formatUnlockLocal } from '../lib/gate.js'
import { nsKey, readSet, writeSet } from '../lib/storage.js'
import { navigate, replaceRoute } from '../lib/router.js'
import Sidebar from './Sidebar.jsx'
import ConceptView from './ConceptView.jsx'
import RepairView from './RepairView.jsx'
import ProjectBuilderView from './ProjectBuilderView.jsx'
import ProjectCards from './ProjectCards.jsx'
import WeekView from './WeekView.jsx'

function Topbar({ term, exploredCount, totalPages }) {
  const pct = totalPages ? `${Math.round((exploredCount / totalPages) * 100)}%` : '0%'
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-dot" aria-hidden="true" />
        <span>{term.title}</span>
        <small>· Interactive Review</small>
      </div>
      <div className="topbar-spacer" />
      <a className="btn btn--ghost" href="#/">
        All terms
      </a>
      <div
        className="course-progress"
        aria-label={`${exploredCount} of ${totalPages} pages explored`}
      >
        <span>
          {exploredCount} / {totalPages} explored
        </span>
        <span className="progress-track" aria-hidden="true">
          <span className="progress-fill" style={{ width: pct }} />
        </span>
      </div>
    </header>
  )
}

function LockedNotice({ page, now }) {
  return (
    <div className="week">
      <header className="week-header">
        <div className="week-kicker">● Not open yet</div>
        <h1 className="week-title">{page.title}</h1>
      </header>
      <div className="goal-card">
        <div className="goal-label">Opens {formatUnlockLocal(page.unlocksAt)}</div>
        <p>
          This week opens after we have covered it in class. Come back in{' '}
          <strong>{formatCountdown(msUntil(page, now))}</strong>.
        </p>
      </div>
    </div>
  )
}

function NothingOpen() {
  return (
    <div className="empty-state">
      <h1>Nothing open yet</h1>
      <p>The first week opens after our first class.</p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="empty-state">
      <h1>Not found</h1>
      <p>Pick a page from the sidebar.</p>
    </div>
  )
}

// The shell for one term: topbar, sidebar, and the page dispatch. App mounts
// this with key={term.id}, so switching terms remounts it and the useState
// initializer below re-reads the right namespaced storage key.
export default function TermShell({ term, slug }) {
  const pages = allPages(term)
  const gated = pages.some((p) => p.unlocksAt)
  const now = useNow(gated ? 30000 : 0)

  const exploredKey = nsKey(term.id, 'explored')
  const [explored, setExplored] = useState(() => readSet(exploredKey))
  useEffect(() => {
    writeSet(exploredKey, explored)
  }, [exploredKey, explored])

  const unlocked = pages.filter((p) => isUnlocked(p, now))
  const page = slug ? findPage(term, slug) : null
  const pageOpen = Boolean(page) && isUnlocked(page, now)

  // A bare #/t3 lands on the first thing the student can actually open.
  useEffect(() => {
    if (!slug && unlocked.length) replaceRoute(term.id, unlocked[0].slug)
  }, [slug, term.id, unlocked.length])

  // Mark on view, not on click, so a link you share to a student counts.
  useEffect(() => {
    if (!pageOpen) return
    setExplored((prev) => (prev.has(page.slug) ? prev : new Set(prev).add(page.slug)))
  }, [pageOpen, page && page.slug])

  // The denominator is every page in the term, not just the unlocked ones.
  // Counting only what is open reads "4 / 4 explored" with a full bar in week
  // four of twelve, which tells a student they are finished when they are a
  // third of the way in. The trade is that the bar cannot reach 100% until the
  // last week unlocks. Swap `pages` for `unlocked` here to go back.
  const total = pages.length
  const count = pages.filter((p) => explored.has(p.slug)).length

  function select(next) {
    const target = findPage(term, next)
    // Also guards WeekView's "Go deeper" links against a locked target.
    if (!target || !isUnlocked(target, now)) return
    navigate(term.id, next)
    window.scrollTo({ top: 0 })
  }

  function renderPage() {
    if (!slug) return unlocked.length ? null : <NothingOpen />
    if (!page) return <NotFound />
    if (!pageOpen) return <LockedNotice page={page} now={now} />
    switch (page.kind) {
      case 'concept':
        return <ConceptView concept={page.data} />
      case 'repair':
        return (
          <RepairView
            repair={page.data}
            kicker={term.kickers.repair}
            storageKey={nsKey(term.id, `repair:${page.data.slug}`)}
          />
        )
      case 'builder':
        return <ProjectBuilderView builder={page.data} kicker={term.kickers.project} />
      case 'projects':
        return <ProjectCards projects={page.data} />
      case 'week':
        return <WeekView week={page.data} onNavigate={select} />
      default:
        return null
    }
  }

  return (
    <>
      <Topbar term={term} exploredCount={count} totalPages={total} />
      <div className="app">
        <Sidebar nav={term.nav} activeSlug={slug} onSelect={select} now={now} />
        <main className="content">
          <div key={slug}>{renderPage()}</div>
        </main>
      </div>
    </>
  )
}
