import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gerador de Prova',
  description: "Apresentando o Gerador de Prova – seu gerador de provas rápido e completo! 🚀 Diga adeus ao caos das avaliações inconsistentes e olá para questionários lindamente padronizados. Se você é um professor, educador ou apenas um entusiasta de questionários, o Gerador de Prova é sua arma secreta. 💫✨",
  authors: [{ name: 'Guilherme Carvalho', url: 'https://www.linkedin.com/in/guilherme-c/' }],
  applicationName: 'Gerador de Prova'
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
