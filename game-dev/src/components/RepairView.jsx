import Section from './Section.jsx'
import CodeBlock from './CodeBlock.jsx'
import Trace from './Trace.jsx'
import RepairChecklist from './RepairChecklist.jsx'
import RichText from './RichText.jsx'

// Renders a repair page: symptom -> likely cause -> where to check -> debug
// trace -> fix checklist -> (optional) fixed code. The kicker and the storage
// key come from the term, so this component doesn't decide where state lives.
//
// `game` and `workingMeans` are optional and T3 only. One root cause can show
// up in more than one game, so the page is tagged rather than split, and
// "Working means:" is the phrase students already know from every handout.
export default function RepairView({ repair, kicker, storageKey }) {
  let num = 1
  const n = () => String(num++).padStart(2, '0')

  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● {kicker}</div>
        <h1 className="week-title">{repair.title}</h1>
        {repair.game && <p className="week-subtitle">Shows up in: {repair.game}</p>}
      </header>

      <div className="goal-card">
        <div className="goal-label">Symptom</div>
        <p>{repair.symptom}</p>
      </div>

      <Section id="cause" number={n()} title="Likely cause">
        <p className="theory-p">
          <RichText>{repair.likelyCause}</RichText>
        </p>
      </Section>

      <Section id="where" number={n()} title="Where to check">
        <ul className="theory-list">
          {repair.whereToCheck.map((c, i) => (
            <li key={i}>
              <RichText>{c}</RichText>
            </li>
          ))}
        </ul>
      </Section>

      {repair.trace && (
        <Section id="trace" number={n()} title="Debug trace" lead="Step through to find where it goes wrong.">
          <Trace config={repair.trace} />
        </Section>
      )}

      <Section id="fix" number={n()} title="Fix checklist">
        {repair.workingMeans && (
          <p className="repair-working">
            <strong>Working means:</strong> <RichText>{repair.workingMeans}</RichText>
          </p>
        )}
        <RepairChecklist storageKey={storageKey} title={repair.title} items={repair.checklist} />
      </Section>

      {repair.fixCode && (
        <Section id="code" number={n()} title="Fixed code">
          <CodeBlock code={repair.fixCode} />
        </Section>
      )}
    </article>
  )
}
