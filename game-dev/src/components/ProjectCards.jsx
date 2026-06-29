// Final project ideas, rendered as a card grid. Each card lists the skills
// needed, a minimum version, and stretch ideas.
export default function ProjectCards({ projects }) {
  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● Final Project Ideas</div>
        <h1 className="week-title">Pick a final project</h1>
        <p className="week-subtitle">
          Choose something you can actually finish. Each card shows the skills you need, a minimum
          version, and stretch ideas.
        </p>
      </header>

      <div className="project-grid">
        {projects.map((p) => (
          <section className="project-card" key={p.id}>
            <div className="project-card-head">
              <span className={'badge badge--' + (p.level === 'Beginner' ? 'pass' : 'level')}>
                {p.level}
              </span>
              <h3>{p.name}</h3>
            </div>
            <div className="project-card-section">
              <div className="project-card-label">Skills needed</div>
              <ul className="project-card-list">
                {p.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="project-card-section">
              <div className="project-card-label">Minimum version</div>
              <ul className="project-card-list">
                {p.minimum.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="project-card-section">
              <div className="project-card-label">Stretch</div>
              <ul className="project-card-list">
                {p.stretch.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
