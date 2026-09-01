import { useState } from 'react'
import CodeBlock from './CodeBlock.jsx'
import RichText from './RichText.jsx'

// Self-check quiz rendered inside a week page. Lifted from the web-dev app's
// practice Quiz, with three changes: the snippet belongs to a single question
// rather than the whole quiz, the language is Python, and a question can carry
// `trap: true`. A trap is the answer key's 高考-style marker: a question where
// the wrong answer is the one that looks obviously right.
//
// The picked answers live in the parent, not in each Question, so the running
// score can be counted without an effect or a callback chain.
//
// quiz shape:
//   { title, intro?, questions: [{ q, code?, options, answerIndex, explanation, trap? }] }

function Question({ q, index, picked, onPick }) {
  const answered = picked != null
  const correct = answered && picked === q.answerIndex

  return (
    <div className="quiz-q">
      <p className="quiz-q-text">
        {index + 1}. <RichText>{q.q}</RichText>
        {q.trap && <span className="badge badge--level quiz-trap">read twice</span>}
      </p>

      {q.code && <CodeBlock code={q.code} lang={q.codeLang || 'python'} />}

      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option'
          if (answered) {
            if (i === q.answerIndex) cls += ' quiz-option--correct'
            else if (i === picked) cls += ' quiz-option--wrong'
          }
          return (
            <button key={i} className={cls} disabled={answered} onClick={() => onPick(i)}>
              <RichText>{opt}</RichText>
            </button>
          )
        })}
      </div>

      {answered && (
        <p className={'quiz-explain ' + (correct ? 'quiz-explain--ok' : 'quiz-explain--no')}>
          <strong>{correct ? 'Correct. ' : 'Not quite. '}</strong>
          <RichText>{q.explanation}</RichText>
        </p>
      )}
    </div>
  )
}

export default function QuizCheck({ quiz }) {
  const [picked, setPicked] = useState({})

  const answered = Object.keys(picked).length
  const right = quiz.questions.filter((q, i) => picked[i] === q.answerIndex).length

  return (
    <div className="exercise">
      {quiz.title && <h4 className="exercise-title">{quiz.title}</h4>}
      {quiz.intro && (
        <p className="exercise-prompt">
          <RichText>{quiz.intro}</RichText>
        </p>
      )}

      <div className="quiz-questions">
        {quiz.questions.map((q, i) => (
          <Question
            key={i}
            q={q}
            index={i}
            picked={picked[i]}
            onPick={(choice) => setPicked((p) => ({ ...p, [i]: choice }))}
          />
        ))}
      </div>

      {answered > 0 && (
        <p className="quiz-score">
          {right} right out of {answered} answered.
          {answered < quiz.questions.length && ` ${quiz.questions.length - answered} to go.`}
        </p>
      )}
    </div>
  )
}
