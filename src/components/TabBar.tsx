import './TabBar.css'

export type WorkTab = 'hackathons' | 'projects' | 'games'

const TABS: { id: WorkTab; label: string; theme: string }[] = [
  { id: 'hackathons', label: 'Hackathons', theme: 'tertiary' },
  { id: 'projects', label: 'Projects', theme: 'secondary' },
  { id: 'games', label: 'Games', theme: 'primary' },
]

function TabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: WorkTab
  onTabChange: (tab: WorkTab) => void
}) {
  return (
    <div className="tab-bar">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            className={`tab-btn tab-btn--${tab.theme}${isActive ? ' tab-btn--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-bracket">[</span>
            <span className="tab-label"> {tab.label} </span>
            <span className="tab-bracket">]</span>
          </button>
        )
      })}
    </div>
  )
}

export default TabBar
