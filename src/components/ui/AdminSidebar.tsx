'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { authApi } from '@/apis'
import { ADMIN_PATH_NAME, PATH_NAME } from '@/configs'
import SUPERUSER_PATH_NAME from '@/configs/pathName/superuserPathName'

const AdminSidebar = ({ role }: { role: String }) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='flex h-[100vh] flex-col bg-[#E0F2FE] py-8 px-4 w-60 justify-between sticky top-0 max-lg:hidden'>
      <div>
        <p className='text-title items-center justify-center flex w-full font-semibold text-xl'>
          {role}
        </p>
        <ul className='mt-16'>
          {role == 'Admin' && (
            <div>
              <li
                className={
                  pathname == ADMIN_PATH_NAME.QUAN_LY_BAI_DANG ||
                  (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG) && pathname !== '/')
                    ? 'bg-white text-primaryColor rounded-md'
                    : 'text-secondaryColor'
                }
              >
                <Link
                  href={ADMIN_PATH_NAME.QUAN_LY_BAI_DANG}
                  className='block py-2.5 px-4 cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-slate-100'
                >
                  Quản lý bài đăng
                </Link>
              </li>
              <li
                className={
                  pathname == ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU ||
                  (pathname.startsWith(ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU) && pathname !== '/')
                    ? 'bg-white text-primaryColor rounded-md'
                    : 'text-secondaryColor'
                }
              >
                <Link
                  href={ADMIN_PATH_NAME.QUAN_LY_TAI_LIEU}
                  className='mt-1.5 block py-2.5 px-4 cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-slate-100'
                >
                  Quản lý tài liệu
                </Link>
              </li>
            </div>
          )}
          {/* superuser */}
          {role == 'Superuser' && (
            <li
              className={
                pathname == SUPERUSER_PATH_NAME.CAP_TAI_KHOAN ||
                (pathname.startsWith(SUPERUSER_PATH_NAME.CAP_TAI_KHOAN) && pathname !== '/')
                  ? 'bg-white text-primaryColor rounded-md'
                  : 'text-secondaryColor'
              }
            >
              <Link
                href={SUPERUSER_PATH_NAME.CAP_TAI_KHOAN}
                className='mt-1.5 block py-2.5 px-4 cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-slate-100'
              >
                Cấp tài khoản
              </Link>
            </li>
          )}
        </ul>
      </div>
      <p
        className=' py-2.5 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:font-medium hover:bg-white text-secondary hover:text-primary'
        onClick={() => {
          authApi.logOut()
          router.push(PATH_NAME.HOME)
        }}
      >
        Đăng xuất
      </p>
    </div>
  )
}

export default AdminSidebar
