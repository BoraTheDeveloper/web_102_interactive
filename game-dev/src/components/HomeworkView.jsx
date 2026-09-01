import Section from './Section.jsx'
import CodeBlock from './CodeBlock.jsx'
import RichText from './RichText.jsx'
import RepairChecklist from './RepairChecklist.jsx'
import { isUnlocked, msUntil, formatCountdown, formatUnlockLocal } from '../lib/gate.js'

// Renders one Pong homework chunk: goal -> what to build -> working means ->
// where to look -> rescue file.
//
// The rescue file is the complete answer, so it is held back until the week it
// is handed out in class. That is the only gate in the app below page level.
// It reuses isUnlocked, which takes any object carrying an unlocksAt string and
// does not care that the object is a page. `now` is a prop rather than a second
// useNow() call, so one timer in TermShell drives every countdown on screen.
function Rescue({ chunk, now }) {
  const gate = { unlocksAt: chunk.rescueUnlocksAt }

  if (!isUnlocked(gate, now)) {
    return (
      <div className="rescue-locked">
        <div className="goal-label">Opens {formatUnlockLocal(chunk.rescueUnlocksAt)}</div>
        <p>
          The finished file goes up at the start of next class, the same time it is handed
          out in the room. Try it yourself first. If you are stuck, the checklist above
          names the shape of every line you need.
        </p>
        <p className="rescue-countdown">
          Opens in <strong>{formatCountdown(msUntil(gate, now))}</strong>.
        </p>
      </div>
    )
  }

  return (
    <>
      <p className="theory-p">
        This is one way to write it, not the only way. If yours works and looks different,
        yours is fine. Compare it against this to see what you did differently.
      </p>
      <CodeBlock code={chunk.rescueCode} lang="python" />
    </>
  )
}

export default function HomeworkView({ chunk, kicker, storageKey, now, onNavigate }) {
  let secNum = 1
  const num = () => String(secNum++).padStart(2, '0')

  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● {kicker}</div>
        <h1 className="week-title">{chunk.title}</h1>
        <p className="week-subtitle">
          Chunk {chunk.chunk} of 5. Keep growing the same file, <code className="inline-code">{chunk.file}</code>.
        </p>
      </header>

      <div className="goal-card">
        <div className="goal-label">Goal</div>
        <p>
          <RichText>{chunk.goal}</RichText>
        </p>
      </div>

      <Section
        id="build"
        number={num()}
        title="What you are building"
        lead="Tick each one off as it works. The page remembers."
      >
        <p className="theory-p">
          <RichText>{chunk.building}</RichText>
        </p>
        <RepairChecklist storageKey={storageKey} title="Requirements" items={chunk.requirements} />
        {chunk.optional && (
          <p className="theory-p">
            <strong>If you finish early:</strong> <RichText>{chunk.optional}</RichText>
          </p>
        )}
      </Section>

      <Section
        id="working"
        number={num()}
        title="Working means"
        lead="Run it and check against this. It is the same check we do at the start of next class."
      >
        {/* Not a CodeBlock: this is a command plus prose describing what you
            should see, and highlight() falls back to the Python grammar for
            any unknown language, which would colour the sentences as code. */}
        <pre className="code-block code-block--plain">{chunk.workingMeans}</pre>
      </Section>

      {chunk.related && chunk.related.length > 0 && (
        <Section
          id="related"
          number={num()}
          title="Where to look"
          lead="This chunk reuses things you have already covered. Start here when you are stuck."
        >
          <div className="related-links">
            {chunk.related.map((r) => (
              <button key={r.slug} className="related-link" onClick={() => onNavigate(r.slug)}>
                <span>{r.label}</span>
                <span className="related-arrow">→</span>
              </button>
            ))}
          </div>
        </Section>
      )}

      {chunk.rescueCode && (
        <Section id="rescue" number={num()} title="Rescue file">
          <Rescue chunk={chunk} now={now} />
        </Section>
      )}
    </article>
  )
}
