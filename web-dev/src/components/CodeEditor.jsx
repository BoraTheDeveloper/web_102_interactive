import EditorModule from 'react-simple-code-editor'
import { highlight } from '../lib/prism.js'

// Interop guard: react-simple-code-editor is a CommonJS module. Depending on the
// bundler, the default import is either the component itself or a { default }
// wrapper — unwrap it so this works in every build path.
const Editor = EditorModule?.default ?? EditorModule

// Editable code field WITH syntax highlighting. react-simple-code-editor layers
// a transparent textarea over a Prism-highlighted <pre>, so students type real
// code and see it colored. Tab inserts two spaces (handled by the library).
export default function CodeEditor({ value, onChange, minRows = 6 }) {
  return (
    <div className="code-editor">
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={(code) => highlight(code, 'jsx')}
        padding={14}
        tabSize={2}
        insertSpaces
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          lineHeight: 1.55,
          color: 'var(--code-ink)',
          minHeight: Math.round(minRows * 13 * 1.55),
        }}
      />
    </div>
  )
}
