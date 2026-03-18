'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function SectionIndicator() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = s.id
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-4 z-40 hidden lg:flex flex-col gap-3">
      {sections.map((s) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex items-center gap-3 group"
            aria-label={s.label}
          >
            <motion.div
              animate={{ width: isActive ? 28 : 16 }}
              transition={{ duration: 0.3 }}
              className={`h-[2px] rounded-full flex-shrink-0 transition-colors duration-300 ${
                isActive ? 'bg-amber-500 dark:bg-amber-400' : 'bg-stone-400 dark:bg-stone-600 group-hover:bg-stone-600 dark:group-hover:bg-stone-400'
              }`}
            />
            <motion.span
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
              transition={{ duration: 0.3 }}
              className="text-xs tracking-widest uppercase font-medium text-amber-600 dark:text-amber-400 pointer-events-none"
            >
              {s.label}
            </motion.span>
          </a>
        )
      })}
    </div>
  )
}
