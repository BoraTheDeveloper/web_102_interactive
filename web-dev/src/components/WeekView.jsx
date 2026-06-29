import Theory from './Theory.jsx'
import RunnableExample from './RunnableExample.jsx'
import CodeBlock from './CodeBlock.jsx'
import Predict from './practice/Predict.jsx'
import CodeExercise from './practice/CodeExercise.jsx'
import Quiz from './practice/Quiz.jsx'
import FeynmanCheck from './FeynmanCheck.jsx'
import traces from './demos/traces.jsx'
import TracedDemo from './TracedDemo.jsx'

export const STUDY_SECTIONS = [
  { id: 'theory', number: '01', title: 'Theory' },
  { id: 'examples', number: '02', title: 'Examples' },
  { id: 'practice', number: '03', title: 'Practice' },
  { id: 'feynman', number: '04', title: 'Feynman Check' },
]

function Section({ id, number, title, children }) {
  return (
    <section className="section" id={id}>
      <div className="section-head">
        <span className="section-num">{number}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Example({ ex }) {
  const trace = ex.tracedDemo ? traces[ex.tracedDemo] : null
  const badge = ex.runnable ? 'Runnable' : trace ? 'Traced' : 'Read'

  return (
    <div className="example">
      <div className="example-head">
        <span className="example-badge">{badge}</span>
        <h4 className="example-title">{ex.title}</h4>
      </div>
      {ex.caption && <p className="example-caption">{ex.caption}</p>}
      <div className="example-body">
        {ex.runnable ? (
          <RunnableExample code={ex.code} />
        ) : trace ? (
          <TracedDemo config={trace} />
        ) : (
          <CodeBlock code={ex.code} lang={ex.lang} />
        )}
      </div>
    </div>
  )
}

function renderPractice(item) {
  switch (item.type) {
    case 'predict':
      return <Predict item={item} />
    case 'code':
      return <CodeExercise item={item} />
    case 'quiz':
      return <Quiz item={item} />
    default:
      return null
  }
}

export function WeekProgressRail({ activeSection, progress, complete, onCompleteToggle }) {
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const visibleProgress = complete ? 100 : progress
  const offset = circumference * (1 - visibleProgress / 100)

  return (
    <aside className="progress-rail" aria-label="Week progress">
      <div className="progress-card">
        <div className="progress-ring">
          <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
            <circle className="progress-ring-bg" cx="44" cy="44" r={radius} fill="none" strokeWidth="8" />
            <circle
              className="progress-ring-fg"
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="progress-ring-label">{`${visibleProgress}%`}</div>
        </div>
        <div className="progress-label">Week progress</div>
      </div>

      <nav className="progress-nav" aria-label="Study sections">
        {STUDY_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={'progress-link' + (activeSection === section.id ? ' progress-link--active' : '')}
            aria-current={activeSection === section.id ? 'step' : undefined}
          >
            <span className="progress-dot" aria-hidden="true" />
            {section.title}
          </a>
        ))}
      </nav>

      <button className="btn btn--primary progress-complete-button" onClick={onCompleteToggle}>
        {complete ? 'Week marked complete' : 'Mark week complete →'}
      </button>
    </aside>
  )
}

export default function WeekView({ week }) {
  return (
    <article className="week">
        <header className="week-header">
          <div className="week-kicker">● Week {String(week.id).padStart(2, '0')} · In progress</div>
          <h1 className="week-title">{week.title}</h1>
          {week.subtitle && <p className="week-subtitle">{week.subtitle}</p>}
        </header>

        <div className="goal-card">
          <div className="goal-label">Goal</div>
          <p>{week.goal}</p>
        </div>

        <Section id="theory" number="01" title="Theory">
          <Theory blocks={week.theory} />
        </Section>

        <Section id="examples" number="02" title="Examples">
          <p className="section-lead">Read, then run. Traced demos step through what happens inside React.</p>
          {week.examples.map((ex) => (
            <Example key={ex.id} ex={ex} />
          ))}
        </Section>

        <Section id="practice" number="03" title="Practice">
          <p className="section-lead">
            Try these yourself. Code exercises run in your browser and check your answer.
          </p>
          {week.practice.map((item) => (
            <div key={item.id}>{renderPractice(item)}</div>
          ))}
        </Section>

        <Section id="feynman" number="04" title="Feynman Check">
          <p className="section-lead">Explain each in your own words, then reveal a model answer.</p>
          <FeynmanCheck items={week.feynman} />
        </Section>
      </article>
  )
}
