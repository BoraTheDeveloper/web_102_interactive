const formatWeek = (id) => String(id).padStart(2, '0')

export default function Sidebar({ weeks, activeSlug, onSelect }) {
  return (
    <aside className="sidebar" aria-label="Course weeks">
      <p className="rail-label">Course</p>

      <nav className="week-nav" aria-label="Course weeks">
        {weeks.map((w) => {
          const active = w.slug === activeSlug
          const cls =
            'week-link' +
            (active ? ' week-link--active' : '') +
            (w.available ? '' : ' week-link--soon')
          return (
            <button
              key={w.slug}
              className={cls}
              onClick={() => w.available && onSelect(w.slug)}
              disabled={!w.available}
              aria-current={active ? 'page' : undefined}
            >
              <span className="week-num">{formatWeek(w.id)}</span>
              <span className="week-name">{w.title}</span>
              {active ? (
                <span className="week-state week-state--current">here</span>
              ) : !w.available ? (
                <span className="week-state week-state--soon">soon</span>
              ) : null}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
