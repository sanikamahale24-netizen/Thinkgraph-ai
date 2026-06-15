import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Zap, Shield, Network, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import TypingAnimation from '../components/ui/TypingAnimation'

const features = [
  { icon: Brain, title: 'AI-Powered Analysis', description: 'Extract premises, assumptions, and conclusions from any argument instantly.', gradient: 'from-blue-500 to-blue-700' },
  { icon: Network, title: 'Interactive Graphs', description: 'Visualize reasoning as beautiful, interactive graphs you can zoom and rearrange.', gradient: 'from-purple-500 to-purple-700' },
  { icon: Shield, title: 'Fallacy Detection', description: 'Automatically detect 15+ types of logical fallacies including hasty generalization.', gradient: 'from-green-500 to-emerald-700' },
  { icon: Zap, title: 'Instant Results', description: 'Get structured analysis in seconds. Export as PNG or PDF. Save your history.', gradient: 'from-orange-500 to-amber-700' },
]

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-blue-300 mb-8 border border-blue-500/20">
            <Sparkles size={14} className="text-blue-400" />
            Powered by Claude AI · Detect Logical Fallacies
            <Sparkles size={14} className="text-purple-400" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Turn Arguments Into{' '}
            <span className="text-gradient">Visual Graphs</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl text-white/60 font-normal">with AI</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-xl text-white/50 mb-4 h-8">
            <TypingAnimation texts={['Extract premises automatically', 'Detect logical fallacies instantly', 'Visualize reasoning structures', 'Export as PNG or PDF']} speed={60} />
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-lg text-white/40 mb-10 max-w-2xl mx-auto">
            ThinkGraph AI helps students, researchers, and thinkers understand complex arguments by converting them into beautiful interactive graphs.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup"><Button variant="primary" size="xl" icon={Zap}>Start Analyzing Free</Button></Link>
            <Link to="/about"><Button variant="secondary" size="xl" icon={ArrowRight}>Learn More</Button></Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/30 text-sm">
            {['No credit card required', 'Free to get started', '15+ fallacy types detected', 'Export PNG & PDF'].map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-green-400" />{item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gradient mb-4">Everything You Need</h2>
            <p className="text-white/40 text-lg">Powerful tools to understand any logical argument</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <GlassCard key={i} delay={i * 0.1} hover className="p-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <f.icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard className="p-12" glow>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <Brain size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Think Clearly?</h2>
              <p className="text-white/40 mb-8">Join thousands of students and researchers using ThinkGraph AI.</p>
              <Link to="/signup"><Button variant="primary" size="lg" icon={ArrowRight}>Get Started for Free</Button></Link>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </PageWrapper>
  )
}