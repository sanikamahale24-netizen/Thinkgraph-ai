import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Shield, Trash2, Save } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Settings() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3"><SettingsIcon className="text-blue-400" />Settings</h1>
          <p className="text-white/40 mt-1">Manage your account and preferences</p>
        </motion.div>

        <div className="space-y-5">
          <GlassCard delay={0.1} className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center"><User size={17} className="text-white" /></div>
              <h2 className="font-semibold text-white">Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Email</label>
                <input value={user?.email || ''} readOnly
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/50 text-sm cursor-not-allowed" />
              </div>
              <Button variant="primary" size="sm" icon={Save} onClick={() => toast.success('Settings saved!')}>Save Changes</Button>
            </div>
          </GlassCard>

          <GlassCard delay={0.2} className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center"><Shield size={17} className="text-white" /></div>
              <h2 className="font-semibold text-white">Data</h2>
            </div>
            <p className="text-white/40 text-sm mb-4">Clear all your saved analysis history from this device.</p>
            <Button variant="danger" size="sm" icon={Trash2} onClick={() => { localStorage.removeItem('thinkgraph_history'); toast.success('History cleared!') }}>Clear All History</Button>
          </GlassCard>

          <GlassCard delay={0.3} className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center"><Shield size={17} className="text-white" /></div>
              <h2 className="font-semibold text-white">Account</h2>
            </div>
            <p className="text-white/40 text-sm mb-4">Sign out of your account on this device.</p>
            <Button variant="danger" size="sm" onClick={() => { logout(); navigate('/') }}>Sign Out</Button>
          </GlassCard>
        </div>
      </div>
    </PageWrapper>
  )
}