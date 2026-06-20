import type { ButtonConfig } from '../data/type'
import './Button.css'

interface ButtonProps {
  config: ButtonConfig
  href?: string // per-use override (e.g. each project's code URL for "View code")
  onClick?: () => void
  className?: string // extra layout classes on top of btn / btn-variant
  children?: React.ReactNode
}

function Button({ config, href, onClick, className, children }: ButtonProps) {
  const classes = `btn btn-${config.variant}${className ? ` ${className}` : ''}`
  const url = href ?? config.href // override wins, else fall back to the JSON default
  const label = children ?? config.label

  // No URL → real <button> (e.g. the EmailJS contact submit)
  if (!url) {
    return (
      <button className={classes} onClick={onClick}>
        {label}
      </button>
    )
  }

  return (
    <a
      className={classes}
      href={url}
      onClick={onClick}
      {...(config.download && { download: config.download })}
      {...(config.external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {label}
    </a>
  )
}

export default Button
