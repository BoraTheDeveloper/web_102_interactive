import Section from './Section.jsx'
import CodeBlock from './CodeBlock.jsx'
import RichText from './RichText.jsx'
import QuizCheck from './QuizCheck.jsx'
import RepairChecklist from './RepairChecklist.jsx'

// Renders a "Review by Week" page: recap -> key concepts -> checklist ->
// class code -> quiz -> links to deeper interactive pages -> takeaways.
//
// Every section past the recap is optional. A week whose class has not run yet
// carries only a title and a summary, and a planning week (T3 W10) has no code
// at all, so nothing here may assume a field exists. `checklist` is for weeks
// the student works through rather than reviews (T3 W11 build order, W12 talk
// order): `{ title, lead, items: [{ id, label, hint? }] }`, ticks kept per week
// under `storageKey`.
export default function WeekView({ week, onNavigate, storageKey }) {
  let secNum = 1
  const num = () => String(secNum++).padStart(2, '0')

  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● Review by Week</div>
        <h1 className="week-title">{week.title}</h1>
        {week.subtitle && <p className="week-subtitle">{week.subtitle}</p>}
      </header>

      <div className="goal-card">
        <div className="goal-label">Recap</div>
        <p>
          <RichText>{week.summary}</RichText>
        </p>
      </div>

      {week.keyPoints && week.keyPoints.length > 0 && (
        <Section id="keypoints" number={num()} title="Key concepts" lead="The main ideas from this week.">
          <div className="key-points">
            {week.keyPoints.map((kp, i) => (
              <div key={i} className="key-point">
                <h3>{kp.heading}</h3>
                <p>
                  <RichText>{kp.body}</RichText>
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {week.checklist && (
        <Section id="checklist" number={num()} title={week.checklist.title} lead={week.checklist.lead}>
          <RepairChecklist storageKey={storageKey} title="Tick as you go" items={week.checklist.items} />
        </Section>
      )}

      {week.code && (
        <Section id="code" number={num()} title="Class code" lead="The code we wrote together in class.">
          <CodeBlock code={week.code} lang={week.codeLang || 'python'} />
        </Section>
      )}

      {week.quiz && (
        <Section
          id="quiz"
          number={num()}
          title="Check yourself"
          lead="Same questions as the Kahoot next class. Answer before you scroll back up."
        >
          <QuizCheck quiz={week.quiz} />
        </Section>
      )}

      {week.related && week.related.length > 0 && (
        <Section id="related" number={num()} title="Go deeper" lead="Interactive pages that cover this week's concepts.">
          <div className="related-links">
            {week.related.map((r) => (
              <button key={r.slug} className="related-link" onClick={() => onNavigate(r.slug)}>
                <span>{r.label}</span>
                <span className="related-arrow">→</span>
              </button>
            ))}
          </div>
        </Section>
      )}

      {week.takeaways && week.takeaways.length > 0 && (
        <Section id="takeaways" number={num()} title="Takeaways" lead="What you should be able to do after this week.">
          <ul className="takeaway-list">
            {week.takeaways.map((t, i) => (
              <li key={i}>
                <RichText>{t}</RichText>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  )
}
