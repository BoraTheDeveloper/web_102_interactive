import { useState, useEffect } from 'react'

// Interactive checklist whose state persists in localStorage so student
// progress survives refreshes. items: [{ id, label, hint? }]
export default function ProjectChecklist({ storageKey, title, items, intro }) {
  const [checked, setChecked] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'))
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify([...checked]))
  }, [checked, storageKey])

  function toggle(id) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const done = items.filter((it) => checked.has(it.id)).length

  return (
    <div className="checklist">
      <div className="checklist-head">
        <h3>{title}</h3>
        <span className="checklist-count">
          {done} / {items.length} done
        </span>
      </div>
      {intro && <p className="checklist-intro">{intro}</p>}
      <ul className="checklist-items">
        {items.map((it) => {
          const isDone = checked.has(it.id)
          return (
            <li
              key={it.id}
              className={'checklist-item' + (isDone ? ' checklist-item--done' : '')}
            >
              <label>
                <input type="checkbox" checked={isDone} onChange={() => toggle(it.id)} />
                <span>{it.label}</span>
              </label>
              {it.hint && <p className="checklist-hint">{it.hint}</p>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
