'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, BarChart3, Gamepad2, CloudRain, HeartPulse } from 'lucide-react'

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const projects = [
  {
    title: 'AI Companion for Senior Citizens',
    status: 'Ongoing',
    description:
      'AI-driven elderly care platform enabling medical data extraction, patient management, and multimodal input for improved senior care delivery.',
    icon: HeartPulse,
    type: 'AI/ML',
    featured: true,
    tech: ['AWS Bedrock', 'MongoDB', 'FastAPI', 'React', 'Python'],
    github: 'https://github.com/sruthisDev/AWS-Hackathon-Elderly-AI-Companion',
  },
  {
    title: 'Modular RAG Chatbot Architecture',
    status: 'Research',
    description:
      'Modular, service-oriented RAG architecture with plug-and-play swapping of embedding models, vector DBs, and LLM backends. Built end-to-end with ReactJS, FastAPI, and ChromaDB with hybrid retrieval and reranking. Conducting controlled multi-domain evaluation using Recall@5, MRR, and human-assessed quality metrics.',
    icon: Brain,
    type: 'AI/ML',
    featured: true,
    tech: ['Python', 'ChromaDB', 'HuggingFace', 'Ollama', 'FastAPI', 'ReactJS'],
    github: 'https://github.com/sruthisDev/Modular-Chatbot',
  },
  {
    title: 'Strawberry Ripeness Classifier',
    status: 'Ongoing',
    description:
      'Supervised learning model to classify strawberry ripeness stages. Authored a white paper detailing methodology and experimental findings.',
    icon: Brain,
    type: 'Machine Learning',
    featured: false,
    tech: ['Python', 'Scikit-learn', 'Pandas'],
    github: 'https://github.com/sruthisDev/Strawberry_Ripeness_Classification',
  },
  {
    title: 'Adidas Sales Dashboard',
    status: 'Completed',
    description:
      'Tableau dashboard analyzing Adidas sales data (2023–2024), uncovering regional trends and product performance insights for strategic decisions.',
    icon: BarChart3,
    type: 'Data Viz',
    featured: false,
    tech: ['Python', 'Tableau'],
    github: 'https://github.com/sruthisDev/Adidas-Sales-Dashboard',
  },
  {
    title: 'Weather & Music Trends Analysis',
    status: 'Completed',
    description:
      'Analyzed 6 months of daily top chart data across 106 cities. EDA surfaced a key insight: sunny weather is associated with listener preference for high-BPM tracks, suggesting mood-driven music consumption patterns.',
    icon: CloudRain,
    type: 'Data Science',
    featured: false,
    tech: ['Python', 'Matplotlib', 'Seaborn', 'Tableau'],
    github: 'https://github.com/sruthisDev/Weather-Impact-On-Music-Trends',
  },
  {
    title: 'Desert Survival Game',
    status: 'Completed',
    description:
      'Grid-based world map game where players navigate locations, collect resources, craft tools, and face survival challenges.',
    icon: Gamepad2,
    type: 'Game Dev',
    featured: false,
    tech: ['C++'],
    github: null,
  },
]

const typeStyle: Record<string, string> = {
  'AI/ML':
    'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
  'Machine Learning':
    'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20',
  'Data Viz':
    'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
  'Data Science':
    'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-400 border-stone-200 dark:border-stone-700',
  'Game Dev':
    'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700',
}

const statusDot: Record<string, string> = {
  Ongoing: 'text-emerald-600 dark:text-emerald-400',
  Research: 'text-amber-600 dark:text-amber-400',
  Completed: 'text-stone-500 dark:text-stone-500',
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 px-4 bg-stone-50 dark:bg-[#0c0a09]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Featured{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-2">
            Things I&apos;ve built and researched
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className={`card-base p-6 group hover:shadow-xl hover:shadow-amber-500/5 flex flex-col ${
                  project.featured
                    ? 'border-amber-400/30 dark:border-amber-500/20'
                    : 'hover:border-amber-400/25 dark:hover:border-amber-500/15'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="text-amber-600 dark:text-amber-400" size={20} />
                  </div>
                  <span className={`text-xs font-semibold ${statusDot[project.status]}`}>
                    ● {project.status}
                  </span>
                </div>

                <span
                  className={`inline-block text-xs px-2.5 py-0.5 rounded-full border font-medium mb-3 w-fit ${typeStyle[project.type]}`}
                >
                  {project.type}
                </span>

                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex items-center justify-between gap-2 mt-auto pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="tag-stone">
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-shrink-0 p-1.5 rounded-lg text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"
                      aria-label="View on GitHub"
                    >
                      <GitHubIcon size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/sruthisDev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <GitHubIcon size={17} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
