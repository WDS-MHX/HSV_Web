'use client'

import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useQuery } from '@tanstack/react-query'
import { AiFillPicture } from 'react-icons/ai'

import webInfoApi from '@/apis/webinfo'

interface HeaderPropType {
  isAuth: boolean
}

interface DataItem {
  _id: string
  type: string
  value?: string
  mediaFileId?: string
  __v: number
  createdAt: string
  updatedAt: string
}

const Header = ({ isAuth = false }: HeaderPropType) => {
  const { data } = useQuery({
    queryKey: ['webinfo'],
    queryFn: () => webInfoApi.getWebInfoByType('LOGO_BANNER'),
  })

  const [imgId, setImgId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (data) {
      data.forEach((item: DataItem) => {
        setImgId(item.mediaFileId || '')
      })
    }
  }, [data])

  return (
    <header className='max-w-6xl w-full mx-auto'>
      <div className='relative w-full'>
        {isLoading && (
          <div className='w-full rounded-md h-[120px] bg-gray-200 animate-pulse flex items-center'>
            <AiFillPicture className='m-auto text-4xl text-gray-300' />
          </div>
        )}
        <img
          src={data ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${imgId}` : ''}
          alt='header_banner'
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className={`object-cover max-h-[120px] w-full ${isLoading ? 'hidden' : ''}`}
        />
      </div>
      <Navbar isAuth={isAuth} />
    </header>
  )
}

export default Header
