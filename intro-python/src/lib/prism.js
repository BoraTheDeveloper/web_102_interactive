// Central syntax-highlighting setup. Python is the default grammar for this
// site; JSX is also registered in case a snippet references web concepts.
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-jsx'

export function highlight(code, lang = 'python') {
  const grammar = Prism.languages[lang] || Prism.languages.python
  return Prism.highlight(code ?? '', grammar, lang)
}

export default Prism
