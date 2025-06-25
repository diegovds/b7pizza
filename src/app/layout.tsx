import { Cart } from '@/components/cart/cart'
import { LoginAreaDialog } from '@/components/login-area/login-area-dialog'
import type { Metadata } from 'next'
import { Roboto, Roboto_Mono } from 'next/font/google'
import './globals.css'

const robotoSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'B7Pizza',
  description: '...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} bg-slate-900 antialiased`}
      >
        {children}
        <Cart />
        <LoginAreaDialog />
      </body>
    </html>
  )
}
