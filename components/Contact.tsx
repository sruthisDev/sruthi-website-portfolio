'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, MapPin, Phone, Linkedin, Send, CheckCircle } from 'lucide-react'

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
    } catch {
      setError('Something went wrong. Please email directly at hello@sruthirao.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 bg-stone-50 dark:bg-[#0f172a]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Get In{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-2">
            Open to opportunities, collaborations, and research discussions
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                Let&apos;s Connect
              </h3>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                I&apos;m actively seeking AI/ML engineering roles and research collaborations.
                Whether you have an opportunity, a project idea, or just want to discuss
                the future of AI — I&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'sruthiraosatyavarapu@gmail.com',
                  href: 'mailto:sruthiraosatyavarapu@gmail.com',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+1 (510) 365-2100',
                  href: 'tel:+15103652100',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'San Jose, CA 95134',
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-amber-600 dark:text-amber-400" size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider font-medium">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-stone-800 dark:text-stone-200 font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { icon: GitHubIcon, href: 'https://github.com/sruthisDev', label: 'GitHub' },
                {
                  icon: Linkedin,
                  href: 'https://linkedin.com/in/sruthi-satyavarapu/',
                  label: 'LinkedIn',
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-200 dark:border-white/15 text-stone-600 dark:text-stone-300 hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-400 dark:hover:border-amber-500/40 transition-all text-sm font-medium"
                >
                  <Icon size={15} />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[340px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-4">
                  <CheckCircle className="text-emerald-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  Message Sent!
                </h3>
                <p className="text-stone-500 dark:text-stone-400 max-w-xs">
                  Thanks for reaching out! Sruthi will get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setSent(false)
                    setForm({ name: '', email: '', message: '' })
                  }}
                  className="mt-6 text-sm text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Jane Smith' },
                  {
                    name: 'email',
                    label: 'Your Email',
                    type: 'email',
                    placeholder: 'jane@company.com',
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={form[field.name as 'name' | 'email']}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about the opportunity or project..."
                    required
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 disabled:cursor-not-allowed"
                >
                  <Send size={17} />
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
