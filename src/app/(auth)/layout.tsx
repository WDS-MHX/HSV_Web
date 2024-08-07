'use client'

import { useState, useEffect } from 'react'
import { PATH_NAME } from '@/configs'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'
import webInfoApi from '@/apis/webinfo'
import { useQuery } from '@tanstack/react-query'

interface DataItem {
  _id: string
  type: string
  value?: string
  mediaFileId?: string
  __v: number
  createdAt: string
  updatedAt: string
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data } = useQuery({
    queryKey: ['webinfo'],
    queryFn: () => webInfoApi.getWebInfoByType('LOGO_AVATAR'),
  })

  const [imgId, setImgId] = useState<string>('')

  useEffect(() => {
    if (data) {
      data.forEach((item: DataItem) => {
        setImgId(item.mediaFileId || '')
      })
    }
  }, [data])

  return (
    <div className='absolute h-screen w-screen'>
      <div className='relative top-6 left-8 items-center'>
        <Link href={PATH_NAME.HOME} className='flex gap-2'>
          <GoArrowLeft size={22} className='text-black' />
          <span className='text-black font-medium hover:underline'>Về trang chủ</span>
        </Link>
      </div>

      <div className='items-center bg-white md:max-w-[470px] px-8 py-16 m-auto mt-[2%]'>
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${imgId}`}
          alt=''
          className={`border-0.5 border-sky-600 shadow-[0_3px_10px_rgb(0,0,0,0.05)] w-[100px] h-[100px] rounded-full object-cover m-auto`}
        />
        {children}
      </div>
    </div>
  )
}
