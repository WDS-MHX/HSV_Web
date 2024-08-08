'use client'

import { useState, useEffect } from 'react'
import { PATH_NAME } from '@/configs'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'
import webInfoApi from '@/apis/webinfo'
import { useQuery } from '@tanstack/react-query'
import { AiFillPicture } from 'react-icons/ai'

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
    queryKey: ['avatar'],
    queryFn: () => webInfoApi.getWebInfoByType('LOGO_AVATAR'),
  })

  const [imgId, setImgId] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

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
        {(isError || isLoading) && (
          <div
            className={`border-0.5 bg-gray-200 border-sky-600 shadow-[0_3px_10px_rgb(0,0,0,0.05)] w-[100px] h-[100px] object-cover rounded-full m-auto ${isError ? '' : 'animate-pulse'} flex items-center`}
          >
            <AiFillPicture className='m-auto text-base text-gray-300' />
          </div>
        )}
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${imgId}`}
          alt=''
          className={`border-0.5 border-sky-600 shadow-[0_3px_10px_rgb(0,0,0,0.05)] w-[100px] h-[100px] rounded-full object-cover m-auto ${isError || isLoading ? 'hidden' : ''}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsError(true)
            setIsLoading(true)
          }}
        />
        {children}
      </div>
    </div>
  )
}
