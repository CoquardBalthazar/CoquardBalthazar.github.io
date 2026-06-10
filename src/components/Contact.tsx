function Contact() {
  return (
    <section id="contact">
      <div className="contact div-bg-yellow">
        <div className="contact div-form">
          <h2 className="contact">## Contact me</h2>
          <p className="contact">
            To meet for a walk or just to say hello, my inbox is open to all :
          </p>
          <form id="contact-form" className="contact-form">
            <div className="input-contact-details">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Object"
                required
              />
              <input
                type="email"
                id="fromEmail"
                name="fromEmail"
                placeholder="Your email address"
                required
              />
            </div>
            <div className="input-message">
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Your message"
                required
              ></textarea>
            </div>
            <input
              type="submit"
              name="submit"
              value="Contact"
              className="btn btn-send-form"
            />
          </form>
        </div>
        <div className="contact div-bear">
          <div className="bear-logo">
            <img
              src="/assets/contact-img-bear.svg"
              alt="Group of forms"
              width="95%"
              height="95%"
              className="img-bear"
            />
          </div>
          <p className="email">balthazar.coquard@gmail.com</p>
          <div className="contact social-media-control">
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
        </div>
      </div>
    </section>
  )
}

export default Contact
