
import { Link } from 'react-router-dom'
import { Brain, Mail, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>

              <span className="font-bold text-lg text-gradient">
                ThinkGraph AI
              </span>
            </div>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Convert logical arguments into visual graphs. Detect fallacies.
              Think clearly.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <a
                href="mailto:hello@thinkgraph.ai"
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <Mail size={16} />
              </a>

              <a
                href="#"
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">
              Product
            </h4>

            <ul className="space-y-3">
              {[
                { label: 'Analyzer', href: '/analyzer' },
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'History', href: '/history' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">
              Company
            </h4>

            <ul className="space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Sign Up', href: '/signup' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2025 ThinkGraph AI. All rights reserved.
          </p>

          <p className="text-white/30 text-xs">
            Built with ♥ using React + Claude AI
          </p>
        </div>
      </div>
    </footer>
  )
}

