import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="navbar">
      <div className="navbar-ctrl-brand">
        <a href="#home" className="logo boxhead">
          <span> &lt;</span>
          <span className="navbar-brand boxhead">Balthazar Coquard</span>
          <span>/&gt;</span>
        </a>
      </div>

      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      <div className={`navbar-ctrl-items ${isMenuOpen ? 'show' : ''}`}>
        <a
          className={`navbar-hide ${isMenuOpen ? '' : 'hide'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          CLOSE
        </a>
        <a
          href="#about-me"
          className="navbar-item boxhead"
          onClick={() => setIsMenuOpen(false)}
        >
          About me
        </a>
        <a
          href="#skills"
          className="navbar-item boxhead"
          onClick={() => setIsMenuOpen(false)}
        >
          Experience
        </a>
        <a
          href="#projects"
          className="navbar-item boxhead"
          onClick={() => setIsMenuOpen(false)}
        >
          Projects
        </a>
        <a
          href="#contact"
          className="btn btn-secondary btn-lets-talk"
          onClick={() => setIsMenuOpen(false)}
        >
          Let's talk
        </a>
      </div>
    </header>
  )
}

export default Header
