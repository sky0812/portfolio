import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ilia Griniuk — Senior Frontend Engineer',
  description: 'Building production-grade web applications. Next.js, TypeScript, React, Tailwind CSS.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
      {children}
      <Analytics/>
    </body>
    </html>
  )
}
