import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Provinha 💫✨',
  description: "Crie provas com facilidade, prontas para impressão, de forma padronizada, em poucos minutos!",
  authors: [{ name: 'Guilherme Carvalho', url: 'https://www.linkedin.com/in/guilherme-c/' }],
  applicationName: 'Provinha',
  category: 'education',
  creator: 'Guilherme Carvalho',
  icons: "https://provinha.vercel.app/logo.png",
  keywords: ['prova', 'gerador de provas', 'editor de provas', 'teste', 'educação', 'ensino', 'professor', 'estudante', 'ferramenta educacional', 'impressão de provas', 'criação de testes'],
  openGraph: {
    title: 'Provinha 💫✨',
    description: "Crie provas com facilidade, prontas para impressão, de forma padronizada, em poucos minutos!",
    url: 'https://provinha.vercel.app',
    siteName: 'Provinha',
    images: [
      {
        url: 'https://provinha.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Provinha',
      },
    ],
    locale: 'pt-BR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>

        <Analytics />
      </body>
    </html>
  )
}
