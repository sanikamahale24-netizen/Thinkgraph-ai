import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, History, TrendingUp, Brain, Plus, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { useHistory } from '../hooks/useHistory'

export default function Dashboard() {
  const { user } = useAuth()
  const { history } = useHistory()
  const navigate = useNavigate()
  const recent = history.slice(0, 4)
  const fallacyCount = history.filter(h => h.fallacies?.length > 0).length
  const cleanCount = history.filter(h => h.fallacies?.length === 0).length

  const stats = [
    { label: 'Total Analyses', value: history.length, icon: Brain, gradient: 'from-blue-500 to-blue-700' },
    { label: 'Fallacies Found', value: fallacyCount, icon: AlertTriangle, gradient: 'from-red-500 to-rose-700' },
    { label: 'Clean Arguments', value: cleanCount, icon: CheckCircle, gradient: 'from-green-500 to-emerald-700' },
    { label: 'Success Rate', value: history.length > 0 ? Math.round((cleanCount / history.length) * 100) + '%' : '—', icon: TrendingUp, gradient: 'from-purple-500 to-purple-700' },
  ]

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0] || 'User'}</span> 👋</h1>
            <p className="text-white/40 mt-1">Here's your logic analysis overview.</p>
          </div>
          <Link to="/analyzer"><Button variant="primary" size="md" icon={Plus}>New Analysis</Button></Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <GlassCard key={i} delay={i * 0.08} className="p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3`}>
                <s.icon size={18} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-0.5">{s.value}</div>
              <div className="text-white/50 text-sm">{s.label}</div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-white flex items-center gap-2"><History size={18} className="text-blue-400" />Recent Analyses</h2>
                <Link to="/history"><Button variant="ghost" size="sm" icon={ArrowRight}>View All</Button></Link>
              </div>
              {recent.length === 0 ? (
                <div className="text-center py-12">
                  <Brain size={40} className="text-white/20 mx-auto mb-4" />
                  <p className="text-white/30 text-sm mb-4">No analyses yet</p>
                  <Link to="/analyzer"><Button variant="primary" size="sm" icon={Zap}>Analyze Your First Argument</Button></Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recent.map((item, i) => (
                    <motion.div key={item.id || i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                      onClick={() => navigate('/analyzer', { state: { result: item } })}
                      className="glass rounded-xl p-4 hover:bg-white/8 transition-all cursor-pointer">
                      <p className="text-white/75 text-sm leading-relaxed truncate mb-2">{item.input}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="blue">{item.nodes?.filter(n => n.type === 'premise').length || 0} premises</Badge>
                        {item.fallacies?.length > 0 ? <Badge variant="red">⚠ {item.fallacies.length} fallac{item.fallacies.length > 1 ? 'ies' : 'y'}</Badge> : <Badge variant="green">✓ Clean</Badge>}
                        <span className="text-white/20 text-xs ml-auto">{new Date(item.timestamp).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>

          <div className="space-y-4">
            <GlassCard className="p-5">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2"><Zap size={16} className="text-purple-400" />Quick Actions</h2>
              <div className="space-y-2">
                {[{ href: '/analyzer', label: 'New Analysis', icon: Plus, desc: 'Analyze an argument' }, { href: '/history', label: 'View History', icon: History, desc: 'All past analyses' }].map((a, i) => (
                  <Link key={i} to={a.href}>
                    <div className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/10 transition-all group cursor-pointer mb-2">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <a.icon size={16} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{a.label}</div>
                        <div className="text-xs text-white/40">{a.desc}</div>
                      </div>
                      <ArrowRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-5 border border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-2 mb-2"><Brain size={15} className="text-blue-400" /><span className="text-sm font-medium text-blue-300">Pro Tip</span></div>
              <p className="text-white/40 text-xs leading-relaxed">Separate each premise on its own line for the most accurate analysis.</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}