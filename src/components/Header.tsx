function Header() {
  return (
    <header className="navbar">
      <div className="navbar-ctrl-brand">
        <a href="#home" className="logo boxhead">
          <span> &lt;</span>
          <span className="navbar-brand boxhead">Balthazar Coquard</span>
          <span>/&gt;</span>
        </a>
      </div>

      <div className="menu-icon" id="menu-icon">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      <div className="navbar-ctrl-items" id="navbar-ctrl-items">
        <a className="navbar-hide" id="navbar-hide">
          CLOSE
        </a>
        <a href="#about-me" className="navbar-item boxhead" id="nav-about-me">
          About me
        </a>
        <a href="#skills" className="navbar-item boxhead" id="nav-skills">
          Skills
        </a>
        <a href="#projects" className="navbar-item boxhead" id="nav-projects">
          My projects
        </a>
        <button className="btn btn-secondary btn-lets-talk" id="btn-navbar">
          Let's talk
        </button>
      </div>
    </header>
  )
}

export default Header
