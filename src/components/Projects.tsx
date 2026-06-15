import projects from '../data/projects.json'
import type { Project } from '../data/type'
import ProjectCard from './ProjectCard'
import './Projects.css'

function Projects() {
  return (
    <section id="projects">
      <div className="project-container font-light">
        <h2 className="project-title">## My projects</h2>
        <div className="project-list">
          {(projects as Project[])
            .filter((project) => project.visible)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
