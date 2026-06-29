import { useState, useEffect } from 'react'
import { NAV, getPage } from './data/index.js'
import Sidebar from './components/Sidebar.jsx'
import SkillView from './components/SkillView.jsx'
import BugView from './components/BugView.jsx'
import ReadinessView from './components/ReadinessView.jsx'
import ProjectCards from './components/ProjectCards.jsx'
import WeekView from './components/WeekView.jsx'

const STORAGE_KEY = 'ip-explored'

function Topbar({ exploredCount, totalPages }) {
  const pct = `${Math.round((exploredCount / totalPages) * 100)}%`
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-dot" aria-hidden="true" />
        <span>Intro Python</span>
        <small>· Interactive Review</small>
      </div>
      <div className="topbar-spacer" />
      <div className="course-progress" aria-label={`${exploredCount} of ${totalPages} pages practiced`}>
        <span>
          {exploredCount} / {totalPages} practiced
        </span>
        <span className="progress-track" aria-hidden="true">
          <span className="progress-fill" style={{ width: pct }} />
        </span>
      </div>
    </header>
  )
}

export default function App() {
  const firstSlug = NAV[0].pages[0].slug
  const [activeSlug, setActiveSlug] = useState(firstSlug)
  const [explored, setExplored] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
    } catch {
      return new Set()
    }
  })

  const totalPages = NAV.reduce((n, g) => n + g.pages.length, 0)
  const page = getPage(activeSlug)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...explored]))
  }, [explored])

  function select(slug) {
    setActiveSlug(slug)
    setExplored((prev) => {
      const next = new Set(prev)
      next.add(slug)
      return next
    })
    window.scrollTo({ top: 0 })
  }

  function renderPage() {
    if (!page) {
      return (
        <div className="empty-state">
          <h1>Not found</h1>
          <p>Pick a page from the sidebar.</p>
        </div>
      )
    }
    switch (page.kind) {
      case 'skill':
      case 'review':
        return <SkillView skill={page.data} />
      case 'bug':
        return <BugView bug={page.data} />
      case 'readiness':
        return <ReadinessView readiness={page.data} />
      case 'projects':
        return <ProjectCards projects={page.data} />
      case 'week':
        return <WeekView week={page.data} onNavigate={select} />
      default:
        return null
    }
  }

  return (
    <div className="app-shell">
      <Topbar exploredCount={explored.size} totalPages={totalPages} />
      <div className="app">
        <Sidebar nav={NAV} activeSlug={activeSlug} onSelect={select} />
        <main className="content">
          <div key={activeSlug}>{renderPage()}</div>
        </main>
      </div>
    </div>
  )
}
