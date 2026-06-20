import type { Hackathon } from '../data/type'
import './ProjectCard.css'
import './HackathonCard.css'

type Theme = 'primary' | 'secondary' | 'tertiary'

function HackathonCard({
  hackathon,
  theme,
}: {
  hackathon: Hackathon
  theme: Theme
}) {
  return (
    <div className={`project-card project-card-${theme}`}>
      <div className="project-card-left">
        <span className={`card-category highlight-box-shadow ${theme}`}>
          {hackathon.role}
        </span>
        <div className="hackathon-left-body">
          <h3 className="project-card-title">{hackathon.title}</h3>
          <div className="hackathon-meta-row">
            <p className="hackathon-meta">
              {hackathon.year} · {hackathon.teamSize} people
            </p>
            {hackathon.result && (
              <span className="hackathon-result">{hackathon.result}</span>
            )}
          </div>
        </div>
      </div>

      <div className="project-card-right">
        <div className="project-card-right-content">
          <p className="hackathon-project-name">{hackathon.project}</p>
          <p className="project-description">{hackathon.description}</p>
          <div className="project-tags">
            {hackathon.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="project-card-actions">
          {hackathon.code && (
            <a
              href={hackathon.code}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-quaternary"
            >
              View code
            </a>
          )}
          {hackathon.demo && (
            <a
              href={hackathon.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-demo-link"
            >
              <div className="btn-demo-container">
                <div className="btn-demo"></div>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default HackathonCard
