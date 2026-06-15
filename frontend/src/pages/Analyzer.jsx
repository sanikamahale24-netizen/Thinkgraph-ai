import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Copy, Trash2, AlertTriangle, CheckCircle, Brain, FileImage, FileText, RefreshCw } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import PageWrapper from '../components/layout/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import LogicGraph from '../components/graph/LogicGraph'
import { useAnalyzer } from '../hooks/useAnalyzer'
import { useExport } from '../hooks/useExport'
import toast from 'react-hot-toast'

const EXAMPLES = [
  { label: 'Valid Syllogism', text: 'All doctors are educated.\nRaj is a doctor.\nTherefore, Raj is educated.' },
  { label: 'Hasty Generalization', text: 'I met two rude doctors.\nTherefore, all doctors are rude.' },
  { label: 'Slippery Slope', text: 'If we allow students to redo one test, they will want to redo all tests. Then they will want to change their final grades. Soon the entire grading system will collapse.' },
  { label: 'False Dichotomy', text: 'You are either with us or against us.\nYou did not vote for our party.\nTherefore you are our enemy.' },
  { label: 'Circular Reasoning', text: 'The Bible is true because it says so in the Bible.' },
]

const NODE_META = {
  premise: { label: 'Premises', color: 'blue', desc: 'Stated facts supporting the argument' },
  assumption: { label: 'Assumptions', color: 'orange', desc: 'Unstated premises the argument relies on' },
  intermediate_conclusion: { label: 'Intermediate Conclusions', color: 'purple', desc: 'Conclusions that also serve as premises' },
  conclusion: { label: 'Conclusions', color: 'green', desc: 'The final claim the argument makes' },
}

export default function Analyzer() {
  const location = useLocation()
  const [input, setInput] = useState('')
  const resultRef = useRef(null)
  const textareaRef = useRef(null)
  const { analyze, loading, result, error, graphData, reset, loadResult } = useAnalyzer()
  const { exportPNG, exportPDF } = useExport()

  useEffect(() => {
    if (location.state?.result) {
      const saved = location.state.result
      setInput(saved.input || '')
      loadResult(saved)
    }
  }, [location.state, loadResult])

  useEffect(() => {
    if (result) setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200)
  }, [result])

  const handleAnalyze = useCallback(async () => {
    if (!input.trim()) { toast.error('Please enter an argument'); textareaRef.current?.focus(); return }
    try { await analyze(input); toast.success('Analysis complete!') } catch {}
  }, [input, analyze])

  const handleKeyDown = (e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAnalyze() }

  return (
    <PageWrapper showFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Zap className="text-blue-400" />Logic Analyzer</h1>
              <p className="text-white/40 mt-1 text-sm">Paste any argument · Cmd+Enter to analyze</p>
            </div>
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <span className="text-white/30 text-xs">Export:</span>
                  <Button variant="secondary" size="sm" icon={FileImage} onClick={() => exportPNG('logic-graph')}>PNG</Button>
                  <Button variant="secondary" size="sm" icon={FileText} onClick={() => exportPDF('logic-graph')}>PDF</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">

          {/* Input */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard className="p-6" animate={false}>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-white/30 text-xs self-center">Try:</span>
                {EXAMPLES.map((ex, i) => (
                  <button key={i} onClick={() => { setInput(ex.text); reset() }}
                    className="text-xs px-3 py-1.5 glass rounded-lg text-blue-300 hover:bg-blue-500/20 border border-blue-500/20 transition-all">
                    {ex.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder={'Paste your logical argument here...\n\nExample:\nAll dogs are mammals.\nBuddy is a dog.\nTherefore, Buddy is a mammal.'}
                  rows={13}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/15 focus:outline-none focus:border-blue-500/40 transition-all text-sm leading-relaxed resize-none font-mono" />
                <div className="absolute bottom-3 right-4 text-xs text-white/20">{input.length}/5000</div>
              </div>
              <p className="text-white/20 text-xs mt-2 ml-1">Tip: Cmd+Enter (Mac) or Ctrl+Enter (Windows) to analyze</p>
              <div className="flex items-center justify-between mt-4 gap-2">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" icon={Copy} onClick={() => { navigator.clipboard.writeText(input); toast.success('Copied!') }} disabled={!input.trim()}>Copy</Button>
                  <Button variant="ghost" size="sm" icon={Trash2} onClick={() => { setInput(''); reset() }} disabled={!input.trim() && !result}>Clear</Button>
                  {result && <Button variant="ghost" size="sm" icon={RefreshCw} onClick={handleAnalyze}>Re-analyze</Button>}
                </div>
                <Button variant="primary" size="lg" icon={Zap} loading={loading} onClick={handleAnalyze} disabled={!input.trim()}>
                  {loading ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
                    <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>

          {/* Graph */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="xl:sticky xl:top-24">
            <GlassCard className="p-0 overflow-hidden" animate={false} style={{ height: '460px' }}>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-5">
                  <div className="relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-14 h-14 rounded-full border-2 border-transparent border-t-blue-500 border-r-purple-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain size={20} className="text-blue-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-sm font-medium">AI is analyzing...</p>
                    <p className="text-white/25 text-xs mt-1">Extracting logic structure</p>
                  </div>
                </div>
              ) : result && graphData.nodes.length > 0 ? (
                <LogicGraph nodes={graphData.nodes} edges={graphData.edges} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                  <div className="flex gap-3 mb-2">
                    {['Premise', 'Premise', 'Conclusion'].map((label, i) => (
                      <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        className={`px-3 py-2 rounded-xl text-xs border ${i < 2 ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                        {label}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-white/25 text-sm">Your logic graph will appear here</p>
                </div>
              )}
            </GlassCard>

            {/* Stats strip */}
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-2 mt-3">
                  {[
                    { label: 'Premises', count: result.nodes?.filter(n => n.type === 'premise').length || 0, color: 'text-blue-400' },
                    { label: 'Assumptions', count: result.nodes?.filter(n => n.type === 'assumption').length || 0, color: 'text-orange-400' },
                    { label: 'Conclusions', count: (result.nodes?.filter(n => n.type === 'conclusion').length || 0) + (result.nodes?.filter(n => n.type === 'intermediate_conclusion').length || 0), color: 'text-green-400' },
                    { label: 'Fallacies', count: result.fallacies?.length || 0, color: 'text-red-400' },
                  ].map((s, i) => (
                    <div key={i} className="glass rounded-xl p-2.5 text-center">
                      <div className={`text-lg font-bold ${s.color}`}>{s.count}</div>
                      <div className="text-white/30 text-xs">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div ref={resultRef} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="mt-8 space-y-4">

              {/* Fallacy banner */}
              {result.fallacies?.length > 0 ? (
                <div className="glass rounded-2xl p-5 border border-red-500/30 bg-red-500/5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                      <AlertTriangle size={20} className="text-red-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-300 mb-2">{result.fallacies.length} Logical Fallac{result.fallacies.length > 1 ? 'ies' : 'y'} Detected</p>
                      <div className="flex flex-col gap-2">
                        {result.fallacies.map((f, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Badge variant="red">{f.name}</Badge>
                            {f.explanation && <p className="text-white/40 text-xs leading-relaxed">{f.explanation}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass rounded-2xl p-5 border border-green-500/30 bg-green-500/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-300">No Logical Fallacies Detected</p>
                    <p className="text-white/40 text-xs mt-0.5">This argument appears to have a valid structure.</p>
                  </div>
                </div>
              )}

              {/* Node cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(NODE_META).map(([type, meta]) => {
                  const nodes = result.nodes?.filter(n => n.type === type) || []
                  if (!nodes.length) return null
                  return (
                    <GlassCard key={type} className="p-4" animate={false}>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={meta.color}>{nodes.length}</Badge>
                        <span className="text-white text-sm font-medium">{meta.label}</span>
                      </div>
                      <p className="text-white/25 text-xs mb-3">{meta.desc}</p>
                      <ul className="space-y-2">
                        {nodes.map((node, i) => (
                          <li key={i} className="text-white/65 text-sm leading-relaxed pl-3 border-l-2 border-white/10">{node.text}</li>
                        ))}
                      </ul>
                    </GlassCard>
                  )
                })}
              </div>

              {/* Explanation */}
              {result.explanation && (
                <GlassCard className="p-5" animate={false}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Brain size={14} className="text-purple-400" />
                    </div>
                    <h3 className="text-white font-semibold text-sm">AI Explanation</h3>
                    {result.mock && <Badge variant="gray">Mock Mode</Badge>}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{result.explanation}</p>
                </GlassCard>
              )}

              {result.mock && (
                <div className="glass rounded-xl p-4 border border-yellow-500/20 bg-yellow-500/5 flex items-start gap-3">
                  <AlertTriangle size={15} className="text-yellow-400 mt-0.5 shrink-0" />
                  <p className="text-yellow-300/70 text-xs leading-relaxed">
                    <strong className="text-yellow-300">Mock mode active.</strong> Add your Anthropic API key to <code className="bg-white/10 px-1 rounded">backend/.env</code> for real AI analysis.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  )
}