function Skills() {
  return (
    <section id="skills">
      <div className="skill section-control">
        <div className="skill-bg light">
          <h2 className="section-title">## Skills</h2>
        </div>
        <div className="skill-bg dark"></div>
        <div className="overlay-skills">
          <div className="control-skill" id="skill-1">
            <div className="skill title">
              <div className="skill icon icon1">X</div>
              <h3 className="skill">Backend</h3>
            </div>

            <div className="skill content">
              <div className="skill horizontal-band">
                <span className="skill tag">&lt;h3&gt;</span>
                <div className="rectangle"></div>
                <span className="skill tag">&lt;/h3&gt; </span>
              </div>
              <p className="skill">
                After finishing the Udemy course about Python; I decided to
                learn more about frameworks, with 2 projects in work (Django,
                Flask). Data management is essential, therefore I am also
                currently training myself to SQL.
              </p>
            </div>
          </div>

          <div className="control-skill" id="skill-2">
            <div className="skill title">
              <div className="skill icon icon2">X</div>
              <h3 className="skill">Web Development</h3>
            </div>

            <div className="skill content">
              <div className="skill horizontal-band">
                <span className="skill tag">&lt;h3&gt;</span>
                <div className="rectangle"></div>
                <span className="skill tag">&lt;/h3&gt; </span>
              </div>
              <p className="skill">
                My marketing background combined with my curiosity led me to
                computer science and design, where it met web development.
                Currently following a Javascript className on Udemy, I now have
                a strong foundation in JS, HTML and CSS.
              </p>
            </div>
          </div>
          <div className="control-skill" id="skill-3">
            <div className="skill title">
              <div className="skill icon icon3">X</div>
              <h3 className="skill">UI/UX</h3>
            </div>

            <div className="skill content">
              <div className="skill horizontal-band">
                <span className="skill tag">&lt;h3&gt;</span>
                <div className="rectangle"></div>
                <span className="skill tag">&lt;/h3&gt; </span>
              </div>
              <p className="skill">
                In my last company I had the opportunity to develop 2 internal
                applications using Microsoft Power Apps. It confirms my
                attraction to the fields of design, informatics and UI/UX.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
