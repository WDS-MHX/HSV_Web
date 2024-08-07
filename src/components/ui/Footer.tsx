'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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
  const { data: FooterLogo } = useQuery({
    queryKey: ['logofooter'],
    queryFn: () => webInfoApi.getWebInfoByType('LOGO_FOOTER'),
  })

  const { data: CopyrightLogo } = useQuery({
    queryKey: ['logocopyright'],
    queryFn: () => webInfoApi.getWebInfoByType('LOGO_COPYRIGHT'),
  })

  const [footerImgId, setFooterImgId] = useState<string>('')
  const [copyrightImgId, setCopyrightImgId] = useState<string>('')

  useEffect(() => {
    if (FooterLogo) {
      FooterLogo.forEach((item: DataItem) => {
        setFooterImgId(item.mediaFileId || '')
      })
    }
  }, [FooterLogo])

  useEffect(() => {
    if (CopyrightLogo) {
      CopyrightLogo.forEach((item: DataItem) => {
        setCopyrightImgId(item.mediaFileId || '')
      })
    }
  }, [FooterLogo])

  return (
    <footer className='md:flex justify-center items-center bg-sky-600 h-full p-2.5 w-full'>
      <div className='flex flex-col md:mt-[3.375rem] mt-8 mb-[0.375rem]'>
        <div className='flex gap-16 md:flex-row flex-col'>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${footerImgId}`}
            alt='footer_logos'
            width={360}
            height={99.82}
            className='object-contain max-md:mx-auto'
          />
          <ul className='flex flex-col gap-6 text-white text-sm max-md:mt-5'>
            <li className='flex items-center gap-7'>
              <TbCircleLetterC color='[#0F172A]' size={24} />
              <p>Hội Sinh viên Việt Nam Trường Đại học Công Nghệ Thông Tin, ĐHQG-HCM</p>
            </li>
            <li className='flex items-center gap-7'>
              <GrLocation color='[#0F172A]' size={24} />
              <p>Khu phố 6, phường Linh Trung, Tp. Thủ Đức, Tp. Hồ Chí Minh</p>
            </li>
            <li className='flex items-center gap-7'>
              <FiPhone color='[#0F172A]' size={24} />
              <a href='tel:0828769763'>0828769763</a>
            </li>
            <li className='flex items-center gap-7'>
              <HiOutlineMail color='[#0F172A]' size={24} />
              <a href='mailto:Hoisinhvien@uit.edu.vn'>Hoisinhvien@uit.edu.vn</a>
            </li>
          </ul>
        </div>
        <div className='flex gap-[0.625rem] md:mt-12 mt-16 w-full items-center justify-center'>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${copyrightImgId}`}
            alt='footer_logos'
            width={51.48}
            height={40}
            className='object-contain'
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
