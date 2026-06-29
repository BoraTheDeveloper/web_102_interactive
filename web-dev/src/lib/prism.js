// Central syntax-highlighting setup. Importing prism-jsx registers the JSX
// grammar onto the shared Prism instance. JSX is a superset of JS, so we use
// it for both .js and .jsx snippets — one grammar, correct highlighting.
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

export function highlight(code, lang = 'jsx') {
  const grammar = Prism.languages[lang] || Prism.languages.jsx
  return Prism.highlight(code ?? '', grammar, lang)
}

export default Prism
