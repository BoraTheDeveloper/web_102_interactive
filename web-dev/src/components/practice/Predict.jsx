import { useState } from 'react'
import CodeBlock from '../CodeBlock.jsx'
import OutputPanel from '../OutputPanel.jsx'
import RichText from '../RichText.jsx'
import { runUserCode } from '../../lib/runner.js'

export default function Predict({ item }) {
  const [prediction, setPrediction] = useState('')
  const [result, setResult] = useState(null)
  const [running, setRunning] = useState(false)

  async function run() {
    setRunning(true)
    const res = await runUserCode(item.code)
    setRunning(false)
    setResult(res)
  }

  return (
    <div className="exercise">
      <h4 className="exercise-title">{item.title}</h4>
      <p className="exercise-prompt">
        <RichText>{item.prompt}</RichText>
      </p>
      <CodeBlock code={item.code} />

      <label className="field-label">Your prediction</label>
      <textarea
        className="predict-input"
        rows={3}
        value={prediction}
        placeholder="What will it print?"
        onChange={(e) => setPrediction(e.target.value)}
      />

      <div className="run-bar">
        <button className="btn btn--primary" onClick={run} disabled={running}>
          {running ? 'Running…' : 'Reveal & run'}
        </button>
      </div>

      {result && (
        <>
          <OutputPanel result={result} hideChecks />
          <p className="predict-note">
            Compare the real output to your prediction — did they match?
          </p>
        </>
      )}
    </div>
  )
}
