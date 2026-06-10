function Projects() {
  return (
  <section id="projects">
      <div className="project-container font-light">
        <h2 className="project-title">## My projects</h2>
        <div className="project-cards">
          {/* Projects Left Column*/}
          <div className="project-column left">
            <div className="project-card card-left-tertiary" id="left-card1">
              <span className="card-category highlight-box-shadow tertiary"
                >Python</span
              >
              <h3 className="h3-card-title-2l">Converter OFX, TSV to CSV</h3>
            </div>
            <div className="project-card card-left-secondary" id="left-card2">
              <span className="card-category highlight-box-shadow secondary"
                >Javascript</span
              >
              <h3 className="h3-card-title-1l">Pig game</h3>

              <a
                href="https://coquardbalthazar.github.io/pigGame-js/"
                target="_blank"
                className="btn-play-link"
              >
                <div className="btn-play-container">
                  <div className="btn-play"></div>
                </div>
              </a>
            </div>
            <div className="project-card card-left-primary" id="left-card3">
              <span className="card-category highlight-box-shadow primary"
                >Microsoft Power Apps</span
              >
              <h3 className="h3-card-title-2l">Approval request App</h3>
            </div>
            <div className="project-card card-left-tertiary" id="left-card4">
              <span className="card-category highlight-box-shadow tertiary"
                >Python</span
              >
              <h3 className="h3-card-title-1l">Blackjack</h3>
            </div>
            <div className="project-card card-left-secondary" id="left-card5">
              <span className="card-category highlight-box-shadow secondary"
                >Javascript</span
              >
              <h3 className="h3-card-title-1l">Guess my number</h3>
              <a
                href="https://coquardbalthazar.github.io/guessMyNumber-js/"
                target="_blank"
                className="btn-play-link"
                >
                <div className="btn-play-container">
                  <div className="btn-play"></div>
                </div>
              </a>
            </div>
          </div>

          {/* Projects Right Column*/}
          <div className="project-column right">
            <div className="project-card card-right-tertiary" id="right-card1">
              <p className="project-description">
                Python scripts to convert bank export files from the OFX & TSV
                formats to the CSV format. <br />
                <i>In development </i> : Browser window with drop file function.
              </p>
              <a
                href="https://github.com/CoquardBalthazar/ofxToCSV-py"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-project-discover"
              >
                View code
                </a>
            </div>
            <div className="project-card card-right-secondary" id="right-card2">
              <p className="project-description">
                A 2-player game played in the browser. <br />The goal ? To be
                the first to reach 100 by throwing the dice. Careful : if you
                roll a 1, your current collected amount disappears !
              </p>
              <a
                href="https://github.com/CoquardBalthazar/pigGame-js"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-project-discover"
                >
                View code
              </a>
            </div>
            <div className="project-card card-right-primary" id="right-card3">
              <p className="project-description">
                A Microsoft Power Apps for internal approval request
                processes.<br />
                Features : multi-language option, mandatory fields,
                auto-complete option, ... HTTP request, JSON parsing, power
                flow, up to the rejection or the approval.
              </p>
              <a
                href="https://github.com/CoquardBalthazar/MS-Pwapps_approval-request"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-project-discover"
              >
                View code
              </a>
            </div>
            <div className="project-card card-right-tertiary" id="right-card4">
              <p className="project-description">
                A simplified version of the game Blackjack. One player versus an
                automated dealer, with only stand or hit actions. Use of classes
                to hold the player's money and cards.
              </p>
              <a
                href="https://github.com/CoquardBalthazar/blackjack-game-py"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-project-discover"
              >
                View code
              </a>
            </div>
            <div className="project-card card-right-secondary" id="right-card5">
              <p className="project-description">
                A 2-player game to be played in the browser, that consists of
                guessing a random number between 1 and 20.
              </p>
              <a
                href="https://github.com/CoquardBalthazar/guessMyNumber-js"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-project-discover"
              >
                View code
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
