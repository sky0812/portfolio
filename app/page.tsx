'use client'

import { useState } from 'react'
import { translations, langNames, Lang } from '@/lib/translations'

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
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
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/' + process.env.NEXT_PUBLIC_FORMSPREE_ID, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setFormState('sent')
        form.reset()
        setTimeout(() => setFormState('idle'), 3000)
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
            <button
              type="submit"
              disabled={formState === 'sending'}
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
    </main>
  )
}
