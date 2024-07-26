'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { authApi } from '@/apis'

import { ADMIN_PATH_NAME, PATH_NAME } from '@/configs'
import SUPERUSER_PATH_NAME from '@/configs/pathName/superuserPathName'

const AdminHeader = ({ role }: { role: String }) => {
  const router = useRouter()

  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className='max-md:hidden md:flex lg:hidden h-16 bg-[#E0F2FE] py-2 px-6 w-full z-50 sticky top-0 justify-between items-center'>
        <div className='flex gap-16 items-center'>
          <p className='text-title font-semibold text-xl'>{role}</p>
          <ul className='flex gap-2.5'>
            {/* Admin */}
            {role == 'Admin' && (
              <div className='flex gap-2.5'>
                <li
                  className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 rounded-md
                ${
                  pathname == ADMIN_PATH_NAME.QUAN_LY_BAI_DANG ||
                  (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG) && pathname !== '/')
                    ? 'bg-white text-primaryColor rounded-md'
                    : 'text-secondaryColor'
                }
              `}
                >
                  <Link href={ADMIN_PATH_NAME.QUAN_LY_BAI_DANG} className='cursor-pointer'>
                    Quản lý bài đăng
                  </Link>
                </li>
                <li
                  className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 rounded-md
                ${
                  pathname == ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU ||
                  (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU) && pathname !== '/')
                    ? 'bg-white text-primaryColor rounded-md'
                    : 'text-secondaryColor'
                }
              `}
                >
                  <Link href={ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU} className='cursor-pointer'>
                    Quản lý tài liệu
                  </Link>
                </li>
              </div>
            )}
            {/* Superuser */}
            {role == 'Superuser' && (
              <li
                className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 rounded-md
                ${
                  pathname == SUPERUSER_PATH_NAME.CAP_TAI_KHOAN ||
                  (pathname.startsWith(SUPERUSER_PATH_NAME.CAP_TAI_KHOAN) && pathname !== '/')
                    ? 'bg-white text-primaryColor rounded-md'
                    : 'text-secondaryColor'
                }
              `}
              >
                <Link href={SUPERUSER_PATH_NAME.CAP_TAI_KHOAN} className='cursor-pointer'>
                  Cấp tài khoản
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className='flex gap-2.5'>
          <p
            className='py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-white text-secondaryColor hover:text-primaryColor'
            onClick={() => {
              router.push(PATH_NAME.HOME)
            }}
          >
            Trang chủ
          </p>
          <p
            className='py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-white text-secondaryColor hover:text-primaryColor'
            onClick={async () => {
              await authApi.logOut()
              router.push(PATH_NAME.HOME)
            }}
          >
            Đăng xuất
          </p>
        </div>
      </div>

      <div className='`md:hidden'>
        {isMenuOpen && (
          <div
            className='fixed inset-0 bg-black opacity-30 z-40'
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
        <div className='flex md:hidden h-16 bg-[#E0F2FE] py-2 px-6 w-full z-50 sticky top-0 justify-between items-center'>
          <div className='flex justify-between items-center'>
            <FaBars
              className='text-xl text-black cursor-pointer'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
          {role == 'Admin' && (
            <button className='py-2 px-8 rounded-md text-white font-medium bg-sky-600 h-full'>
              Tạo bài viết mới
            </button>
          )}
        </div>
        <div
          className={`
          fixed left-0 w-full bg-[#E0F2FE] p-6 z-50 flex flex-col gap-2.5 transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'top-0' : 'top-[-100%]'}
          md:hidden
        `}
        >
          <p className='text-title font-semibold text-xl mx-auto'>{role}</p>
          <ul className='flex flex-col gap-2.5'>
            {/* Admin */}
            {role == 'Admin' && (
              <div className='flex flex-col gap-2.5'>
                <li
                  className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 rounded-md
                  ${
                    pathname == ADMIN_PATH_NAME.QUAN_LY_BAI_DANG ||
                    (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG) && pathname !== '/')
                      ? 'bg-white text-primaryColor rounded-md'
                      : 'text-secondaryColor'
                  }
                `}
                >
                  <Link href={ADMIN_PATH_NAME.QUAN_LY_BAI_DANG} className='cursor-pointer'>
                    Quản lý bài đăng
                  </Link>
                </li>
                <li
                  className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 rounded-md
                  ${
                    pathname == ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU ||
                    (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU) && pathname !== '/')
                      ? 'bg-white text-primaryColor rounded-md'
                      : 'text-secondaryColor'
                  }
                `}
                >
                  <Link href={ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU} className='cursor-pointer'>
                    Quản lý tài liệu
                  </Link>
                </li>
              </div>
            )}
            {/* Superuser */}
            {role == 'Superuser' && (
              <li
                className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 rounded-md
                  ${
                    pathname == SUPERUSER_PATH_NAME.CAP_TAI_KHOAN ||
                    (pathname.startsWith(SUPERUSER_PATH_NAME.CAP_TAI_KHOAN) && pathname !== '/')
                      ? 'bg-white text-primaryColor rounded-md'
                      : 'text-secondaryColor'
                  }
                `}
              >
                <Link href={SUPERUSER_PATH_NAME.CAP_TAI_KHOAN} className='cursor-pointer'>
                  Cấp tài khoản
                </Link>
              </li>
            )}
          </ul>
          <p
            className='py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-white text-secondaryColor hover:text-primaryColor'
            onClick={() => {
              router.push(PATH_NAME.HOME)
            }}
          >
            Trang chủ
          </p>
          <p
            className='py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-white text-secondaryColor hover:text-primaryColor'
            onClick={async () => {
              await authApi.logOut()
              router.push(PATH_NAME.HOME)
            }}
          >
            Đăng xuất
          </p>
        </div>
      </div>
    </>
  )
}

export default AdminHeader
