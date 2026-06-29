import Section from './Section.jsx'
import CodeBlock from './CodeBlock.jsx'
import Trace from './Trace.jsx'
import RepairChecklist from './RepairChecklist.jsx'
import RichText from './RichText.jsx'

// Renders a Space Shooter repair page: symptom -> likely cause -> where to
// check -> debug trace -> fix checklist -> (optional) fixed code.
export default function RepairView({ repair }) {
  let num = 1
  const n = () => String(num++).padStart(2, '0')

  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● Space Shooter Repair Center</div>
        <h1 className="week-title">{repair.title}</h1>
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
        <RepairChecklist storageKey={`gd-repair-${repair.slug}`} title={repair.title} items={repair.checklist} />
      </Section>

      {repair.fixCode && (
        <Section id="code" number={n()} title="Fixed code">
          <CodeBlock code={repair.fixCode} />
        </Section>
      )}
    </article>
  )
}
