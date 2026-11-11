'use client'

import { useEffect, useRef, useState } from 'react'
import { translations, Lang } from '@/lib/translations'

type Message = { role: 'user' | 'assistant', content: string }

const LINK_RE = /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b|\b(?:https?:\/\/)?(?:linkedin\.com|github\.com|igriniuk-portfolio\.vercel\.app)\/[^\s,)]+)/g

function linkify(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  LINK_RE.lastIndex = 0
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    const found = m[0]
    const key = `${m.index}-${found}`
    if (found.includes('@')) {
      nodes.push(
        <a key={key} href={`mailto:${found}`} className="underline underline-offset-2 hover:text-primary-300">
          {found}
        </a>
      )
    } else {
      const url = found.startsWith('http') ? found : `https://${found}`
      nodes.push(
        <a key={key} href={url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-primary-300">
          {found}
        </a>
      )
    }
    last = m.index + found.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

function renderBody(content: string) {
  const paragraphs = content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  return paragraphs.map((p, i) => (
    <p key={i} className={i > 0 ? 'mt-3' : ''}>
      {linkify(p)}
    </p>
  ))
}

export default function ChatWidget({ lang }: { lang: Lang }) {
  const t = translations[lang]
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function send(text?: string) {
    const payload = (text ?? input).trim()
    if (!payload || loading) return
    setError(false)
    if (!text) setInput('')
    const next = [...messages, { role: 'user' as const, content: payload }]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      if (!res.ok) throw new Error('bad response')
      const data = await res.json()
      const reply = (data.reply || '').trim()
      if (!reply) throw new Error('empty')
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      <div className="chat-fab-wrap fixed bottom-6 right-6 z-40 rounded-full">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.chatOpen}
          className="chat-fab relative z-10 flex items-center gap-2.5 bg-primary-500 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:bg-primary-600 hover:scale-105 active:scale-95 transition"
        >
          <span className="relative flex items-center justify-center w-6 h-6">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-primary-500" style={{ background: '#fbbf24' }} />
          </span>
          <span className="text-sm font-semibold">{t.chatButton}</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-dark-900 border border-dark-700 sm:rounded-2xl w-full sm:max-w-lg h-[80vh] sm:h-[70vh] flex flex-col animate-in overflow-hidden">
            <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-dark-800">
              <div>
                <div className="text-xs uppercase tracking-wider text-dark-500">{t.chatTitle}</div>
                <div className="text-sm text-dark-300 mt-0.5">{t.chatSubtitle}</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={t.chatClose}
                className="text-dark-500 hover:text-white transition p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.length === 0 && (
                <>
                  <div className="text-sm text-dark-400 leading-relaxed">
                    {t.chatGreeting}
                  </div>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {t.chatSuggestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="text-xs text-dark-200 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-primary-500/60 hover:text-white rounded-full px-3 py-1.5 transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] bg-primary-500 text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap'
                        : 'max-w-[85%] bg-dark-800 text-dark-100 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed'
                    }
                  >
                    {m.role === 'assistant' ? renderBody(m.content) : m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-dark-800 text-dark-400 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-xs text-red-400">{t.chatError}</div>
              )}
            </div>

            <div className="border-t border-dark-800 p-3 flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder={t.chatPlaceholder}
                rows={1}
                className="flex-1 resize-none text-sm max-h-32"
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                aria-label={t.chatSend}
                className="shrink-0 bg-primary-500 text-white rounded-lg h-10 w-10 flex items-center justify-center hover:bg-primary-600 transition disabled:opacity-40"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
