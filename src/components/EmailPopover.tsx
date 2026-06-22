import { useEffect, useRef, useState } from 'react'
import './EmailPopover.css'

const EMAIL = 'balthazarcoquard.de@gmail.com'

const GMAIL_URL = `https://mail.google.com/mail/?view=cm&to=${EMAIL}`
const OUTLOOK_URL = `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}`

function EmailPopover() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [open])

  function handleCopy() {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setOpen(false)
      }, 1500)
    })
  }

  return (
    <div className="email-popover-wrapper" ref={ref}>
      <button
        className="fa fa-google email-popover-trigger"
        title={EMAIL}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => setOpen((o) => !o)}
        aria-label="Email options"
      ></button>
      {open && (
        <div className="email-popover">
          <a
            className="email-popover-option"
            href={`mailto:${EMAIL}`}
            onClick={() => setOpen(false)}
          >
            Open email app
          </a>
          <a
            className="email-popover-option"
            href={GMAIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Gmail
          </a>
          <a
            className="email-popover-option"
            href={OUTLOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Outlook
          </a>
          <button className="email-popover-option" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy address'}
          </button>
        </div>
      )}
    </div>
  )
}

export default EmailPopover
