import { isUnlocked, msUntil, formatCountdown, formatUnlockLocal } from '../lib/gate.js'

// Section-based sidebar. Pages are grouped by role, not by week number.
// A gated page that has not opened yet is disabled and shows a live countdown,
// matching the web-dev site's --soon pattern.
export default function Sidebar({ nav, activeSlug, onSelect, now }) {
  return (
    <aside className="sidebar" aria-label="Course sections">
      <p className="rail-label">Review</p>
      <nav className="week-nav" aria-label="Course sections">
        {nav.map((group) => (
          <div className="nav-group" key={group.section}>
            <p className="nav-group-label">{group.section}</p>
            {group.pages.map((page) => {
              const active = page.slug === activeSlug
              const locked = !isUnlocked(page, now)
              const cls =
                'week-link' +
                (active ? ' week-link--active' : '') +
                (locked ? ' week-link--soon' : '')
              return (
                <button
                  key={page.slug}
                  className={cls}
                  onClick={() => !locked && onSelect(page.slug)}
                  disabled={locked}
                  title={locked ? `Opens ${formatUnlockLocal(page.unlocksAt)}` : undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="week-name">{page.title}</span>
                  {locked && (
                    <span className="week-state week-state--soon">
                      {formatCountdown(msUntil(page, now), { short: true })}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
