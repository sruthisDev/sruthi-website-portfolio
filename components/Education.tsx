'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Star } from 'lucide-react'

const education = [
  {
    degree: 'Master of Science in Computer Science',
    institution: 'University of the Pacific',
    location: 'Stockton, CA',
    period: 'Aug 2024 – Present',
    gpa: '4.0',
    current: true,
    courses: ['Machine Learning', 'Data Science', 'Storytelling & Visualization'],
  },
  {
    degree: 'Master of Science in Medical Software Technology',
    institution: 'Manipal Institute of Technology',
    location: 'Manipal, India',
    period: 'Aug 2014 – May 2016',
    gpa: '3.7',
    current: false,
    courses: ['Medical Software', 'Bioinformatics'],
  },
  {
    degree: 'Bachelor of Engineering in Bio Medical Engineering',
    institution: 'Jawaharlal Nehru Technological University',
    location: 'India',
    period: 'Aug 2010 – May 2014',
    gpa: '3.3',
    current: false,
    courses: ['Biomedical Engineering', 'Signal Processing'],
  },
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="py-24 px-4 bg-white dark:bg-[#0f172a]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-2">
            Academic background and qualifications
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="space-y-5">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              className={`card-base p-6 hover:shadow-lg ${
                edu.current
                  ? 'border-amber-400/40 dark:border-amber-500/30'
                  : 'hover:border-amber-400/20 dark:hover:border-amber-500/15'
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    edu.current
                      ? 'bg-amber-100 dark:bg-amber-500/10'
                      : 'bg-stone-100 dark:bg-stone-800'
                  }`}
                >
                  <GraduationCap
                    className={
                      edu.current
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-stone-500 dark:text-stone-400'
                    }
                    size={22}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg leading-snug">
                      {edu.degree}
                    </h3>
                    {edu.current && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-amber-600 dark:text-amber-400 font-semibold">
                    {edu.institution}
                  </p>
                  <p className="text-stone-400 dark:text-stone-500 text-sm mt-0.5">
                    {edu.location} · {edu.period}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      <Star size={13} className="fill-current" />
                      <span className="text-sm font-bold">GPA {edu.gpa}</span>
                    </div>
                    {edu.courses.map((c) => (
                      <span key={c} className="tag-amber">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
