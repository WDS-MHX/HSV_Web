import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles/globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hội sinh viên Trường Đại học Công nghệ Thông tin',
  description:
    'Trang web cung cấp những thông tin hữu ích về hội sinh viên tại Trường Đại học Công nghệ Thông tin.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vi'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
