import type { Experience } from '../data/type'

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className={`experience-card experience-card-${experience.theme}`}>
      <div className="experience-card-header">
        <h3 className="experience-card-title">{experience.title}</h3>
        <span className="experience-card-role">{experience.role}</span>
        <span className="experience-card-meta">
          {experience.location} · {experience.period}
        </span>
      </div>

      <ul className="experience-card-description">
        {experience.description.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <div className="experience-card-tags">
        {experience.tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ExperienceCard
