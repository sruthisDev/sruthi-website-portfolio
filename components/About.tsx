'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Briefcase, Brain, GraduationCap, Star } from 'lucide-react'

function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref}>{count}</span>
}

const stats = [
  { icon: Briefcase, value: 6, suffix: '+', label: 'Years Experience' },
  { icon: Brain, value: 5, suffix: '+', label: 'AI/ML Projects' },
  { icon: GraduationCap, value: 3, suffix: '', label: 'Degrees Earned' },
  { icon: Star, value: 4, suffix: '.0', label: 'GPA' },
]

const highlights = [
  'Python', 'Machine Learning', 'RAG Systems', 'LangChain', 'FastAPI', 'Data Science',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 px-4 bg-white dark:bg-[#0f172a]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            About{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
              I&apos;m a{' '}
              <strong className="text-amber-600 dark:text-amber-400 font-semibold">
                Masters student in Computer Science
              </strong>{' '}
              at the University of the Pacific, bringing over 6 years of industry experience
              in software development to the world of AI/ML.
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
              My journey spans from bioinformatics visualization tools and enterprise B2B
              applications to cutting-edge{' '}
              <strong className="text-amber-600 dark:text-amber-400 font-semibold">
                Retrieval-Augmented Generation (RAG) systems
              </strong>{' '}
              and wearable health monitoring. I bridge the gap between research and
              production-ready AI.
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
              Currently researching{' '}
              <strong className="text-amber-600 dark:text-amber-400 font-semibold">
                modular conversational AI architectures
              </strong>{' '}
              — building systems that are technically rigorous and practically impactful.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {highlights.map((tag) => (
                <span key={tag} className="tag-amber">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map(({ icon: Icon, value, suffix, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.45 + i * 0.08, type: 'spring', stiffness: 200 }}
                className="card-base p-6 text-center hover:border-amber-500/30 dark:hover:border-amber-500/25 hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="text-amber-600 dark:text-amber-400" size={22} />
                </div>
                <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                  <CountUp to={value} />
                  {suffix}
                </div>
                <div className="text-sm text-stone-500 dark:text-stone-500">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
