'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const sections = [
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Technical Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function SectionPrelude() {
  const [nextSection, setNextSection] = useState(sections[0])
  const [visible, setVisible] = useState(true)

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

      // Only show when near the bottom of the current section (last 30%)
      if (currentIndex >= 0) {
        const currentEl = document.getElementById(sections[currentIndex].id)
        if (currentEl) {
          const sectionBottom = currentEl.offsetTop + currentEl.offsetHeight
          const scrollBottom = window.scrollY + window.innerHeight
          const progress = (scrollBottom - currentEl.offsetTop) / currentEl.offsetHeight
          setVisible(progress >= 0.90)
        }
      } else {
        // Hero section — show after scrolling a bit
        setVisible(window.scrollY > window.innerHeight * 0.4)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {nextSection && visible && (
        <motion.a
          key={nextSection.id}
          href={`#${nextSection.id}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 sm:bottom-8 left-0 right-0 hidden sm:flex justify-center z-40 pointer-events-none"
        >
          <div className="flex items-center gap-3 group pointer-events-auto cursor-pointer">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ChevronDown size={16} className="text-stone-500 dark:text-stone-400 group-hover:text-amber-500 transition-colors" />
            </motion.div>
            <span className="text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors font-medium">
              {nextSection.label}
            </span>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
