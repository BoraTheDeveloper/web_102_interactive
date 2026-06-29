const CHECK = '__CHECK__'

// Shows captured stdout/stderr for a Pyodide run. `result` is
// { output: string, error: string | null }. When hideChecks is true, lines
// that start with the grader marker are stripped from the displayed output.
export default function OutputPanel({ result, hideChecks = false }) {
  let output = (result && result.output) || ''
  if (hideChecks) {
    output = output
      .split('\n')
      .filter((line) => !line.startsWith(CHECK))
      .join('\n')
  }
  const error = result && result.error
  const hasOutput = output.replace(/\s+$/, '').length > 0

  return (
    <div className="output">
      <div className="output-label">Output</div>
      {error ? (
        <pre className="output-error">{error}</pre>
      ) : hasOutput ? (
        <pre className="output-logs">{output.replace(/\n+$/, '')}</pre>
      ) : (
        <pre className="output-empty">(no output)</pre>
      )}
    </div>
  )
}
