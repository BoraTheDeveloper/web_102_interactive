import { useState } from 'react'
import Section from './Section.jsx'
import CodeBlock from './CodeBlock.jsx'
import PythonTrace from './PythonTrace.jsx'
import BugFix from './BugFix.jsx'
import RichText from './RichText.jsx'

// Renders a bug page: broken code -> expected vs actual -> trace -> fix -> mini challenge.
export default function BugView({ bug }) {
  const [showFix, setShowFix] = useState(false)

  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● Bug · Debug Common Bugs</div>
        <h1 className="week-title">{bug.title}</h1>
      </header>

      <Section id="broken" number="01" title="Broken code" lead="Here is the code that does not do what the student wanted.">
        <CodeBlock code={bug.brokenCode} />
      </Section>

      <div className="goal-card">
        <div className="goal-label">What the student expected</div>
        <p>{bug.expected}</p>
      </div>
      <div className="goal-card">
        <div className="goal-label">What actually happens</div>
        <p>{bug.actual}</p>
      </div>

      <Section
        id="trace"
        number="02"
        title="Trace"
        lead="Step through to see exactly where the bug changes the program's behavior."
      >
        <PythonTrace config={bug.trace} />
      </Section>

      <Section id="fix" number="03" title="Fix">
        <p className="theory-p">
          <RichText>{bug.fix.hint}</RichText>
        </p>
        <div className="run-bar">
          <button className="btn btn--ghost" onClick={() => setShowFix((s) => !s)}>
            {showFix ? 'Hide fixed code' : 'Show fixed code'}
          </button>
        </div>
        {showFix && <CodeBlock code={bug.fix.solution} />}
      </Section>

      <Section id="challenge" number="04" title="Mini challenge" lead="Fix the code yourself. Run it with real Python to check.">
        <BugFix item={bug.challenge} />
      </Section>
    </article>
  )
}
