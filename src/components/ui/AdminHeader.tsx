'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { authApi } from '@/apis'
import { httpClient } from '@/services'
import { AUTH_PATH_NAME } from '@/configs'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { ADMIN_PATH_NAME, PATH_NAME } from '@/configs'
import SUPERUSER_PATH_NAME from '@/configs/pathName/superuserPathName'

const AdminHeader = ({ role }: { role: String }) => {
  useEffect(() => {
    httpClient.createAuthRefreshInterceptor(() => {
      authApi.logOut()
      window.location.href = AUTH_PATH_NAME.DANG_NHAP
    })
  }, [])

  const { mutate: logOut } = useMutation({
    mutationFn: () => authApi.logOut(),
    onSuccess: () => {
      window.location.href = '/'
    },
    onError: () => {
      toast.error('Đã xảy ra lỗi, thử lại sau')
    },
  })

  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className='shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] max-md:hidden md:flex lg:hidden h-16 bg-sky-600 rounded-b-2xl py-2 px-6 w-full z-50 sticky top-0 justify-between items-center'>
        <div className='flex gap-16 items-center'>
          <p className='text-white font-semibold text-xl'>{role}</p>
          <ul className='flex gap-2.5'>
            {/* Admin */}
            {role == 'Admin' && (
              <div className='flex gap-2.5'>
                <Link href={ADMIN_PATH_NAME.QUAN_LY_BAI_DANG} className='cursor-pointer'>
                  <li
                    className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 hover:text-primaryColor rounded-md
                ${
                  pathname == ADMIN_PATH_NAME.QUAN_LY_BAI_DANG ||
                  (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG) && pathname !== '/')
                    ? 'bg-white text-primaryColor rounded-md'
                    : 'text-slate-50'
                }
              `}
                  >
                    Quản lý bài đăng
                  </li>
                </Link>
                <Link href={ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU} className='cursor-pointer'>
                  <li
                    className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 hover:text-primaryColor rounded-md
                ${
                  pathname == ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU ||
                  (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU) && pathname !== '/')
                    ? 'bg-white text-primaryColor rounded-md'
                    : 'text-slate-50'
                }
              `}
                  >
                    Quản lý tài liệu
                  </li>
                </Link>
              </div>
            )}
            {/* Superuser */}
            {role == 'Superuser' && (
              <>
                <Link href={SUPERUSER_PATH_NAME.CAP_TAI_KHOAN} className='cursor-pointer'>
                  <li
                    className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 hover:text-primaryColor rounded-md
                  ${
                    pathname == SUPERUSER_PATH_NAME.CAP_TAI_KHOAN ||
                    (pathname.startsWith(SUPERUSER_PATH_NAME.CAP_TAI_KHOAN) && pathname !== '/')
                      ? 'bg-white text-primaryColor rounded-md'
                      : 'text-slate-50'
                  }
                `}
                  >
                    Cấp tài khoản
                  </li>
                </Link>
                <Link href={SUPERUSER_PATH_NAME.THONG_TIN_WEBSITE} className='cursor-pointer'>
                  <li
                    className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 hover:text-primaryColor rounded-md
                  ${
                    pathname == SUPERUSER_PATH_NAME.THONG_TIN_WEBSITE ||
                    (pathname.startsWith(SUPERUSER_PATH_NAME.THONG_TIN_WEBSITE) && pathname !== '/')
                      ? 'bg-white text-primaryColor rounded-md'
                      : 'text-slate-50'
                  }
                `}
                  >
                    Thông tin web
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
        <div className='flex gap-2.5'>
          <p
            className='py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-white text-slate-50 hover:text-primaryColor'
            onClick={() => {
              window.location.href = '/'
            }}
          >
            Trang chủ
          </p>
          <p
            className='py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-white text-slate-50 hover:text-primaryColor'
            onClick={() => logOut()}
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
        <div className='flex md:hidden h-16 bg-sky-600 rounded-b-2xl py-2 px-6 w-full z-50 sticky top-0 justify-between items-center'>
          <div className='flex justify-between items-center'>
            <FaBars
              className='text-xl text-white cursor-pointer'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
        <div
          className={`
          fixed left-0 w-full bg-sky-600 p-6 z-50 flex flex-col gap-2.5 transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'top-0' : 'top-[-100%]'}
          md:hidden
        `}
        >
          <p className='text-white font-semibold text-xl mx-auto'>{role}</p>
          <ul className='flex flex-col gap-2.5'>
            {/* Admin */}
            {role == 'Admin' && (
              <div className='flex flex-col gap-2.5'>
                <Link href={ADMIN_PATH_NAME.QUAN_LY_BAI_DANG} className='cursor-pointer'>
                  <li
                    className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 hover:text-primaryColor rounded-md
                  ${
                    pathname == ADMIN_PATH_NAME.QUAN_LY_BAI_DANG ||
                    (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG) && pathname !== '/')
                      ? 'bg-white text-primaryColor rounded-md'
                      : 'text-slate-50'
                  }
                `}
                  >
                    Quản lý bài đăng
                  </li>
                </Link>
                <Link href={ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU} className='cursor-pointer'>
                  <li
                    className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 hover:text-primaryColor rounded-md
                  ${
                    pathname == ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU ||
                    (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU) && pathname !== '/')
                      ? 'bg-white text-primaryColor rounded-md'
                      : 'text-slate-50'
                  }
                `}
                  >
                    Quản lý tài liệu
                  </li>
                </Link>
              </div>
            )}
            {/* Superuser */}
            {role == 'Superuser' && (
              <>
                <Link href={SUPERUSER_PATH_NAME.CAP_TAI_KHOAN} className='cursor-pointer'>
                  <li
                    className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:text-primaryColor hover:bg-slate-100 rounded-md
                    ${
                      pathname == SUPERUSER_PATH_NAME.CAP_TAI_KHOAN ||
                      (pathname.startsWith(SUPERUSER_PATH_NAME.CAP_TAI_KHOAN) && pathname !== '/')
                        ? 'bg-white text-primaryColor rounded-md'
                        : 'text-slate-50'
                    }
                  `}
                  >
                    Cấp tài khoản
                  </li>
                </Link>
                <Link href={SUPERUSER_PATH_NAME.THONG_TIN_WEBSITE} className='cursor-pointer'>
                  <li
                    className={` py-2 px-4 transition-colors duration-300 hover:font-medium hover:bg-slate-100 hover:text-primaryColor rounded-md
                    ${
                      pathname == SUPERUSER_PATH_NAME.THONG_TIN_WEBSITE ||
                      (pathname.startsWith(SUPERUSER_PATH_NAME.THONG_TIN_WEBSITE) &&
                        pathname !== '/')
                        ? 'bg-white text-primaryColor rounded-md'
                        : 'text-slate-50'
                    }
                  `}
                  >
                    Thông tin web
                  </li>
                </Link>
              </>
            )}
          </ul>
          <p
            className='py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-white text-slate-50 hover:text-primaryColor'
            onClick={() => {
              window.location.href = '/'
            }}
          >
            Trang chủ
          </p>
          <p
            className='py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-white text-slate-50 hover:text-primaryColor'
            onClick={() => logOut()}
          >
            Đăng xuất
          </p>
        </div>
      </div>
    </>
  )
}

export default AdminHeader
