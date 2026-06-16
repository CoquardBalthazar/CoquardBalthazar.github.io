import projects from '../data/projects.json'
import type { Project } from '../data/type'
import ProjectCard from './ProjectCard'
import './Projects.css'

const THEMES: ('primary' | 'secondary' | 'tertiary')[] = [
  'tertiary',
  'secondary',
  'primary',
]

function Projects() {
  const visible = (projects as Project[]).filter((p) => p.visible)
  return (
    <section id="projects">
      <div className="project-container font-light">
        <h2 className="project-title">## My projects</h2>
        <div className="project-list">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              theme={THEMES[i % THEMES.length]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
