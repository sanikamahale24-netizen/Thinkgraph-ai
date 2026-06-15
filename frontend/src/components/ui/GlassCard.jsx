import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = false, glow = false, onClick, delay = 0, animate = true }) {
  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
    whileHover: hover ? { y: -4, scale: 1.01 } : {},
  } : {}
  return (
    <Wrapper {...motionProps} onClick={onClick}
      className={`glass rounded-2xl ${glow ? 'animate-glow' : ''} ${hover ? 'cursor-pointer transition-all duration-300' : ''} ${className}`}
    >
      {children}
    </Wrapper>
  )
}