'use client'

import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useQuery } from '@tanstack/react-query'
import { AiFillPicture } from 'react-icons/ai'

import webInfoApi from '@/apis/webinfo'
import { timeoutMsg } from '@/configs'

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
    retry: (failureCount, error) => failureCount < 3 && error.message === timeoutMsg,
    retryDelay: 1000,
  })

  const [imgId, setImgId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

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
        {(isError || isLoading) && (
          <div
            className={`w-full rounded-md h-[120px] bg-gray-200 ${isError ? '' : 'animate-pulse'} flex items-center`}
          >
            <AiFillPicture className='m-auto text-4xl text-gray-300' />
          </div>
        )}
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${imgId}`}
          alt='header_banner'
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(true)
            setIsError(true)
          }}
          className={`object-cover max-h-[120px] w-full ${isLoading || isError ? 'hidden' : ''}`}
        />
      </div>
      <Navbar isAuth={isAuth} />
    </header>
  )
}

export default Header
