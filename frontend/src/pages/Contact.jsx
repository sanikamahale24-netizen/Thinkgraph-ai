import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent! We will get back to you soon.')
    setForm({ name: '', email: '', message: '' })
  }
  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-5"><Mail size={28} className="text-white" /></div>
          <h1 className="text-4xl font-bold text-gradient mb-3">Contact Us</h1>
          <p className="text-white/40">Have a question or feedback? We'd love to hear from you.</p>
        </motion.div>
        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {[{ label: 'Your Name', name: 'name', type: 'text', placeholder: 'Enter your name' }, { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' }].map(field => (
              <div key={field.name}>
                <label className="block text-sm text-white/60 mb-2">{field.label}</label>
                <input type={field.type} value={form[field.name]} onChange={e => setForm({...form, [field.name]: e.target.value})} placeholder={field.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
              </div>
            ))}
            <div>
              <label className="block text-sm text-white/60 mb-2">Message</label>
              <textarea rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Your message..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all text-sm resize-none" />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full" icon={Send}>Send Message</Button>
          </form>
        </GlassCard>
      </div>
    </PageWrapper>
  )
}