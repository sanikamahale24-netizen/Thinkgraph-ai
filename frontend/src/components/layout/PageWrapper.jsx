import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PageWrapper({ children, showFooter = true, className = '' }) {
  return (
    <div className="min-h-screen bg-[#050510] bg-grid">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-600/6 rounded-full blur-3xl" />
      </div>
      <Navbar />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className={`pt-16 relative z-10 ${className}`}>
        {children}
      </motion.main>
      {showFooter && <Footer />}
    </div>
  )
}