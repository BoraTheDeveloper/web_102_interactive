import { useState } from 'react'
import CodeBlock from '../CodeBlock.jsx'

function Question({ q, index }) {
  const [picked, setPicked] = useState(null)
  const answered = picked !== null
  const correct = answered && picked === q.answerIndex

  return (
    <div className="quiz-q">
      <p className="quiz-q-text">
        {index + 1}. {q.q}
      </p>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option'
          if (answered) {
            if (i === q.answerIndex) cls += ' quiz-option--correct'
            else if (i === picked) cls += ' quiz-option--wrong'
          }
          return (
            <button
              key={i}
              className={cls}
              disabled={answered}
              onClick={() => setPicked(i)}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <p className={'quiz-explain ' + (correct ? 'quiz-explain--ok' : 'quiz-explain--no')}>
          <strong>{correct ? 'Correct. ' : 'Not quite. '}</strong>
          {q.explanation}
        </p>
      )}
    </div>
  )
}

export default function Quiz({ item }) {
  const hasCode = Boolean(item.code)
  return (
    <div className="exercise">
      <h4 className="exercise-title">{item.title}</h4>
      {item.intro && <p className="exercise-prompt">{item.intro}</p>}
      <div className={hasCode ? 'quiz-grid' : ''}>
        {hasCode && (
          <div className="quiz-code">
            <CodeBlock code={item.code} lang="jsx" />
          </div>
        )}
        <div className="quiz-questions">
          {item.questions.map((q, i) => (
            <Question key={i} q={q} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
