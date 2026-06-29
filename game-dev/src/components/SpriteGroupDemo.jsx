import { useState } from 'react'

// Visualize sprite groups: one sprite can belong to several groups.
// all_sprites.update()/draw() hit everything; collision_groups hold only the
// things that can collide. Pick a sprite to see every group it belongs to.
const GROUPS = [
  { id: 'all_sprites', members: ['Player', 'Star', 'Laser', 'Meteor'] },
  { id: 'meteor_sprites', members: ['Meteor'] },
  { id: 'laser_sprites', members: ['Laser'] },
  { id: 'collision_sprites', members: ['Player', 'Meteor'] },
]
const COLORS = {
  Player: '#4f46e5',
  Star: '#ffd56b',
  Laser: '#7cf6ff',
  Meteor: '#9c7a5a',
}

export default function SpriteGroupDemo({ config }) {
  const [sel, setSel] = useState('Player')

  return (
    <div className="demo">
      <div className="sprite-legend">
        {Object.keys(COLORS).map((name) => (
          <button
            key={name}
            className={'sprite-chip' + (sel === name ? ' sprite-chip--active' : '')}
            style={{ borderColor: COLORS[name] }}
            onClick={() => setSel(name)}
          >
            <span className="sprite-dot" style={{ background: COLORS[name] }} />
            {name}
          </button>
        ))}
      </div>

      <div className="sprite-groups">
        {GROUPS.map((g) => {
          const hit = g.members.includes(sel)
          return (
            <div key={g.id} className={'sprite-group' + (hit ? ' sprite-group--hit' : '')}>
              <div className="sprite-group-name">{g.id}</div>
              <div className="sprite-group-members">
                {g.members.map((m) => (
                  <span
                    key={m}
                    className={'sprite-member' + (m === sel ? ' sprite-member--active' : '')}
                    style={{
                      borderColor: COLORS[m],
                      background: m === sel ? COLORS[m] : 'transparent',
                      color: m === sel ? '#171a24' : '#e6e8ef',
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <p className="demo-caption">
        {config?.caption ||
          'Pick a sprite. It can live in more than one group: all_sprites drives update() and draw() for everything, while collision_sprites holds only the things that can hit each other. One object, many groups.'}
      </p>
    </div>
  )
}
