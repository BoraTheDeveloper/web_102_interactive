import { highlight } from '../lib/prism.js'

export default function CodeBlock({ code, lang = 'jsx' }) {
  const html = highlight(code, lang)
  return (
    <pre className="code-block" data-lang={lang}>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  )
}
