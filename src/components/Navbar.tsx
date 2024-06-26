'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { GoHomeFill } from 'react-icons/go'
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className='rounded-md bg-sky-600 px-6 mt-1.5'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
        <div className='flex md:order-2'>
          <button type='button' className='text-white text-lg'>
            <FaSearch />
          </button>
        </div>
        <div className='items-center justify-center w-full md:flex md:w-auto' id='navbar-search'>
          <ul className='text-sm flex flex-col md:p-0 mt-4 font-medium md:flex-row md:mt-0 md:border-0 items-center justify-center'>
            <li>
              <Link href='/' className='text-2xl block text-white pr-3 border-r-[1px] border-white'>
                <GoHomeFill />
              </Link>
            </li>
            <li className={pathname == '/gioi-thieu' ? 'bg-sky-700 text-sky-200 rounded-md' : ''}>
              <Link
                href='/gioi-thieu'
                className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
              >
                Giới thiệu
              </Link>
            </li>
            <li
              className={pathname == '/sinh-vien-5-tot' ? 'bg-sky-700 text-sky-200 rounded-md' : ''}
            >
              <Link
                href='/sinh-vien-5-tot'
                className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
              >
                Sinh viên 5 tốt
              </Link>
            </li>
            <li
              className={pathname == '/cau-chuyen-dep' ? 'bg-sky-700 text-sky-200 rounded-md' : ''}
            >
              <Link
                href='/cau-chuyen-dep'
                className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
              >
                Câu chuyện đẹp
              </Link>
            </li>
            <li className={pathname == '/tinh-nguyen' ? 'bg-sky-700 text-sky-200 rounded-md' : ''}>
              <Link
                href='tinh-nguyen'
                className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
              >
                Tình nguyện
              </Link>
            </li>
            <li className={pathname == '/nckh' ? 'bg-sky-700 text-sky-200 rounded-md' : ''}>
              <Link
                href='nckh'
                className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
              >
                NCKH
              </Link>
            </li>
            <li
              className={
                pathname == '/ho-tro-sinh-vien' ? 'bg-sky-700 text-sky-200 rounded-md' : ''
              }
            >
              <Link
                href='ho-tro-sinh-vien'
                className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
              >
                Hỗ trợ sinh viên
              </Link>
            </li>
            <li className={pathname == '/xay-dung-hoi' ? 'bg-sky-700 text-sky-200 rounded-md' : ''}>
              <Link
                href='xay-dung-hoi'
                className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
              >
                Xây dựng hội
              </Link>
            </li>
            <li
              className={
                pathname == '/he-thong-van-ban' ? 'bg-sky-700 text-sky-200 rounded-md' : ''
              }
            >
              <Link
                href='he-thong-van-ban'
                className='block text-white p-4 rounded-md transition-colors duration-300 hover:bg-sky-700'
              >
                Hệ thống văn bản
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
