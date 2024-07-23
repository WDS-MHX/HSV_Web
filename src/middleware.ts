import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

import { authApi } from './apis'
import { ADMIN_PATH_NAME, AUTH_PATH_NAME, PATH_NAME } from './configs'
import { ROLE_TITLE } from './configs'
import SUPERUSER_PATH_NAME from './configs/pathName/superuserPathName'

export default async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const mainPath = '/' + pathName.split('/')[1]
  const mainPathWithoutQuery = mainPath.split('?')[0]

  let token = request.cookies.get('ACCESS_TOKEN')?.value

  const adminPath = Object.values(ADMIN_PATH_NAME)
  const superuserPath = Object.values(SUPERUSER_PATH_NAME)

  async function redirectLoop(token: any) {
    const user = jwtDecode<{ id: string; role: string; isBlocked: boolean }>(token)

    console.log(pathName)

    if (user.role === ROLE_TITLE.ASSISTANT && pathName === '/admin/redirect') {
      return NextResponse.redirect(new URL(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG, request.url))
    }

    if (user.role === ROLE_TITLE.MAIN && pathName === '/admin/redirect') {
      return NextResponse.redirect(new URL(SUPERUSER_PATH_NAME.CAP_TAI_KHOAN, request.url))
    }

    if (user.role === ROLE_TITLE.ASSISTANT && mainPathWithoutQuery === AUTH_PATH_NAME.DANG_NHAP) {
      return NextResponse.redirect(new URL(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG, request.url))
    }

    if (user.role === ROLE_TITLE.MAIN && mainPathWithoutQuery === AUTH_PATH_NAME.DANG_NHAP) {
      return NextResponse.redirect(new URL(SUPERUSER_PATH_NAME.CAP_TAI_KHOAN, request.url))
    }

    if (
      (user.role === ROLE_TITLE.ASSISTANT || user.role === ROLE_TITLE.MAIN) &&
      (adminPath.includes(mainPathWithoutQuery) || adminPath.includes(pathName))
    ) {
      return NextResponse.next()
    } else if (
      user.role === ROLE_TITLE.MAIN &&
      (superuserPath.includes(mainPathWithoutQuery) || superuserPath.includes(pathName))
    ) {
      return NextResponse.next()
    } else {
      if (mainPathWithoutQuery.startsWith(AUTH_PATH_NAME.DANG_NHAP)) {
        return NextResponse.next()
      } else return NextResponse.redirect(new URL(AUTH_PATH_NAME.DANG_NHAP, request.url))
    }
  }

  if (!!token) {
    const response = await redirectLoop(token)
    if (response) return response
  } else {
    try {
      const { accessToken: token } = await authApi.newAccessToken({
        headers: { Cookie: cookies().toString() },
      })

      if (!!token) {
        const response = await redirectLoop(token)
        if (response) return response
      } else if (mainPathWithoutQuery.startsWith(AUTH_PATH_NAME.DANG_NHAP)) {
        return NextResponse.next()
      }
    } catch (error) {
      // console.log(error)

      if (mainPathWithoutQuery.startsWith(AUTH_PATH_NAME.DANG_NHAP)) {
        return NextResponse.next()
      }
    }
  }

  return NextResponse.redirect(new URL(AUTH_PATH_NAME.DANG_NHAP, request.url))
}

export const config = {
  matcher: ['/admin/:path*', '/dang-nhap', '/superuser/:path*'],
}
