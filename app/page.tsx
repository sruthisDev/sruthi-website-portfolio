import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import SectionIndicator from '@/components/SectionIndicator'
import SectionPrelude from '@/components/SectionPrelude'

export default function Home() {
  return (
    <main className="bg-stone-50 dark:bg-[#0f172a] min-h-screen">
      <Navbar />
      <SectionIndicator />
      <SectionPrelude />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  )
}
