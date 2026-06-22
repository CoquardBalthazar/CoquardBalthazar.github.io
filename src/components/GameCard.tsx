import type { Game } from '../data/type'
import './ProjectCard.css'

type Theme = 'primary' | 'secondary' | 'tertiary'

function GameCard({ game, theme }: { game: Game; theme: Theme }) {
  return (
    <div className={`project-card project-card-${theme}`}>
      <div className="project-card-left">
        <span className={`card-category highlight-box-shadow ${theme}`}>
          {game.category}
        </span>
        <h3 className="project-card-title">{game.title}</h3>
      </div>
      <div className="project-card-right">
        <div className="project-card-right-content">
          <p className="project-description">{game.description}</p>
          <div className="project-tags">
            {game.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="project-card-actions">
          {game.code && (
            <a
              href={game.code}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-quaternary"
            >
              View code
            </a>
          )}
          {game.demo && (
            <a
              href={game.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-play-link"
            >
              <div className="btn-play-container">
                <div className="btn-play"></div>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameCard
