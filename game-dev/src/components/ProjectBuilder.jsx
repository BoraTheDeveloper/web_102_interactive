import { useState } from 'react'

// Stepped final-project chooser. Each step has options; after every step is
// answered, builder.generate(choices) produces a scoped project checklist.
export default function ProjectBuilder({ builder }) {
  const [choices, setChoices] = useState({})
  const stepIdx = builder.steps.findIndex((s) => !(s.id in choices))
  const done = stepIdx === -1
  const result = done ? builder.generate(choices) : null

  function pick(step, option) {
    setChoices((c) => ({ ...c, [step.id]: option }))
  }

  return (
    <div className="project-builder">
      {builder.steps.map((s, i) => {
        const answered = s.id in choices
        const active = i === stepIdx
        return (
          <div key={s.id} className={'builder-step' + (active ? ' builder-step--active' : '') + (answered ? ' builder-step--done' : '')}>
            <div className="builder-step-label">
              <span className="builder-step-num">{i + 1}</span>
              {s.label}
            </div>
            <div className="builder-options">
              {s.options.map((opt) => (
                <button
                  key={opt}
                  className={'btn ' + (choices[s.id] === opt ? 'btn--primary' : 'btn--ghost')}
                  onClick={() => pick(s, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {answered && <div className="builder-answer">You chose: {choices[s.id]}</div>}
          </div>
        )
      })}

      {done && result && (
        <div className="builder-result">
          <h3>Your game: {result.name}</h3>
          <div className="builder-result-section">
            <div className="project-card-label">Core checklist</div>
            <ul className="project-card-list">
              {result.checklist.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="builder-result-section">
            <div className="project-card-label">Stretch</div>
            <ul className="project-card-list">
              {result.stretch.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <button className="btn btn--ghost" onClick={() => setChoices({})}>
            Start over
          </button>
        </div>
      )}
    </div>
  )
}
