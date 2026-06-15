import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Menu, X, LogOut, Settings, History, LayoutDashboard, Zap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/') }
  const isActive = (path) => location.pathname === path

  const userLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/analyzer', label: 'Analyzer', icon: Zap },
    { href: '/history', label: 'History', icon: History },
  ]

  return (
    <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40">
      <div className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Brain size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg text-gradient">ThinkGraph AI</span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-6">
              {[{ href: '/about', label: 'About' }, { href: '/contact', label: 'Contact' }].map(link => (
                <Link key={link.href} to={link.href}
                  className={`text-sm font-medium transition-colors ${isActive(link.href) ? 'text-blue-400' : 'text-white/60 hover:text-white'}`}>
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  {userLinks.map(link => (
                    <Link key={link.href} to={link.href}
                      className={`text-sm font-medium transition-colors ${isActive(link.href) ? 'text-blue-400' : 'text-white/60 hover:text-white'}`}>
                      {link.label}
                    </Link>
                  ))}
                  <div className="relative">
                    <button onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 glass px-3 py-2 rounded-xl hover:bg-white/10 transition-all">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{user.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                      </div>
                      <span className="text-sm text-white/80">{user.name?.split(' ')[0]}</span>
                    </button>
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-2xl overflow-hidden shadow-xl">
                          <div className="p-3 border-b border-white/10">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-white/40">{user.email}</p>
                          </div>
                          <div className="p-2">
                            <Link to="/settings" onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white text-sm transition-all">
                              <Settings size={15} /> Settings
                            </Link>
                            <button onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-500/20 text-white/70 hover:text-red-400 text-sm transition-all mt-1">
                              <LogOut size={15} /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
                  <Link to="/signup"><Button variant="primary" size="sm">Get Started</Button></Link>
                </div>
              )}
            </div>

            {/* Mobile button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl glass hover:bg-white/10">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden border-t border-white/10">
              <div className="px-4 py-4 flex flex-col gap-2">
                {user ? (
                  <>
                    {userLinks.map(link => (
                      <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 text-sm transition-all">
                        <link.icon size={15} />{link.label}
                      </Link>
                    ))}
                    <button onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/20 text-sm">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 pt-2">
                    <Link to="/login" onClick={() => setMenuOpen(false)}><Button variant="outline" size="sm" className="w-full">Sign In</Button></Link>
                    <Link to="/signup" onClick={() => setMenuOpen(false)}><Button variant="primary" size="sm" className="w-full">Get Started</Button></Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}