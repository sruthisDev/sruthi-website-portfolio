'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      const sections = navLinks.map((l) => l.href.slice(1))
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0c0a09]/90 backdrop-blur-lg shadow-sm border-b border-stone-200/80 dark:border-amber-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SS
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium relative group transition-colors duration-200 ${
                    isActive
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-200 text-xs font-medium"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={13} className="text-amber-400" />
                    <span>Light mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} className="text-stone-500" />
                    <span>Dark mode</span>
                  </>
                )}
              </button>
            )}

            <button
              className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#0c0a09]/95 backdrop-blur-lg border-t border-stone-200 dark:border-stone-800"
          >
            <div className="px-4 py-5 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium py-1 transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
