'use client'

import { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { translations, langNames, Lang } from '@/lib/translations'

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [captchaToken, setCaptchaToken] = useState('')
  const captchaRef = useRef<HCaptcha>(null)
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [showModal, setShowModal] = useState(false)
  const t = translations[lang]

  async function copyEmail() {
    await navigator.clipboard.writeText('iliagriniuk@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('sending')

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append('access_key', '0a278db4-4515-42b0-8169-7ced510fe6fc')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        setFormState('sent')
        form.reset()
        setCaptchaToken('')
        captchaRef.current?.resetCaptcha()
        setShowModal(true)
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <main className="gradient-bg min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <nav className="flex items-center justify-end gap-1 mb-16">
          {(Object.keys(langNames) as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition ${
                lang === l
                  ? 'bg-primary-500 text-white'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              {langNames[l]}
            </button>
          ))}
        </nav>

        <section>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {t.title}
          </h1>
          <p className="mt-2 text-xl text-primary-400">
            {t.role}
          </p>
          <p className="mt-4 text-dark-300 leading-relaxed">
            {t.tagline}
          </p>
          <p className="mt-2 font-mono text-sm text-dark-500">
            {t.stack}
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-dark-500">
            {t.whatIBuild}
          </h2>
          <ul className="mt-4 space-y-2">
            {t.skills.map((skill, i) => (
              <li key={i} className="flex items-start gap-3 text-dark-300">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0" />
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-dark-500">
            {t.selectedWork}
          </h2>

          <div className="mt-6 space-y-4">
            {t.projects.map((project, i) => (
              <article key={i} className="card p-5 group">
                <h3 className="font-medium text-white group-hover:text-primary-400 transition">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-dark-400">
                  {project.description}
                </p>
                <p className="mt-2 text-sm text-dark-500 leading-relaxed">
                  {project.details}
                </p>
                <p className="mt-3 font-mono text-xs text-dark-600">
                  {project.stack}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-dark-500">
            {t.contact}
          </h2>
          <p className="mt-2 text-dark-400 text-sm">{t.contactDesc}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder={t.name}
                required
                className="w-full"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder={t.email}
                required
                className="w-full"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder={t.message}
                rows={4}
                required
                className="w-full resize-none"
              />
            </div>
            <HCaptcha
              ref={captchaRef}
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              reCaptchaCompat={false}
              onVerify={(token) => setCaptchaToken(token)}
            />
            <button
              type="submit"
              disabled={formState === 'sending' || formState === 'sent' || !captchaToken}
              className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition disabled:opacity-50"
            >
              {formState === 'sending' ? t.sending : formState === 'sent' ? t.sent : t.send}
            </button>
            {formState === 'error' && (
              <p className="text-red-400 text-sm text-center">{t.error}</p>
            )}
          </form>
        </section>

        <section className="mt-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-dark-500">
            {t.links}
          </h2>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <a
              href="https://github.com/sky0812"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-dark-300 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/iliagriniuk"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-dark-300 hover:text-white transition"
            >
              LinkedIn
            </a>
            <button
              onClick={copyEmail}
              className="link-hover text-dark-300 hover:text-white transition"
            >
              {copied ? t.copied : 'iliagriniuk@gmail.com'}
            </button>
          </div>
        </section>

        <footer className="mt-20 border-t border-dark-800 pt-8 text-sm text-dark-600">
          {t.footer}
        </footer>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-dark-900 border border-dark-700 rounded-2xl p-8 max-w-md w-full text-center animate-in">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
            <p className="text-dark-400 mb-8">
              Your message has been sent successfully. I&apos;ll get back to you soon.
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <a
                href="https://linkedin.com/in/iliagriniuk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white rounded-lg font-medium hover:bg-[#004182] transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/sky0812"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-dark-800 text-white rounded-lg font-medium hover:bg-dark-700 transition border border-dark-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="text-dark-500 hover:text-white transition text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
