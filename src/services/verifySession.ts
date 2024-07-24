import { authApi } from '@/apis'
import { AUTH_PATH_NAME } from '@/configs'
import { ROLE_TITLE } from '@/configs/enum'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function verifySession() {
  let token = cookies().get('ACCESS_TOKEN')?.value

  if (!token) {
    try {
      await authApi.newAccessToken()
      token = cookies().get('ACCESS_TOKEN')?.value
      if (!!token) {
        const user = jwtDecode<{ id: string; role: ROLE_TITLE; isBlocked: boolean }>(token)
        return { isAuth: true, role: user.role }
      } else {
        return { isAuth: false, role: 'undefine' }
      }
    } catch (error) {
      return { isAuth: false, role: 'undefine' }
    }
  }
  const user = jwtDecode<{ id: string; role: ROLE_TITLE; isBlocked: boolean }>(token)

  return { isAuth: true, role: user.role }
}
