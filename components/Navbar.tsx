'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
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
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4 pointer-events-none">
      {/* Floating pill */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`pointer-events-auto w-full max-w-3xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-white/85 dark:bg-stone-900/85 backdrop-blur-xl shadow-lg shadow-black/10 dark:shadow-black/30 border border-stone-200/80 dark:border-stone-700/60'
            : 'bg-white/60 dark:bg-stone-900/60 backdrop-blur-md border border-stone-200/50 dark:border-stone-700/40'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-14">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm shadow-amber-500/30">
              <span className="text-white text-xs font-bold tracking-wide">SS</span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
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
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-100/80 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-200 text-xs font-medium"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={13} className="text-amber-400" />
                    <span className="hidden sm:inline">Light mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} className="text-stone-500" />
                    <span className="hidden sm:inline">Dark mode</span>
                  </>
                )}
              </button>
            )}

            <button
              className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — drops below the pill */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto w-full max-w-3xl mt-2 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-200/80 dark:border-stone-700/60 shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2.5 px-3 rounded-xl transition-all ${
                    activeSection === link.href.slice(1)
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
                      : 'text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
