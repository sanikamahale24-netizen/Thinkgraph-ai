import { motion } from 'framer-motion'
import { Brain, Users, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/layout/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'

export default function About() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
            <Brain size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gradient mb-4">About ThinkGraph AI</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            We help students, researchers, and critical thinkers understand complex arguments by converting them into beautiful visual graphs and detecting logical fallacies.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Brain, title: 'Our Mission', desc: 'Make logical reasoning accessible to everyone through AI and visualization.', gradient: 'from-blue-500 to-blue-700' },
            { icon: Users, title: 'Who We Serve', desc: 'Students, educators, debaters, researchers, and critical thinkers worldwide.', gradient: 'from-purple-500 to-purple-700' },
            { icon: Star, title: 'Our Values', desc: 'Clarity, accuracy, and making AI tools that genuinely improve human thinking.', gradient: 'from-green-500 to-emerald-700' },
          ].map((item, i) => (
            <GlassCard key={i} delay={i * 0.1} hover className="p-6 text-center">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-4`}><item.icon size={24} className="text-white" /></div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-8 text-center" glow>
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Think More Clearly?</h2>
          <p className="text-white/40 mb-6">Start analyzing arguments and detecting fallacies today.</p>
          <Link to="/signup"><Button variant="primary" size="lg">Get Started Free</Button></Link>
        </GlassCard>
      </div>
    </PageWrapper>
  )
}