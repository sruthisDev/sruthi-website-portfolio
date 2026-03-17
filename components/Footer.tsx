import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-stone-900 dark:bg-stone-950 border-t border-stone-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-stone-500">
            © {new Date().getFullYear()} Sruthi Satyavarapu. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-stone-600">
            <span>Built with</span>
            <Heart size={13} className="text-amber-500 fill-amber-500" />
            <span>using Next.js &amp; Tailwind</span>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/sruthisDev', label: 'GitHub' },
              {
                icon: Linkedin,
                href: 'https://linkedin.com/in/sruthi-satyavarapu/',
                label: 'LinkedIn',
              },
              { icon: Mail, href: 'mailto:s.satyavarapu@u.pacific.edu', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-stone-500 hover:text-amber-400 transition-colors"
                aria-label={label}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
