import Section from './Section.jsx'
import CodeBlock from './CodeBlock.jsx'
import RichText from './RichText.jsx'

// Renders a "Review by Week" page: recap -> key concepts -> class code ->
// links to deeper interactive pages -> takeaways.
export default function WeekView({ week, onNavigate }) {
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

      <Section id="code" number={num()} title="Class code" lead="The code we wrote together in class.">
        <CodeBlock code={week.code} lang={week.codeLang || 'python'} />
      </Section>

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

      <Section id="takeaways" number={num()} title="Takeaways" lead="What you should be able to do after this week.">
        <ul className="takeaway-list">
          {week.takeaways.map((t, i) => (
            <li key={i}>
              <RichText>{t}</RichText>
            </li>
          ))}
        </ul>
      </Section>
    </article>
  )
}
