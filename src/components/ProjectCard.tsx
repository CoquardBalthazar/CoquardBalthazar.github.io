import type { Project } from '../data/type'

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={`project-card project-card-${project.theme}`}>
      {/* Projects Left Column*/}
      <div className="project-card-left">
        <span className={`card-category highlight-box-shadow ${project.theme}`}>
          {project.category}
        </span>
        <h3 className="project-card-title">{project.title}</h3>
      </div>

      {/* Projects Right Column*/}
      <div className="project-card-right">
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-card-actions">
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-project-discover"
          >
            View code
          </a>
          {project.demo && (
            <a
              href={project.demo}
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
