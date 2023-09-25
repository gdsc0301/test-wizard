import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Test Wizard - Test Page Generator',
  description: "Introducing TestWizard – your all-in-one, lightning-fast test generator! 🚀 Say goodbye to the chaos of inconsistent assessments and hello to beautifully standardized quizzes. Whether you're a teacher, educator, or just a quiz enthusiast, TestWizard is your secret weapon. 💫✨",
  authors: [{ name: 'Guilherme Carvalho', url: 'https://www.linkedin.com/in/guilherme-c/'}],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1
  },
  applicationName: 'Test Page Generator'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>

        <Analytics />
      </body>
    </html>
  )
}
