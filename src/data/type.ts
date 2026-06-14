export interface Project {
  id: string
  title: string
  category: string
  tags: string[]
  year: number
  theme: 'primary' | 'secondary' | 'tertiary'
  description: string
  wip: boolean | null
  live: boolean
  code: string
  demo: string | null
  screenshot: string | null
  featured: boolean
}

export interface Hackathon {
  id: string
  title: string
  year: number
  date: string
  project: string
  theme: 'primary' | 'secondary' | 'tertiary'
  description: string
  tags: string[]
  teamSize: number
  role: string
  result: string
  live: boolean
  code: string | null
  demo: string | null
  screenshot: string | null
}

export interface Skill {
  id: string
  title: string
  tier: 'production' | 'proficient' | 'comfortable' | 'learning'
  category: 'languages' | 'frameworks' | 'devops'
  icon: string | null
}
