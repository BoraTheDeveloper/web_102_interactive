import Section from './Section.jsx'
import PythonTrace from './PythonTrace.jsx'
import ProjectChecklist from './ProjectChecklist.jsx'

// Tic-Tac-Toe readiness: a small board trace + a persisted checklist that
// turns review into Week-9 preparation.
export default function ReadinessView({ readiness }) {
  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● Project Readiness</div>
        <h1 className="week-title">{readiness.title}</h1>
        {readiness.subtitle && <p className="week-subtitle">{readiness.subtitle}</p>}
      </header>

      <div className="goal-card">
        <div className="goal-label">Goal</div>
        <p>{readiness.goal}</p>
      </div>

      {readiness.trace && (
        <Section id="example" number="01" title="A tiny board example" lead={readiness.traceLead}>
          <PythonTrace config={readiness.trace} />
        </Section>
      )}

      <Section
        id="checklist"
        number="02"
        title="Before Week 9, can you..."
        lead="Check off each skill you can do on your own. This turns review into preparation."
      >
        <ProjectChecklist
          storageKey="ip-readiness-ttt"
          title={readiness.title}
          intro={readiness.checklistIntro}
          items={readiness.items}
        />
      </Section>
    </article>
  )
}
