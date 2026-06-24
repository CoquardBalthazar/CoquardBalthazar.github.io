import './AboutMe.css'

function AboutMe() {
  return (
    <section id="about-me">
      <div className="about-me-section">
        <div className="about-me-body">
          <h2 className="font-dark about-me-heading">## About me</h2>
          <p className="font-dark">
            French student based in Munich. I speak{' '}
            <span className="highlight-box-shadow">
              [French, English and German]
            </span>{' '}
            — and I find that working across cultures makes you a better
            engineer.
            <br />
            <br />I build{' '}
            <span className="highlight-box-shadow">
              [full-stack web applications]
            </span>{' '}
            with React, Node.js and PostgreSQL, and I care deeply about clean
            architecture and interfaces that actually feel good to use.
            <br />
            <br />
            Currently pursuing the{' '}
            <span className="highlight-box-shadow">
              [M.Sc. Management & Technology at TUM]
            </span>
            , with a long-term goal of moving into{' '}
            <span className="highlight-box-shadow">[XR engineering]</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
