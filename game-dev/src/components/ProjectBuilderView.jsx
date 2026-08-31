import ProjectBuilder from './ProjectBuilder.jsx'

export default function ProjectBuilderView({ builder, kicker }) {
  return (
    <article className="week">
      <header className="week-header">
        <div className="week-kicker">● {kicker}</div>
        <h1 className="week-title">Build your own game</h1>
        <p className="week-subtitle">
          Answer each step to scope a final game project you can actually finish. You get a core
          checklist and stretch ideas.
        </p>
      </header>
      <ProjectBuilder builder={builder} />
    </article>
  )
}
