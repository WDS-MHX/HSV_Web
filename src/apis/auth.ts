import Admin from '@/models/admin'
import { handleError, httpClient } from '@/services'

class AuthApi {
  async signIn(email: string, password: string) {
    const res = await httpClient.post<{ access_token: string; admin_id: string }>('/auth/sign-in', {
      email,
      password,
    })
    return { accessToken: res.access_token, adminId: res.admin_id }
  }

  async refreshToken() {
    const res = await httpClient.get<{ access_token: string }>('/auth/refresh-token', {
      skipAuthRefresh: true,
    })
    return { accessToken: res.access_token }
  }

  async forgotPassword(email: string) {
    try {
      const res = await httpClient.post<{ message: string }>('/auth/forgot-password', { email })
      return res
    } catch (error) {
      if ((error as any).response.status === 500) {
        console.log('Email không tồn tại')
      }
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async resetPassword(email: string, code: string, new_password: string) {
    try {
      const res = await httpClient.post<{ message: string }>('/auth/reset-password', {
        email,
        code,
        new_password,
      })
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async signOut() {
    try {
      const res = await httpClient.delete<{ admin: Admin }>('/auth/sign-out')
      return res.admin
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }
}

const authApi = new AuthApi()

export default authApi
