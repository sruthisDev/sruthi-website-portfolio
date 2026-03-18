'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const sections = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Technical Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function SectionPrelude() {
  const [nextSection, setNextSection] = useState(sections[0])

  useEffect(() => {
    const handleScroll = () => {
      let currentIndex = -1
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          currentIndex = i
        }
      }
      const next = sections[currentIndex + 1]
      setNextSection(next ?? null)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {nextSection && (
        <motion.a
          key={nextSection.id}
          href={`#${nextSection.id}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 group"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} className="text-stone-500 dark:text-stone-400 group-hover:text-amber-500 transition-colors" />
          </motion.div>
          <span className="text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors font-medium">
            {nextSection.label}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
