import { useState, useEffect } from 'react'

export default function TypingAnimation({ texts = [], speed = 80, deleteSpeed = 40, pause = 2000, className = '' }) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!texts.length) return
    const current = texts[textIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1))
          setCharIndex(c => c + 1)
        } else {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1))
          setCharIndex(c => c - 1)
        } else {
          setIsDeleting(false)
          setTextIndex(i => (i + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pause])

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse text-blue-400">|</span>
    </span>
  )
}