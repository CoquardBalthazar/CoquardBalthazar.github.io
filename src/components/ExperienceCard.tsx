import type { Experience } from '../data/type'
import './ExperienceCard.css'

type Theme = 'primary' | 'secondary' | 'tertiary'

interface Props {
  experience: Experience
  theme: Theme
}

function ExperienceCard({ experience, theme }: Props) {
  return (
    <div className="experience-entry">
      <div className="experience-left">
        <div className="exp-meta">
          <h3 className="exp-company">{experience.title}</h3>
          <span className={`exp-role exp-role-${theme}`}>{experience.role}</span>
        </div>
        <span className="exp-period">{experience.period}</span>
      </div>

      <div className="experience-timeline">
        <div className={`experience-dot experience-dot-${theme}`} />
      </div>

      <div className="experience-right">
        <ul className="exp-description">
          {experience.summary.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        <div className="exp-tags">
          {experience.tags.map((tag) => (
            <span key={tag} className="experience-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
