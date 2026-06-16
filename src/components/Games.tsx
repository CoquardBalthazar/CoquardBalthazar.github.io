import games from '../data/games.json'
import type { Game } from '../data/type'
import GameCard from './GameCard'

const THEMES: ('primary' | 'secondary' | 'tertiary')[] = [
  'tertiary',
  'secondary',
  'primary',
]

function Games() {
  const visible = (games as Game[]).filter((g) => g.visible)
  return (
    <div className="project-list">
      {visible.map((game, i) => (
        <GameCard key={game.id} game={game} theme={THEMES[i % THEMES.length]} />
      ))}
    </div>
  )
}

export default Games
