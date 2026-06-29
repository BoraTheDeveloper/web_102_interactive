import { useEffect, useState } from 'react'
import allWeeks from './data/weeks/index.js'
import Sidebar from './components/Sidebar.jsx'
import WeekView, { STUDY_SECTIONS, WeekProgressRail } from './components/WeekView.jsx'

function Topbar({ activeWeek, completedCount, totalWeeks }) {
  const progress = `${Math.round((completedCount / totalWeeks) * 100)}%`

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-dot" aria-hidden="true" />
        <span>Web Dev 102</span>
        <small>· Interactive Review</small>
      </div>
      <div className="topbar-spacer" />
      {activeWeek && (
        <div className="topbar-context">
          Week {String(activeWeek.id).padStart(2, '0')} · {activeWeek.title}
        </div>
      )}
      <div className="course-progress" aria-label={`${completedCount} of ${totalWeeks} weeks completed`}>
        <span>
          {completedCount} / {totalWeeks} completed
        </span>
        <span className="progress-track" aria-hidden="true">
          <span className="progress-fill" style={{ width: progress }} />
        </span>
      </div>
    </header>
  )
}

function useStudyProgress(activeSlug, enabled) {
  const [activeSection, setActiveSection] = useState(STUDY_SECTIONS[0].id)
  const [progress, setProgress] = useState(Math.round(100 / STUDY_SECTIONS.length))

  useEffect(() => {
    if (!enabled) return undefined

    function updateProgress() {
      const bottom = window.scrollY + window.innerHeight
      const reachedPageEnd = bottom >= document.documentElement.scrollHeight - 16
      const top = window.scrollY + 128
      let activeIndex = reachedPageEnd ? STUDY_SECTIONS.length - 1 : 0

      if (!reachedPageEnd) {
        STUDY_SECTIONS.forEach((section, index) => {
          const el = document.getElementById(section.id)
          if (el && el.offsetTop <= top) activeIndex = index
        })
      }

      setActiveSection(STUDY_SECTIONS[activeIndex].id)
      setProgress(Math.round(((activeIndex + 1) / STUDY_SECTIONS.length) * 100))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [activeSlug, enabled])

  return { activeSection, progress }
}

export default function App() {
  const firstAvailable = allWeeks.find((w) => w.available) || allWeeks[0]
  const [activeSlug, setActiveSlug] = useState(firstAvailable.slug)
  const [completedBySlug, setCompletedBySlug] = useState({})
  const week = allWeeks.find((w) => w.slug === activeSlug)
  const availableWeeks = allWeeks.filter((w) => w.available)
  const completedCount = availableWeeks.filter((item) => completedBySlug[item.slug]).length
  const complete = Boolean(completedBySlug[activeSlug])
  const hasAvailableWeek = Boolean(week && week.available)
  const { activeSection, progress } = useStudyProgress(activeSlug, hasAvailableWeek)

  function completeCurrentWeek() {
    if (!hasAvailableWeek) return

    setCompletedBySlug((current) => ({
      ...current,
      [activeSlug]: true,
    }))

    const activeIndex = availableWeeks.findIndex((item) => item.slug === activeSlug)
    const nextWeek = availableWeeks[activeIndex + 1]
    if (nextWeek) {
      setActiveSlug(nextWeek.slug)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="app-shell">
      <Topbar activeWeek={week} completedCount={completedCount} totalWeeks={availableWeeks.length} />
      <div className={'app' + (hasAvailableWeek ? ' app--with-progress' : '')}>
        <Sidebar weeks={allWeeks} activeSlug={activeSlug} onSelect={setActiveSlug} />
        <main className="content">
          {hasAvailableWeek ? (
            // key forces a fresh mount per week, so practice state resets cleanly
            <WeekView week={week} key={week.slug} />
          ) : (
            <div className="empty-state">
              <h1>Coming soon</h1>
              <p>This week’s interactive lesson hasn’t been built yet.</p>
            </div>
          )}
        </main>
        {hasAvailableWeek && (
          <WeekProgressRail
            activeSection={activeSection}
            progress={progress}
            complete={complete}
            onCompleteToggle={completeCurrentWeek}
          />
        )}
      </div>
    </div>
  )
}
