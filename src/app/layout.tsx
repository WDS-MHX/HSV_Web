import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles/globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hội sinh viên',
  description:
    'Trang web cung cấp những thông tin hữu ích về hội sinh viên tại trường đại học Công Nghệ Thông Tin.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vn'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
