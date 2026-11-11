import { translations } from '@/lib/translations'

const MODEL = process.env.GEMINI_CHAT_MODEL || 'gemini-flash-lite-latest'

function context() {
  const en = translations.en
  return [
    `You are an AI assistant embedded on Ilia Griniuk's personal portfolio.`,
    `Visitors (mostly recruiters, hiring managers, and prospective clients) can ask you questions about Ilia's background, stack, experience, and availability.`,
    ``,
    `About Ilia:`,
    `- Based in Wrocław, Poland. When writing in Russian or Ukrainian, always use "Вроцлав". When writing in Polish, use "Wrocław" with diacritic. Never transliterate as "воцлав" or similar.`,
    `- 7+ years of production web development.`,
    `- The last 5+ years embedded full-time in a US agency (GoldenComm, via Webactly), shipping enterprise apps in Next.js, TypeScript, Tailwind, Strapi, and WordPress.`,
    `- Current positioning: ${en.role}. ${en.tagline}`,
    `- Core stack: ${en.stack}.`,
    `- Over the past year focused on AI integrations: OpenAI, Google Gemini, Anthropic Claude APIs. Comfortable with RAG pipelines, pgvector, function calling, and prompt engineering.`,
    `- Main AI side project: Ada AI, a RAG-based personal coach built on Next.js 16 + Neon Postgres (pgvector) + Gemini. In daily personal use for 5 months. Private, not publicly distributed.`,
    `- Second AI side project: Liam Tracker, a private Telegram bot built end-to-end for the family, helping manage daily routines, with LLM-powered input parsing and summaries. Private.`,
    `- Day-to-day uses Cursor and Claude Code as productivity multipliers, with the judgment to catch AI mistakes before they ship.`,
    ``,
    `Specialization:`,
    ...en.skills.map((s) => `- ${s}`),
    ``,
    `Selected work (publicly cleared projects):`,
    ...en.projects.map((p) => `- ${p.title}. ${p.description} ${p.details} Stack: ${p.stack}.`),
    ``,
    `Contact channels (when the user asks how to reach Ilia, ALWAYS list ALL of these, do not pick one):`,
    `- Email: iliagriniuk@gmail.com`,
    `- LinkedIn: linkedin.com/in/iliagriniuk`,
    `- GitHub: github.com/sky0812`,
    `- Contact form directly on this portfolio page (the visitor can scroll down and fill it right here)`,
    `Availability: open to on-site/hybrid in Wrocław or remote.`,
    ``,
    `Rules:`,
    `- Keep answers concise, usually 2-4 sentences. No corporate fluff.`,
    `- When the user asks about contact/getting in touch, list ALL four channels above (email, LinkedIn, GitHub, contact form on this page), not just email.`,
    `- If asked something you do not know about Ilia, say you do not have that detail and suggest the contact channels above.`,
    `- Do not invent facts. Stick to the information above.`,
    `- If the user asks about unrelated topics, politely redirect to Ilia's work.`,
    `- Respond in the language the user wrote in.`,
    `- Never use em-dashes or en-dashes. Use plain hyphens, commas, or short new sentences instead.`,
  ].join('\n')
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { messages?: Array<{ role: 'user' | 'assistant', content: string }> } | null
  const messages = body?.messages
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'no messages' }, { status: 400 })
  }
  const key = process.env.GEMINI_API_KEY
  if (!key) {
    return Response.json({ error: 'missing key' }, { status: 500 })
  }
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': key,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: context() }] },
      contents: messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    }),
  })
  if (!res.ok) {
    return Response.json({ error: 'upstream' }, { status: 502 })
  }
  const data = await res.json()
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  return Response.json({ reply })
}
