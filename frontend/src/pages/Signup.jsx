import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Please fill in all fields'); return }
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    login({ name: form.name, email: form.email, uid: 'user-' + Date.now() })
    toast.success('Account created! Welcome!')
    navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#050510] bg-grid flex items-center justify-center px-4 py-10">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Brain size={28} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gradient">ThinkGraph AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4 mb-1">Create your account</h1>
          <p className="text-white/40 text-sm">Start thinking more clearly today</p>
        </div>
        <div className="glass-strong rounded-3xl p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your name', icon: User },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com', icon: Mail },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-white/60 mb-2">{field.label}</label>
                <div className="relative">
                  <field.icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type={field.type} value={form[field.name]} onChange={e => setForm({...form, [field.name]: e.target.value})} placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                </div>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
              </div>
            </div>
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2" icon={ArrowRight}>Create Account</Button>
          </form>
          <p className="text-center text-white/40 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}