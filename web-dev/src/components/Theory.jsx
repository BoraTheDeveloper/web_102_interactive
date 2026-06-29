import CodeBlock from './CodeBlock.jsx'
import RichText from './RichText.jsx'

function TheoryBlock({ block, index }) {
  if (block.kind === 'code') {
    return <CodeBlock key={index} code={block.code} lang={block.lang} />
  }

  if (block.kind === 'heading') {
    return (
      <h3 key={index} className="theory-heading">
        <RichText>{block.text}</RichText>
      </h3>
    )
  }

  if (block.kind === 'list') {
    return (
      <ul key={index} className="theory-list">
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>
            <RichText>{item}</RichText>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <p key={index} className="theory-p">
      <RichText>{block.text}</RichText>
    </p>
  )
}

export default function Theory({ blocks }) {
  return <div className="theory">{blocks.map((block, index) => TheoryBlock({ block, index }))}</div>
}
