import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_PATH_NAME, AUTH_PATH_NAME, PATH_NAME } from './configs'
import { jwtDecode } from 'jwt-decode'
import { ROLE_TITLE } from './configs'

export default function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const mainPath = '/' + pathName.split('/')[1]
  const mainPathWithoutQuery = mainPath.split('?')[0]
  const token = request.cookies.get('ACCESS_TOKEN')?.value

  const authPaths = Object.values(AUTH_PATH_NAME)
  const adminPath = Object.values(ADMIN_PATH_NAME)
  const publicPaths = Object.values(PATH_NAME)

  if (!!token) {
    if (mainPathWithoutQuery === AUTH_PATH_NAME.DANG_NHAP)
      return NextResponse.redirect(new URL(ADMIN_PATH_NAME.QUAN_LY_BAI_DANG, request.url))

    const user = jwtDecode<any>(token)
    if (
      user.role === ROLE_TITLE.ADMIN &&
      (adminPath.includes(mainPathWithoutQuery) || adminPath.includes(pathName))
    )
      return NextResponse.next()
    else return NextResponse.redirect(new URL(AUTH_PATH_NAME.DANG_NHAP, request.url))
  } else {
    if (mainPathWithoutQuery.startsWith(AUTH_PATH_NAME.DANG_NHAP)) return NextResponse.next()
  }

  return NextResponse.redirect(new URL(PATH_NAME.HOME, request.url))
}

export const config = {
  matcher: ['/admin/:path*', '/dang-nhap'],
}
