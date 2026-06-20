import experienceData from '../data/experiences.json'
import type { Experience as ExperienceType } from '../data/type'
import ExperienceCard from './ExperienceCard'
import './Experience.css'

const THEMES: ('primary' | 'secondary' | 'tertiary')[] = [
  'primary',
  'secondary',
  'tertiary',
]

function Experience() {
  const entries = (experienceData as ExperienceType[]).filter((e) => e.visible)

  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title font-light">## Experience</h2>
      <div className="experience-list">
        {entries.map((entry, i) => (
          <ExperienceCard
            key={entry.id}
            experience={entry}
            theme={THEMES[i % THEMES.length]}
          />
        ))}
      </div>
    </section>
  )
}

export default Experience
