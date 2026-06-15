import experienceData from '../data/experiences.json'
import type { Experience as ExperienceType } from '../data/type'
import ExperienceCard from './ExperienceCard'

function Experience() {
  return (
    <section id="experience">
      <div className="experience-container font-light">
        <h2 className="experience-title">## Experience</h2>
        <div className="experience-list">
          {(experienceData as ExperienceType[])
            .filter((entry) => entry.visible)
            .map((entry) => (
              <ExperienceCard key={entry.id} experience={entry} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
