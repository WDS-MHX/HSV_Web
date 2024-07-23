'use client'

import { PATH_NAME } from '@/configs'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='absolute'>
      <div className='relative top-6 left-8 items-center'>
        <Link href={PATH_NAME.HOME} className='flex gap-2'>
          <GoArrowLeft size={22} className='text-black' />
          <span className='text-black font-medium hover:underline'>Về trang chủ</span>
        </Link>
      </div>
      {children}
    </div>
  )
}
