import React, { useState, useEffect } from 'react'
import skillsData from '../data/skills.json'
import type { Skill } from '../data/type'
import SkillCard from './SkillCard'
import './Skills.css'

const THEMES: ('tertiary' | 'secondary' | 'primary')[] = [
  'tertiary',
  'secondary',
  'primary',
]

const ICON_LETTERS: Record<string, string> = {
  languages: 'L',
  'frameworks-libraries': 'F',
  databases: 'D',
  'data-ml': 'M',
  'devops-infrastructure': 'I',
  'tools-workflow': 'T',
}

type CategoryGroup = {
  category: string
  categoryLabel: string
  skills: Skill[]
}

function groupByCategory(skills: Skill[]): CategoryGroup[] {
  const map = new Map<string, CategoryGroup>()
  for (const skill of skills) {
    if (!skill.visible) continue
    if (!map.has(skill.category)) {
      map.set(skill.category, {
        category: skill.category,
        categoryLabel: skill.categoryLabel,
        skills: [],
      })
    }
    map.get(skill.category)!.skills.push(skill)
  }
  return Array.from(map.values())
}

function useVisibleCount(): number {
  const getCount = () => {
    if (window.innerWidth <= 767) return 1
    if (window.innerWidth <= 1023) return 2
    return 3
  }
  const [visibleCount, setVisibleCount] = useState(getCount)
  useEffect(() => {
    const handler = () => setVisibleCount(getCount())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return visibleCount
}

const groups = groupByCategory(skillsData as Skill[])

function Skills() {
  const visibleCount = useVisibleCount()
  const maxIndex = groups.length - visibleCount
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const prev = () => setActiveIndex((i) => (i <= 0 ? maxIndex : i - 1))
  const next = () => setActiveIndex((i) => (i >= maxIndex ? 0 : i + 1))

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">## Skills</h2>

      <div className="skills-carousel">
        <button
          className="skills-arrow skills-arrow-left"
          onClick={prev}
          aria-label="Previous"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="skills-viewport">
          <div
            className="skills-track"
            style={
              {
                '--num-cards': groups.length,
                width: `${(groups.length / visibleCount) * 100}%`,
                transform: `translateX(${(-activeIndex / groups.length) * 100}%)`,
              } as React.CSSProperties
            }
          >
            {groups.map((group, i) => (
              <SkillCard
                key={group.category}
                categoryLabel={group.categoryLabel}
                skills={group.skills}
                theme={THEMES[i % THEMES.length]}
                iconLetter={ICON_LETTERS[group.category] ?? '●'}
              />
            ))}
          </div>
        </div>

        <button
          className="skills-arrow skills-arrow-right"
          onClick={next}
          aria-label="Next"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Skills
