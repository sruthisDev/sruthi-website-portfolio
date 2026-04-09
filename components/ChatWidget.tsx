'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function renderMarkdown(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: string[] = []

  const flushList = (key: string) => {
    if (listItems.length === 0) return
    elements.push(
      <ul key={key} className="list-disc list-inside space-y-0.5 my-1">
        {listItems.map((item, i) => (
          <li key={i}>{formatInline(item)}</li>
        ))}
      </ul>
    )
    listItems = []
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim()
    if (/^[*-] /.test(trimmed)) {
      listItems.push(trimmed.replace(/^[*-] /, ''))
    } else {
      flushList(`list-${i}`)
      if (trimmed === '') {
        elements.push(<br key={i} />)
      } else {
        elements.push(<p key={i} className="my-0.5">{formatInline(trimmed)}</p>)
      }
    }
  })
  flushList('list-end')
  return elements
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch)
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 underline">{linkMatch[1]}</a>
    return part
  })
}

const SUGGESTED = [
  'What are her AI/ML skills?',
  'Tell me about her research',
  'Is she open to opportunities?',
]

const CANNED: Record<string, string> = {
  'What are her AI/ML skills?':
    "Sruthi builds production-ready AI systems end-to-end — from data preprocessing and chunking strategies to hybrid retrieval, reranking, and swapping LLM backends without redesigning the system.\n\nHer core work is a **modular RAG pipeline** using HuggingFace for embeddings, ChromaDB for vector storage, and FastAPI for serving. She's also engineered system-level capabilities on top — **session-aware context management** for multi-turn interactions and **latency instrumentation** for reproducible performance benchmarking.\n\nWhat sets her apart is rigorous evaluation across heterogeneous domains, and the same engineering discipline applied to a wearable health project — time-series feature extraction and sensor fusion for real-time fall detection.",
  'Tell me about her research':
    "Sruthi's research at University of the Pacific focuses on **domain-adaptive modular RAG architectures** — how well a RAG system adapts across heterogeneous domains without architectural redesign.\n\nBeyond retrieval, she's built the full system: **session-aware context management** for multi-user environments, **latency instrumentation** for cross-domain benchmarking, and RBAC-based access control. The work bridges the gap between academic benchmarking frameworks and production deployment.\n\nShe also worked on a proprietary wearable device — building ML pipelines for **fall detection and sleep monitoring** using accelerometer, gyroscope, and PPG data. Her paper is currently **under review at IEEE BigData Service**.",
  'Is she open to opportunities?':
    "Absolutely! Sruthi is actively seeking roles in **AI/ML engineering**, **software engineering**, and **data science**.\n\nShe brings a rare combination of **7+ years of industry experience** — across healthcare, finance, and e-commerce — with active AI/ML research and a **4.0 GPA Master's degree**.\n\nShe's graduating **Spring 2026** and is ready to start as early as **end of May**. Reach out at sruthiraosatyavarapu@gmail.com or [connect on LinkedIn](https://linkedin.com/in/sruthi-satyavarapu/).",
}

const GREETING: Message = {
  role: 'assistant',
  content:
    "Hi! I'm Sruthi's AI assistant 👋 I know everything about her experience, skills, projects, and research. What would you like to know?",
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-amber-600 dark:text-amber-400" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-stone-100 dark:bg-stone-800 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500 block"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggested, setShowSuggested] = useState(true)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Message = { role: 'user', content: text.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setShowSuggested(false)

    const canned = CANNED[text.trim()]
    if (canned) {
      setMessages((prev) => [...prev, { role: 'assistant', content: canned }])
      if (!openRef.current) setUnread((n) => n + 1)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      const content =
        res.status === 429
          ? data.message
          : data.message || 'Sorry, I had trouble with that. Please try again.'
      setMessages((prev) => [...prev, { role: 'assistant', content }])
      if (!openRef.current) setUnread((n) => n + 1)
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="w-[calc(100vw-48px)] sm:w-[380px] h-[520px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl shadow-2xl shadow-black/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Sruthi&apos;s AI</p>
                  <p className="text-amber-100 text-xs mt-0.5">Ask me anything</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-700">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-amber-500'
                        : 'bg-amber-100 dark:bg-amber-500/20'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User size={13} className="text-white" />
                    ) : (
                      <Bot size={13} className="text-amber-600 dark:text-amber-400" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-amber-500 text-white rounded-2xl rounded-br-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-2xl rounded-bl-sm'
                    }`}
                  >
                    {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && <TypingIndicator />}

              {/* Suggested questions */}
              {showSuggested && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-stone-400 dark:text-stone-500 text-center">
                    Try asking:
                  </p>
                  {SUGGESTED.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="w-full text-left text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400 hover:text-amber-600 dark:hover:border-amber-500/50 dark:hover:text-amber-400 transition-all bg-white dark:bg-stone-800/50 hover:bg-amber-50 dark:hover:bg-amber-500/5"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-stone-200 dark:border-stone-700 flex-shrink-0">
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 rounded-xl px-3 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about Sruthi..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 outline-none disabled:opacity-60"
                />
                <motion.button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-stone-300 dark:disabled:bg-stone-700 flex items-center justify-center transition-colors flex-shrink-0 disabled:cursor-not-allowed"
                >
                  <Send size={13} className="text-white" />
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-stone-400 dark:text-stone-600 mt-1.5">
                Powered by Gemini · Resume-based AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => { setOpen((v) => { openRef.current = !v; return !v }); setUnread(0) }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white relative"
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.div>
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-20" />
        )}

        {/* Unread badge */}
        {!open && unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md"
          >
            {unread}
          </motion.span>
        )}
      </motion.button>
    </div>
  )
}
