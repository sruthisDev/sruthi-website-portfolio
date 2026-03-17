import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sruthi Satyavarapu | AI/ML Engineer',
  description:
    'Portfolio of Sruthi Satyavarapu — AI/ML Engineer and Software Engineer specializing in RAG systems, machine learning, and data science with 6+ years of experience.',
  keywords: [
    'AI Engineer',
    'ML Engineer',
    'Software Engineer',
    'Machine Learning',
    'Data Science',
    'RAG',
    'LangChain',
    'Portfolio',
  ],
  openGraph: {
    title: 'Sruthi Satyavarapu | AI/ML Engineer',
    description:
      'AI/ML Engineer with 6+ years of experience. Specializing in RAG systems, machine learning, and data science.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
