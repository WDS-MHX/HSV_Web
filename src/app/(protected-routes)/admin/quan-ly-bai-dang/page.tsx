'use client'

import { StaticImageData } from 'next/image'
import { ResultPage } from '@/components/shared'
import { useState, useEffect } from 'react'

interface searchData {
  id: string
  categorized: string
  title: string
  content: string
  img?: Array<string>
  comment: number
  date: string
}

const searchValue: string = ''

const data: searchData[] = [
  {
    id: '1',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
  {
    id: '2',
    categorized: 'Xây dựng hội',
    title:
      'UIT FACE| Sinh viên năm nhất UIT tham gia Đại hội Đại biểu sinh viên Việt Nam TP.HCM lần thứ VII, nhiệm kỳ 2023 - 2028',
    content:
      'Tại Đại hội Đại biểu Hội Sinh viên Việt Nam trường Đại học Công nghệ Thông tin, ĐHQG-HCM lần thứ VI, nhiệm kỳ 2023 – 2025 diễn ra vào ngày 26 tháng 5 năm 2023 đã hiệp thương bầu ra đoàn đại biểu tham dự Đại hội Đại biểu Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh lần thứ VII, nhiệm kỳ 2023 – 2028 (bao gồm 08 đại biểu chính thức và 03 đại biểu dự khuyết, khuyết 1 đại biểu theo cơ cấu là Sinh viên năm nhất)',
    img: ['/assets/images/content_img.svg'],
    comment: 1,
    date: '21/02/2023',
  },
]

const Quanlybaidang = () => {
  const [isPost, setIsPost] = useState<boolean>(true)

  const handleIsOpen = () => {
    setIsPost(true)
  }

  const handleNotIsOpen = () => {
    setIsPost(false)
  }

  return (
    <div className='w-full bg-[#E0F2FE] lg:pt-8 px-2 pb-4 h-fit'>
      <div className='bg-white rounded-xl py-4 px-6 max-md:px-1 mb-4'>
        <div className='p-1.5 flex bg-backgroundColor w-fit mb-6 max-md:hidden'>
          <div
            className={`cursor-pointer duration-300 transition-colors ${isPost ? 'text-primaryColor font-semibold bg-white' : 'text-[#334155]'} px-3 py-1.5 rounded-md`}
            onClick={handleIsOpen}
          >
            Đã đăng
          </div>
          <div
            className={`cursor-pointer duration-300 transition-colors ${!isPost ? 'text-primaryColor font-semibold bg-white' : 'text-[#334155]'} px-3 py-1.5 rounded-md`}
            onClick={handleNotIsOpen}
          >
            Chưa đăng
          </div>
        </div>
        <ResultPage isAdmin={true} searchValue={searchValue} searchResults={data} />
      </div>
    </div>
  )
}

export default Quanlybaidang
