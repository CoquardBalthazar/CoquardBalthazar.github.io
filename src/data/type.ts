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
  visible: boolean
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
  visible: boolean
}

export interface Skill {
  id: string
  title: string
  tier: 'production' | 'proficient' | 'comfortable' | 'learning'
  category:
    | 'languages'
    | 'frameworks-libraries'
    | 'databases'
    | 'devops-infrastructure'
    | 'data-ml'
    | 'tools-workflow'
  categoryLabel: string
  icon: string | null
  visible: boolean
}

export interface Game {
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
  visible: boolean
}

export interface ButtonConfig {
  id: string
  label: string
  href: string | null
  download: string | null
  variant: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
  external: boolean
}

export interface Experience {
  id: string
  title: string
  company: string
  role: string
  location: string
  period: string
  description: string[]
  tags: string[]
  theme: 'primary' | 'secondary' | 'tertiary'
  current: boolean
  visible: boolean
}
