// The landing screen, centred in the viewport. Current term first.
export default function TermPicker({ terms, onPick }) {
  const ordered = [...terms].sort((a, b) => Number(b.active) - Number(a.active))

  return (
    <div className="term-picker">
      <div className="term-picker-inner">
        <header className="term-picker-head">
          <div className="week-kicker">● Game Dev</div>
          <h1 className="week-title">Interactive Review</h1>
          <p className="week-subtitle">Pick your term.</p>
        </header>

        <div className="term-grid">
          {ordered.map((term) => (
            <div className="term-card" key={term.id}>
              <div className="term-card-head">
                <h3>{term.label}</h3>
                <span className={term.active ? 'badge badge--pass' : 'badge badge--level'}>
                  {term.active ? 'Current' : 'Archive'}
                </span>
              </div>
              <p>{term.tagline}</p>
              <button className="btn btn--primary" onClick={() => onPick(term.id)}>
                Open {term.label} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
