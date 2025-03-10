'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoHomeFill } from 'react-icons/go'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import webInfoApi from '@/apis/webinfo'
import { useQuery } from '@tanstack/react-query'
import { PATH_NAME, AUTH_PATH_NAME } from '@/configs'
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

interface NavbarPropType {
  isAuth: boolean
}

const Navbar = ({ isAuth = false }: NavbarPropType) => {
  const { data } = useQuery({
    queryKey: ['logoavatar'],
    queryFn: () => webInfoApi.getWebInfoByType('LOGO_AVATAR'),
    retry: (failureCount, error) => failureCount < 3 && error.message === 'request/timeout',
    retryDelay: 1000,
  })

  const pathname = usePathname()
  const navbarRef = useRef<HTMLDivElement>(null)

  const [isLoggin, setIsLoggin] = useState<boolean>(isAuth)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [imgId, setImgId] = useState<string>('')

  useEffect(() => {
    if (data) {
      data.forEach((item: DataItem) => {
        setImgId(item.mediaFileId || '')
      })
    }
  }, [data])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {isMenuOpen && <div className='fixed inset-0 bg-black opacity-30 z-40'></div>}
      <nav ref={navbarRef} className='rounded-md bg-sky-600 px-4 mt-1.5 z-50 flex'>
        <div className='max-w-screen-xl flex flex-wrap items-center lg:justify-evenly justify-between mx-auto w-full'>
          <Link
            href={PATH_NAME.HOME}
            className='text-2xl block text-white pr-3 border-r-[1px] border-white mr-1'
          >
            <GoHomeFill />
          </Link>

          <div className='flex lg:hidden'>
            <button
              onClick={toggleMenu}
              className='text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div
            className={`nav-links ${isMenuOpen ? 'top-[0%]' : 'top-[-100%]'} transition-all duration-500 ease-in-out w-full lg:static absolute bg-sky-600 lg:min-h-fit min-h-[60vh] left-0 lg:w-auto flex items-center z-50`}
          >
            <ul className='text-sm flex flex-col lg:p-0 mt-4 font-medium lg:flex-row lg:mt-0 lg:border-0 lg:items-center justify-center w-full'>
              <li className='lg:hidden flex justify-between items-center'>
                <div className='flex items-center px-4 gap-1'>
                  <Link
                    href={PATH_NAME.HOME}
                    className='text-2xl block text-white pr-3 border-r-[1px] border-white'
                  >
                    <GoHomeFill />
                  </Link>
                  <Link
                    href={AUTH_PATH_NAME.DANG_NHAP}
                    type='button'
                    className={`block text-white text-lg px-4 items-center justify-center ${isAuth ? '' : 'hidden'}`}
                  >
                    {(isError || isLoading) && (
                      <div
                        className={`border-0.5 bg-gray-200 border-sky-600 shadow-[0_3px_10px_rgb(0,0,0,0.05)] w-[26px] h-[26px] object-cover rounded-full ${isError ? '' : 'animate-pulse'} flex items-center`}
                      >
                        <AiFillPicture className='m-auto text-base text-gray-300' />
                      </div>
                    )}
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${imgId}`}
                      className={`border-0.5 border-sky-600 shadow-[0_3px_10px_rgb(0,0,0,0.05)] w-[26px] h-[26px] object-cover rounded-full ${isError || isLoading ? 'hidden' : ''}`}
                      alt=''
                      onLoad={() => setIsLoading(false)}
                      onError={() => {
                        setIsError(true)
                        setIsLoading(true)
                      }}
                    />
                  </Link>
                </div>
                <div className='flex lg:hidden'>
                  <button
                    onClick={toggleMenu}
                    className='text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
                  >
                    <FaTimes />
                  </button>
                </div>
              </li>
              <li
                className={
                  pathname == PATH_NAME.GIOI_THIEU ||
                  (pathname.startsWith(PATH_NAME.GIOI_THIEU) && pathname !== '/')
                    ? 'bg-sky-700 text-secondaryColor rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.GIOI_THIEU}
                  className='block text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Giới thiệu
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.SVNT ||
                  (pathname.startsWith(PATH_NAME.SVNT) && pathname !== '/')
                    ? 'bg-sky-700 text-secondaryColor rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.SVNT}
                  className='block text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Sinh viên 5 tốt
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.CAU_CHUYEN_DEP ||
                  (pathname.startsWith(PATH_NAME.CAU_CHUYEN_DEP) && pathname !== '/')
                    ? 'bg-sky-700 text-secondaryColor rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.CAU_CHUYEN_DEP}
                  className='block text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Câu chuyện đẹp
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.TINH_NGUYEN ||
                  (pathname.startsWith(PATH_NAME.TINH_NGUYEN) && pathname !== '/')
                    ? 'bg-sky-700 text-secondaryColor rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.TINH_NGUYEN}
                  className='block text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Tình nguyện
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.NCKH ||
                  (pathname.startsWith(PATH_NAME.NCKH) && pathname !== '/')
                    ? 'bg-sky-700 text-secondaryColor rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.NCKH}
                  className='block text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  NCKH
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.HO_TRO_SINH_VIEN ||
                  (pathname.startsWith(PATH_NAME.HO_TRO_SINH_VIEN) && pathname !== '/')
                    ? 'bg-sky-700 text-secondaryColor rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.HO_TRO_SINH_VIEN}
                  className='block text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Hỗ trợ sinh viên
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.XAY_DUNG_HOI ||
                  (pathname.startsWith(PATH_NAME.XAY_DUNG_HOI) && pathname !== '/')
                    ? 'bg-sky-700 text-secondaryColor rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.XAY_DUNG_HOI}
                  className='block text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Xây dựng hội
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.HE_THONG_VAN_BAN ||
                  (pathname.startsWith(PATH_NAME.HE_THONG_VAN_BAN) && pathname !== '/')
                    ? 'bg-sky-700 text-secondaryColor rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.HE_THONG_VAN_BAN}
                  className='block text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Hệ thống văn bản
                </Link>
              </li>
              <li>
                {isAuth ? (
                  <Link
                    href={AUTH_PATH_NAME.DANG_NHAP}
                    type='button'
                    className='block pl-[2.5rem] items-center justify-center max-lg:hidden max-md:hidden'
                  >
                    {(isError || isLoading) && (
                      <div
                        className={`border-0.5 bg-gray-200 border-sky-600 shadow-[0_3px_10px_rgb(0,0,0,0.05)] w-[26px] h-[26px] object-cover rounded-full ${isError ? '' : 'animate-pulse'} flex items-center`}
                      >
                        <AiFillPicture className='m-auto text-base text-gray-300' />
                      </div>
                    )}
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${imgId}`}
                      className={`border-0.5 border-sky-600 shadow-[0_3px_10px_rgb(0,0,0,0.05)] w-[26px] h-[26px] object-cover rounded-full ${isError || isLoading ? 'hidden' : ''}`}
                      alt=''
                      onLoad={() => setIsLoading(false)}
                      onError={() => {
                        setIsError(true)
                        setIsLoading(true)
                      }}
                    />
                  </Link>
                ) : (
                  <Link
                    href={AUTH_PATH_NAME.DANG_NHAP}
                    className='block text-white py-4 px-[0.8rem] rounded-md transition-colors duration-300 hover:bg-sky-700 text-sm font-medium'
                  >
                    Đăng nhập
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
