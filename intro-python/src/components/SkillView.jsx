import Section from './Section.jsx'
import CodeBlock from './CodeBlock.jsx'
import PythonTrace from './PythonTrace.jsx'
import PredictOutput from './PredictOutput.jsx'
import BugFix from './BugFix.jsx'
import FeynmanCheck from './FeynmanCheck.jsx'
import RichText from './RichText.jsx'

function renderPractice(item) {
  if (item.type === 'predict') return <PredictOutput item={item} />
  if (item.type === 'bugfix') return <BugFix item={item} />
  return null
}

// Renders a skill page (and game-review pages, which share the same shape):
// What it means -> Tiny example -> Debug trace -> Common mistake ->
// Practice check -> Explain it simply.
export default function SkillView({ skill }) {
  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● Skill · Review</div>
        <h1 className="week-title">{skill.title}</h1>
        {skill.subtitle && <p className="week-subtitle">{skill.subtitle}</p>}
      </header>

      <div className="goal-card">
        <div className="goal-label">What it means</div>
        <p>
          <RichText>{skill.meaning}</RichText>
        </p>
      </div>

      <Section id="example" number="01" title="Tiny example" lead="Read this small example.">
        <CodeBlock code={skill.example.code} lang={skill.example.lang || 'python'} />
      </Section>

      <Section
        id="trace"
        number="02"
        title="Debug trace"
        lead="Step through the code one line at a time. Watch how the variables change and what gets printed."
      >
        <PythonTrace config={skill.trace} />
      </Section>

      <Section id="mistake" number="03" title="Common mistake">
        <p className="theory-p">
          <RichText>{skill.commonMistake.why}</RichText>
        </p>
        <CodeBlock code={skill.commonMistake.code} />
        <p className="theory-p">
          <RichText>{skill.commonMistake.fix}</RichText>
        </p>
      </Section>

      <Section
        id="practice"
        number="04"
        title="Practice check"
        lead="Try these yourself. Bug-fix exercises run real Python in your browser."
      >
        {skill.practice.map((item) => (
          <div key={item.id}>{renderPractice(item)}</div>
        ))}
      </Section>

      <Section
        id="feynman"
        number="05"
        title="Explain it simply"
        lead="Explain each in your own words, then reveal a model answer."
      >
        <FeynmanCheck items={skill.feynman} />
      </Section>
    </article>
  )
}
