import { useState } from 'react'
import CodeBlock from './CodeBlock.jsx'
import RichText from './RichText.jsx'

// Predict-then-reveal. No execution: the expected output is authored in the
// data file, so this stays lightweight and works offline.
export default function PredictOutput({ item }) {
  const [prediction, setPrediction] = useState('')
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="exercise">
      <h4 className="exercise-title">{item.title}</h4>
      {item.prompt && (
        <p className="exercise-prompt">
          <RichText>{item.prompt}</RichText>
        </p>
      )}
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
        <button className="btn btn--primary" onClick={() => setRevealed(true)}>
          Reveal answer
        </button>
      </div>

      {revealed && (
        <div className="output">
          <div className="output-label">Actual output</div>
          <pre className="output-logs">{item.expected}</pre>
          <p className="predict-note">
            Compare it to your prediction — did they match?
          </p>
        </div>
      )}
    </div>
  )
}
