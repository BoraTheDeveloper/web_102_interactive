// A numbered content section, matching the Web Dev site's section styling.
export default function Section({ id, number, title, lead, children }) {
  return (
    <section className="section" id={id}>
      <div className="section-head">
        <span className="section-num">{number}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {lead && <p className="section-lead">{lead}</p>}
      {children}
    </section>
  )
}
