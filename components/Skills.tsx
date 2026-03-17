'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Code2, Globe, Database, Wrench } from 'lucide-react'

const categories = [
  {
    icon: Brain,
    title: 'AI / ML & Data Science',
    accentClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-100 dark:bg-amber-500/10',
    borderHover: 'hover:border-amber-500/40',
    tagClass:
      'bg-amber-50 dark:bg-amber-500/8 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/25',
    skills: [
      'Scikit-learn', 'TensorFlow', 'HuggingFace', 'LangChain',
      'Sentence Transformers', 'Pandas', 'NumPy', 'Matplotlib',
      'Seaborn', 'Tableau', 'ChromaDB', 'Pinecone',
    ],
  },
  {
    icon: Code2,
    title: 'Programming Languages',
    accentClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-100 dark:bg-orange-500/10',
    borderHover: 'hover:border-orange-500/40',
    tagClass:
      'bg-orange-50 dark:bg-orange-500/8 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/25',
    skills: ['Python', 'JavaScript', 'TypeScript', 'PHP', 'C++'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    accentClass: 'text-yellow-600 dark:text-yellow-400',
    bgClass: 'bg-yellow-100 dark:bg-yellow-500/10',
    borderHover: 'hover:border-yellow-500/40',
    tagClass:
      'bg-yellow-50 dark:bg-yellow-500/8 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/25',
    skills: [
      'ReactJS', 'FastAPI', 'HTML/CSS', 'Bootstrap',
      'D3.js', 'jQuery', 'AJAX', 'Drupal', 'Yii', 'Laravel',
    ],
  },
  {
    icon: Database,
    title: 'Databases',
    accentClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-100 dark:bg-amber-500/10',
    borderHover: 'hover:border-amber-500/40',
    tagClass:
      'bg-amber-50 dark:bg-amber-500/8 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/25',
    skills: ['MySQL', 'MongoDB', 'ChromaDB', 'Pinecone'],
  },
  {
    icon: Wrench,
    title: 'Tools & Platforms',
    accentClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-100 dark:bg-orange-500/10',
    borderHover: 'hover:border-orange-500/40',
    tagClass:
      'bg-orange-50 dark:bg-orange-500/8 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/25',
    skills: ['Git', 'GitHub', 'AWS Bedrock', 'Ollama', 'Tableau'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 px-4 bg-stone-50 dark:bg-[#0c0a09]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Technical{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-2">
            Technologies and tools I work with
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className={`card-base p-6 ${cat.borderHover} hover:shadow-lg`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${cat.bgClass} flex items-center justify-center`}
                  >
                    <Icon className={cat.accentClass} size={19} />
                  </div>
                  <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-sm">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 text-xs rounded-full border font-medium ${cat.tagClass}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
