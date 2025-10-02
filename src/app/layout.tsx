import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import ToasterWrapper from '@/components/ToasterWrapper'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'TaskFlow - Gerenciamento de Tarefas',
  description: 'Sistema completo de gerenciamento de tarefas e projetos',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TaskFlow',
  },
  openGraph: {
    type: 'website',
    siteName: 'TaskFlow',
    title: 'TaskFlow - Gerenciamento de Tarefas',
    description: 'Sistema completo de gerenciamento de tarefas e projetos',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToasterWrapper />
        <script src="/register-sw.js" async></script>
      </body>
    </html>
  );
}
