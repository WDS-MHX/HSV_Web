'use client'

import { IoMdArrowRoundBack } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { PATH_NAME } from '@/configs'

const NotFound = () => {
  const router = useRouter()

  return (
    <div className='items-center h-screen w-screen flex'>
      <div className='flex max-md:flex-col-reverse mx-auto items-center gap-[60px] max-md:gap-[48px] max-md:w-full max-md:px-6 max-md:mt-[-60px]'>
        <div className='flex flex-col max-md:items-center max-md:w-full'>
          <div className='flex max-md:flex-col gap-[24px] text-[48px] font-[800] max-md:text-[30px] max-md:gap-0 max-md:w-full text-center'>
            <span className='text-sky-600 max-md:text-white max-md:bg-sky-300 max-md:text-center max-md:w-full'>
              404
            </span>
            <span className='text-primaryColor max-md:mt-3'>Oops...</span>
          </div>
          <span className='text-primaryColor text-[18px] font-[600]'>Có vẻ bạn đã đi lạc!</span>
          <button
            className='bg-sky-600 px-4 py-2 rounded-md flex gap-2 items-center mt-6 w-fit'
            onClick={() => router.push(PATH_NAME.HOME)}
          >
            <IoMdArrowRoundBack className='text-white' />
            <span className='text-white font-[500] text-[14px] max-md:text-base'>Về trang chủ</span>
          </button>
        </div>
        <img
          src='/assets/images/notfound.png'
          alt='404 not-found'
          className='max-md:max-h-[250px] max-md:overflow-hidden'
        />
      </div>
    </div>
  )
}

export default NotFound
