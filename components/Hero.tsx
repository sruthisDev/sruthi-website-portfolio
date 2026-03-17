'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Github, Linkedin, Mail, ChevronDown, Sparkles } from 'lucide-react'

const ROLES = [
  'AI/ML Engineer',
  'Software Engineer',
  'Research Assistant',
  'Data Scientist',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Typewriter state
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Neural network canvas animation
  const startCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = !mounted || resolvedTheme === 'dark'
    const particleColor = isDark ? [245, 158, 11] : [180, 83, 9]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const PARTICLE_COUNT = 70
    const MAX_DIST = 130

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      r: number
    }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor[0]},${particleColor[1]},${particleColor[2]},0.55)`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = ((1 - dist / MAX_DIST) * 0.35).toFixed(3)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${particleColor[0]},${particleColor[1]},${particleColor[2]},${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [mounted, resolvedTheme])

  useEffect(() => {
    const cleanup = startCanvas()
    return cleanup
  }, [startCanvas])

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex]
    const speed = isDeleting ? 45 : 95

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2200)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % ROLES.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-50 dark:bg-[#0c0a09]">
      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50 dark:opacity-60"
      />

      {/* Soft radial glow behind content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(245,158,11,0.06),transparent)]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 dark:from-[#0c0a09] to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-16">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/25 text-amber-700 dark:text-amber-400 text-sm font-medium"
        >
          <Sparkles size={13} />
          Available for AI/ML Opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5 tracking-tight leading-tight"
        >
          <span className="text-stone-900 dark:text-stone-100">Sruthi </span>
          <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 dark:from-amber-400 dark:via-amber-300 dark:to-yellow-300 bg-clip-text text-transparent">
            Satyavarapu
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-9 flex items-center justify-center gap-1 text-xl sm:text-2xl text-stone-600 dark:text-stone-400 font-light mb-6"
        >
          <span>{displayText}</span>
          <span className="animate-blink w-0.5 h-6 bg-amber-500 dark:bg-amber-400 inline-block ml-0.5" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-stone-500 dark:text-stone-500 max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed"
        >
          Masters student with 6+ years of industry experience. Building intelligent AI systems
          — from modular RAG architectures to wearable health monitoring.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex items-center justify-center gap-3"
        >
          {[
            { icon: Github, href: 'https://github.com/sruthisDev', label: 'GitHub' },
            {
              icon: Linkedin,
              href: 'https://linkedin.com/in/sruthi-satyavarapu/',
              label: 'LinkedIn',
            },
            {
              icon: Mail,
              href: 'mailto:s.satyavarapu@u.pacific.edu',
              label: 'Email',
            },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white/80 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-colors shadow-sm"
              aria-label={label}
            >
              <Icon size={19} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-400 dark:text-stone-600"
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
