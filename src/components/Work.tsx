import { useState } from 'react'
import TabBar, { type WorkTab } from './TabBar'
import Projects from './Projects'
import Games from './Games'
import Hackathons from './Hackathons'
import './Work.css'

function Work() {
  const [activeTab, setActiveTab] = useState<WorkTab>('projects')

  return (
    <section id="projects">
      <div className="work-container font-light">
        <h2 className="section-title work-title">## My works</h2>
        <p className="work-subtitle">Projects, hackathons & games I've shipped.</p>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'hackathons' && <Hackathons />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'games' && <Games />}
      </div>
    </section>
  )
}

export default Work
