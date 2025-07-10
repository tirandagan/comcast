import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import ToasterProvider from '@/components/ToasterProvider'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Comcast Data & AI Leadership Vision',
  description: 'Transforming Comcast Through Data & AI - Strategic Vision for Chief Data & AI Officer',
  keywords: 'Comcast, Data, AI, Artificial Intelligence, Digital Transformation, Chief Data Officer, Analytics',
  authors: [{ name: 'Tiran Dagan' }],
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