export default function Badge({ children, variant = 'blue', className = '' }) {
  const variants = {
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    green: 'bg-green-500/20 text-green-300 border-green-500/30',
    orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    red: 'bg-red-500/20 text-red-300 border-red-500/30',
    gray: 'bg-white/10 text-white/60 border-white/20',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}