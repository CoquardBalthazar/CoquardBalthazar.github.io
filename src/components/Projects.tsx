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
    <div className="project-list">
      {visible.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          theme={THEMES[i % THEMES.length]}
        />
      ))}
    </div>
  )
}

export default Projects
