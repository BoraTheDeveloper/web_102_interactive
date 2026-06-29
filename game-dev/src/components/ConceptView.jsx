import Section from './Section.jsx'
import CodeBlock from './CodeBlock.jsx'
import Trace from './Trace.jsx'
import CoordinatesDemo from './CoordinatesDemo.jsx'
import RectVisualizer from './RectVisualizer.jsx'
import InputDemo from './InputDemo.jsx'
import DeltaTimeDemo from './DeltaTimeDemo.jsx'
import SpriteGroupDemo from './SpriteGroupDemo.jsx'
import RichText from './RichText.jsx'

function renderDemo(concept) {
  const { kind, config } = concept.demo
  switch (kind) {
    case 'gameLoop':
    case 'classes':
      return <Trace config={config} />
    case 'coordinates':
      return <CoordinatesDemo config={config} />
    case 'rectCollision':
      return <RectVisualizer config={config} />
    case 'input':
      return <InputDemo config={config} />
    case 'deltaTime':
      return <DeltaTimeDemo config={config} />
    case 'spriteGroup':
      return <SpriteGroupDemo config={config} />
    default:
      return null
  }
}

// Renders a visual concept page: mission recap -> interactive demo -> code ->
// debug trace -> common mistake.
export default function ConceptView({ concept }) {
  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● Visual Concept</div>
        <h1 className="week-title">{concept.title}</h1>
        {concept.subtitle && <p className="week-subtitle">{concept.subtitle}</p>}
      </header>

      <div className="goal-card">
        <div className="goal-label">Mission recap</div>
        <p>
          <RichText>{concept.recap}</RichText>
        </p>
      </div>

      <Section id="demo" number="01" title="See it" lead="Interact with the demo to build a mental model before reading the code.">
        {renderDemo(concept)}
      </Section>

      <Section id="snippet" number="02" title="The code" lead="The small Pygame snippet behind this concept.">
        <CodeBlock code={concept.snippet.code} lang={concept.snippet.lang || 'python'} />
      </Section>

      {concept.trace && (
        <Section id="trace" number="03" title="Debug trace" lead="Step through to see what happens in order each frame.">
          <Trace config={concept.trace} />
        </Section>
      )}

      <Section id="mistake" number={concept.trace ? '04' : '03'} title="Common mistake">
        <p className="theory-p">
          <RichText>{concept.commonMistake.why}</RichText>
        </p>
        <CodeBlock code={concept.commonMistake.code} />
        <p className="theory-p">
          <RichText>{concept.commonMistake.fix}</RichText>
        </p>
      </Section>
    </article>
  )
}
