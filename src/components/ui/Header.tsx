'use client'

import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

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
        <Image
          src={data ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${imgId}` : ''}
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={1200}
          height={400}
          object-fit='contain'
          alt='header_banner'
        />
      </div>
      <Navbar isAuth={isAuth} />
    </header>
  )
}

export default Header
