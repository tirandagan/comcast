import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import ToasterProvider from '@/components/ToasterProvider'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sutherland AI Innovation Microsite',
  description: 'Interactive AI Innovation Roadmap - Sutherland Global Services',
  keywords: 'AI, Innovation, Digital Transformation, Sutherland',
  authors: [{ name: 'Sutherland Global Services' }],
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </Suspense>
        <ToasterProvider />
      </body>
    </html>
  )
}