import { CHECK_PREFIX } from '../lib/runner.js'

export default function OutputPanel({ result, hideChecks }) {
  const logs = (result.logs || []).filter(
    (l) => !(hideChecks && l.startsWith(CHECK_PREFIX)),
  )

  return (
    <div className="output">
      <div className="output-label">Output</div>
      {result.error ? (
        <pre className="output-error">{result.error}</pre>
      ) : logs.length ? (
        <pre className="output-logs">{logs.join('\n')}</pre>
      ) : (
        <pre className="output-empty">(no console output)</pre>
      )}
    </div>
  )
}
