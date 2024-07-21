import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

import { authApi } from './apis'
import { ADMIN_PATH_NAME, AUTH_PATH_NAME, PATH_NAME } from './configs'
import { ROLE_TITLE } from './configs'

export default async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const mainPath = '/' + pathName.split('/')[1]
  const mainPathWithoutQuery = mainPath.split('?')[0]

  let token = request.cookies.get('ACCESS_TOKEN')?.value

  const adminPath = Object.values(ADMIN_PATH_NAME)

  async function redirectLoop(token: any) {
    const user = jwtDecode<any>(token)

    if (user.role === ROLE_TITLE.ADMIN && mainPathWithoutQuery === AUTH_PATH_NAME.DANG_NHAP) {
      return NextResponse.redirect(new URL(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG, request.url))
    }

    if (
      user.role === ROLE_TITLE.ADMIN &&
      (adminPath.includes(mainPathWithoutQuery) || adminPath.includes(pathName))
    ) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL(PATH_NAME.HOME, request.url))
    }
  }

  if (!!token) {
    const response = await redirectLoop(token)
    if (response) return response
  } else {
    try {
      await authApi.newAccessToken()
      token = request.cookies.get('ACCESS_TOKEN')?.value
      if (!!token) {
        const response = await redirectLoop(token)
        if (response) return response
      }
    } catch (error) {
      if (mainPathWithoutQuery.startsWith(AUTH_PATH_NAME.DANG_NHAP)) {
        return NextResponse.next()
      }
    }
  }

  return NextResponse.redirect(new URL(PATH_NAME.HOME, request.url))
}

export const config = {
  matcher: ['/admin/:path*', '/dang-nhap'],
}
