import { motion } from 'framer-motion'

export default function Button({
  children, onClick, variant = 'primary', size = 'md',
  disabled = false, loading = false, className = '', type = 'button', icon: Icon,
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25',
    secondary: 'glass text-white hover:bg-white/10',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 text-white',
    ghost: 'text-white/70 hover:text-white hover:bg-white/5',
    outline: 'border border-white/20 text-white hover:bg-white/10',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
    xl: 'px-9 py-4 text-lg gap-3',
  }
  return (
    <motion.button
      type={type} onClick={onClick} disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Processing...</>
      ) : (
        <>{Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}{children}</>
      )}
    </motion.button>
  )
}