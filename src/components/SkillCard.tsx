import type { Skill } from '../data/type'
import './SkillCard.css'

interface SkillCardProps {
  categoryLabel: string
  skills: Skill[]
  theme: 'primary' | 'secondary' | 'tertiary'
  iconLetter: string
}

function SkillCard({ categoryLabel, skills, theme, iconLetter }: SkillCardProps) {
  return (
    <div className={`skill-card skill-card-${theme}`}>
      <div className="skill-card-header">
        <div className={`skill-card-icon skill-card-icon-${theme}`}>
          {iconLetter}
        </div>
        <h3 className="skill-card-title">{categoryLabel}</h3>
      </div>

      <div className="skill-card-body">
        <div className="skill-card-band">
          <span className="skill-band-tag">&lt;h3&gt;</span>
          <div className="skill-band-line" />
          <span className="skill-band-tag">&lt;/h3&gt;</span>
        </div>
        <div className="skill-card-content">
          {skills.map((s) => (
            <span key={s.id} className="skill-tag">
              &lt; {s.title} &gt;
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillCard
