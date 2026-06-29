import { useState } from 'react'

function FeynmanItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="feynman-item">
      <button className="feynman-q" onClick={() => setOpen((o) => !o)}>
        <span>{q}</span>
        <span className="feynman-toggle">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="feynman-a">{a}</p>}
    </div>
  )
}

export default function FeynmanCheck({ items }) {
  return (
    <div className="feynman">
      {items.map((it, i) => (
        <FeynmanItem key={i} q={it.q} a={it.a} />
      ))}
    </div>
  )
}
