import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )
  const [copied, setCopied] = useState(false)

  function handleEmailClick() {
    navigator.clipboard
      ?.writeText('balthazarcoquard.de@gmail.com')
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {})
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!formRef.current) return

    setStatus('sending')
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(() => {
        setStatus('sent')
        formRef.current?.reset()
      })
      .catch(() => setStatus('error'))
  }

  return (
    <section id="contact">
      <div className="contact div-bg-yellow">
        <div className="contact div-form">
          <h2 className="contact">## Contact me</h2>
          <p className="contact">
            To meet for a walk or just to say hello, my inbox is open to all :
          </p>
          <form
            id="contact-form"
            className="contact-form"
            ref={formRef}
            onSubmit={handleSubmit}
          >
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
                id="from_email"
                name="from_email"
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
              value={status === 'sending' ? 'Sending...' : 'Contact'}
              disabled={status === 'sending'}
              className="btn btn-send-form"
            />
            {status === 'sent' && (
              <p className="contact-feedback contact-feedback--sent">
                Message sent — I'll get back to you soon!
              </p>
            )}
            {status === 'error' && (
              <p className="contact-feedback contact-feedback--error">
                Something went wrong. Try emailing me directly.
              </p>
            )}
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
          <p className="email">balthazarcoquard.de@gmail.com</p>
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
              href="mailto:balthazarcoquard.de@gmail.com"
              className="fa fa-google"
              title="balthazarcoquard.de@gmail.com"
              onClick={handleEmailClick}
            ></a>
            {copied && <span className="email-copied-toast">Email copied!</span>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
