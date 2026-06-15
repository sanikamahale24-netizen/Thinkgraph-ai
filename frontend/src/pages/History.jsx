import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { History as HistoryIcon, Search, Trash2, Eye, Brain } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/layout/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { useHistory } from '../hooks/useHistory'
import toast from 'react-hot-toast'

export default function History() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()
  const { history, remove, clear } = useHistory()

  const filtered = history.filter(item => {
    const matchSearch = !search || item.input?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' ? true : filter === 'fallacies' ? item.fallacies?.length > 0 : item.fallacies?.length === 0
    return matchSearch && matchFilter
  })

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3"><HistoryIcon className="text-blue-400" />History</h1>
            <p className="text-white/40 mt-1">{history.length} total analyses</p>
          </div>
          {history.length > 0 && <Button variant="danger" size="sm" onClick={() => { clear(); toast.success('Cleared') }} icon={Trash2}>Clear All</Button>}
        </motion.div>

        <GlassCard className="p-4 mb-6" animate={false}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search analyses..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
            </div>
            <div className="flex gap-2">
              {[{ key: 'all', label: 'All' }, { key: 'fallacies', label: '⚠ Fallacies' }, { key: 'clean', label: '✓ Clean' }].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${filter === f.key ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'glass text-white/50 hover:text-white border border-white/10'}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {filtered.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Brain size={40} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/40 mb-4">{history.length === 0 ? 'No analyses yet.' : 'No results found.'}</p>
            {history.length === 0 && <Button variant="primary" size="sm" onClick={() => navigate('/analyzer')}>Analyze Now</Button>}
          </GlassCard>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div key={item.id || i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: Math.min(i * 0.04, 0.3) }}>
                  <GlassCard className="p-5 cursor-pointer hover:bg-white/6" animate={false} onClick={() => navigate('/analyzer', { state: { result: item } })}>
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-3">{item.input}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="blue">{item.nodes?.filter(n => n.type === 'premise').length || 0} premises</Badge>
                          <Badge variant="green">{item.nodes?.filter(n => n.type === 'conclusion').length || 0} conclusions</Badge>
                          {item.fallacies?.length > 0 ? <Badge variant="red">⚠ {item.fallacies.map(f => f.name).join(', ')}</Badge> : <Badge variant="green">✓ No fallacies</Badge>}
                          <span className="text-white/20 text-xs">{new Date(item.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                        <button onClick={() => navigate('/analyzer', { state: { result: item } })} className="p-2 glass rounded-xl hover:bg-white/10 text-white/40 hover:text-white transition-all"><Eye size={14} /></button>
                        <button onClick={() => { remove(item.id); toast.success('Deleted') }} className="p-2 glass rounded-xl hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}