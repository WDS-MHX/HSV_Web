'use client'

import { useState, useEffect } from 'react'
import { TbCircleLetterC } from 'react-icons/tb'
import { GrLocation } from 'react-icons/gr'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { useQuery } from '@tanstack/react-query'

import webInfoApi from '@/apis/webinfo'

interface DataItem {
  _id: string
  type: string
  value?: string
  mediaFileId?: string
  __v: number
  createdAt: string
  updatedAt: string
}

const Footer = () => {
  const { data } = useQuery({
    queryKey: ['info'],
    queryFn: () => webInfoApi.getAllWebInfo(),
  })

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [footerLogo, setFooterLogo] = useState<string>('')
  const [copyrightLogo, setCopyrightLogo] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [phonenumber, setPhonenumber] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    if (data) {
      data.forEach((item: DataItem) => {
        switch (item.type) {
          case 'ADDRESS':
            setAddress(item.value || '')
            break
          case 'EMAIL':
            setEmail(item.value || '')
            break
          case 'PHONENUMBER':
            setPhonenumber(item.value || '')
            break
          case 'LOGO_FOOTER':
            setFooterLogo(item.mediaFileId || '')
            break
          case 'LOGO_COPYRIGHT':
            setCopyrightLogo(item.mediaFileId || '')
            break
          default:
            break
        }
      })
    }
  }, [data])

  return (
    <footer className='md:flex justify-center items-center bg-sky-600 h-full p-2.5 w-full'>
      <div className='flex flex-col md:mt-[3.375rem] mt-8 mb-[0.375rem]'>
        <div className={`flex gap-16 md:flex-row flex-col ${isLoading ? 'hidden' : ''}`}>
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${footerLogo}`}
            alt='footer_logos'
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            className='object-contain max-md:mx-auto w-[360px] h-[99.82px]'
          />
          <ul className='flex flex-col gap-6 text-white text-sm max-md:mt-5'>
            <li className='flex items-center gap-7'>
              <TbCircleLetterC color='[#0F172A]' size={24} />
              <p>Hội Sinh viên Việt Nam Trường Đại học Công Nghệ Thông Tin, ĐHQG-HCM</p>
            </li>
            <li className='flex items-center gap-7'>
              <GrLocation color='[#0F172A]' size={24} />
              <p>{address}</p>
            </li>
            <li className='flex items-center gap-7'>
              <FiPhone color='[#0F172A]' size={24} />
              <a href={`tel:${phonenumber}`}>{phonenumber}</a>
            </li>
            <li className='flex items-center gap-7'>
              <HiOutlineMail color='[#0F172A]' size={24} />
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          </ul>
        </div>
        <div className='flex gap-[0.625rem] md:mt-12 mt-16 w-full items-center justify-center'>
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${copyrightLogo}`}
            alt='footer_logos'
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            className={`object-contain w-[51.48px] h-[40px] ${isLoading ? 'hidden' : ''}`}
          />
          <p className='text-slate-200 text-sm font-normal flex items-center'>
            Copyright{' '}
            <span className='mx-1'>
              <TbCircleLetterC color='[#E2E8F0]' size={14} />
            </span>{' '}
            2024 WebDev Studios
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
