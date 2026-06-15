function Intro() {
  return (
    <section id="introduction">
      <div className="introduction control">
        <div className="introduction content">
          <h1 className="font-light">
            # Welcome to my portfolio ! <br />
            <span>{"{I'm Balthazar}"}</span>
          </h1>
          <p className="font-light" id="h1-subtitle">
            Looking for a <i>[Software Engineering Werkstudent]</i> role in
            Munich.
            <br /> I love building things, and I want to build bigger ones with
            you.
          </p>

          {/* Social Network button */}
          <div className="social-media-control">
            <a
              href="https://www.linkedin.com/in/balthazar-coquard/"
              target="_blank"
              rel="noopener noreferrer"
              className="fa fa-linkedin"
            ></a>
            <a
              href="https://github.com/CoquardBalthazar"
              target="_blank"
              rel="noopener noreferrer"
              className="fa fa-github"
            ></a>
            <a
              href="mailto:balthazar.coquard@gmail.com"
              className="fa fa-google"
            ></a>
          </div>
          <a
            href="/assets/cv.pdf"
            download="CVs_20260606_InDesign_EN_SE_WorkingStudent.pdf"
            className="btn btn-secondary btn-introduction"
          >
            Download CV
          </a>
        </div>
        <div className="introduction logo-form">
          <img
            src="/assets/introduction-img-group-forms.svg"
            alt="Group of forms"
            width="75%"
            height="75%"
            className="img-intro"
          />
        </div>
      </div>
    </section>
  )
}

export default Intro
