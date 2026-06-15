function AboutMe() {
  return (
    <section id="about-me">
      <div className="div-bg-light">
        <div className="container">
          <h2 className="font-dark container content-width">## About me</h2>
          <p className="font-dark content-width">
            French student based in Munich. I speak{' '}
            <span className="highlight-box-shadow">
              [French, English, German and Spanish]
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
