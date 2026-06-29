// Renders a plain string with **bold** and `inline code` support.
export default function RichText({ children }) {
  const text = String(children ?? '')
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {tokens.map((tok, i) => {
        if (tok.startsWith('**') && tok.endsWith('**')) {
          return <strong key={i}>{tok.slice(2, -2)}</strong>
        }
        if (tok.startsWith('`') && tok.endsWith('`')) {
          return (
            <code key={i} className="inline-code">
              {tok.slice(1, -1)}
            </code>
          )
        }
        return <span key={i}>{tok}</span>
      })}
    </>
  )
}
