'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoHomeFill } from 'react-icons/go'
import { FaUser } from 'react-icons/fa'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

import { PATH_NAME } from '@/configs/pathName'

const Navbar = () => {
  const pathname = usePathname()
  const navbarRef = useRef<HTMLDivElement>(null)

  const [isLoggin, setIsLoggin] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

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
      {isMenuOpen && <div className='fixed inset-0 bg-black opacity-20 z-40'></div>}
      <nav ref={navbarRef} className='rounded-md bg-sky-600 px-6 mt-1.5 z-50'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:w-auto w-full'>
          <div className='flex items-center'>
            <Link
              href={PATH_NAME.HOME}
              className='text-2xl block text-white pr-3 border-r-[1px] border-white'
            >
              <GoHomeFill />
            </Link>
          </div>

          <div className='flex md:hidden'>
            <button
              onClick={toggleMenu}
              className='text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
            >
              <FaBars />
            </button>
          </div>

          <div
            className={`nav-links ${isMenuOpen ? 'top-[0%]' : 'top-[-100%]'} transition-all duration-500 ease-in-out w-full md:static absolute bg-sky-600 md:min-h-fit min-h-[60vh] left-0 md:w-auto flex items-center px-5 z-50`}
          >
            <ul className='text-sm flex flex-col md:p-0 mt-4 font-medium md:flex-row md:mt-0 md:border-0 md:items-center justify-center w-full'>
              <li className='md:hidden flex justify-between'>
                <div className='flex items-center'>
                  <Link
                    href={PATH_NAME.HOME}
                    className='text-2xl block text-white pr-3 border-r-[1px] border-white'
                  >
                    <GoHomeFill />
                  </Link>
                </div>
                <div className='flex md:hidden'>
                  <button
                    onClick={toggleMenu}
                    className='text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
                  >
                    <FaTimes />
                  </button>
                </div>
              </li>
              <li
                className={
                  pathname == PATH_NAME.GIOI_THIEU ? 'bg-sky-700 text-secondary rounded-md' : ''
                }
              >
                <Link
                  href={PATH_NAME.GIOI_THIEU}
                  className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Giới thiệu
                </Link>
              </li>
              <li
                className={pathname == PATH_NAME.SVNT ? 'bg-sky-700 text-secondary rounded-md' : ''}
              >
                <Link
                  href={PATH_NAME.SVNT}
                  className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Sinh viên 5 tốt
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.CAU_CHUYEN_DEP ? 'bg-sky-700 text-secondary rounded-md' : ''
                }
              >
                <Link
                  href={PATH_NAME.CAU_CHUYEN_DEP}
                  className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Câu chuyện đẹp
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.TINH_NGUYEN ? 'bg-sky-700 text-secondary rounded-md' : ''
                }
              >
                <Link
                  href={PATH_NAME.TINH_NGUYEN}
                  className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Tình nguyện
                </Link>
              </li>
              <li
                className={pathname == PATH_NAME.NCKH ? 'bg-sky-700 text-secondary rounded-md' : ''}
              >
                <Link
                  href={PATH_NAME.NCKH}
                  className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  NCKH
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.HO_TRO_SINH_VIEN
                    ? 'bg-sky-700 text-secondary rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.HO_TRO_SINH_VIEN}
                  className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Hỗ trợ sinh viên
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.XAY_DUNG_HOI ? 'bg-sky-700 text-secondary rounded-md' : ''
                }
              >
                <Link
                  href={PATH_NAME.XAY_DUNG_HOI}
                  className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Xây dựng hội
                </Link>
              </li>
              <li
                className={
                  pathname == PATH_NAME.HE_THONG_VAN_BAN
                    ? 'bg-sky-700 text-secondary rounded-md'
                    : ''
                }
              >
                <Link
                  href={PATH_NAME.HE_THONG_VAN_BAN}
                  className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
                >
                  Hệ thống văn bản
                </Link>
              </li>
              <li>
                {isLoggin ? (
                  <button type='button' className='text-white text-lg'>
                    <FaUser />
                  </button>
                ) : (
                  <Link
                    href={PATH_NAME.DANG_NHAP}
                    className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700 text-sm font-medium'
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
