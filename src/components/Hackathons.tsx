import hackathons from '../data/hackathons.json'
import type { Hackathon } from '../data/type'
import HackathonCard from './HackathonCard'

const THEMES: ('primary' | 'secondary' | 'tertiary')[] = [
  'tertiary',
  'secondary',
  'primary',
]

function Hackathons() {
  const visible = (hackathons as Hackathon[]).filter((h) => h.visible)
  return (
    <div className="project-list">
      {visible.map((hackathon, i) => (
        <HackathonCard
          key={hackathon.id}
          hackathon={hackathon}
          theme={THEMES[i % THEMES.length]}
        />
      ))}
    </div>
  )
}

export default Hackathons
