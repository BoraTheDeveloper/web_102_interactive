// Section-based sidebar. The Intro Python site is organized by role, not by
// week, so the sidebar groups pages under labeled sections.
export default function Sidebar({ nav, activeSlug, onSelect }) {
  return (
    <aside className="sidebar" aria-label="Course sections">
      <p className="rail-label">Review</p>
      <nav className="week-nav" aria-label="Course sections">
        {nav.map((group) => (
          <div className="nav-group" key={group.section}>
            <p className="nav-group-label">{group.section}</p>
            {group.pages.map((page) => {
              const active = page.slug === activeSlug
              return (
                <button
                  key={page.slug}
                  className={'week-link' + (active ? ' week-link--active' : '')}
                  onClick={() => onSelect(page.slug)}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="week-name">{page.title}</span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
