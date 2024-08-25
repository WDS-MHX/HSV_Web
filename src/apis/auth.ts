import Admin from '@/models/admin'
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'
import { handleError, httpClient } from '@/services'
import { AUTH_PATH_NAME } from '@/configs'

class AuthApi {
  constructor() {
    // httpClient.createAuthRefreshInterceptor(() => {
    //   this.logOut()
    //   window.location.href = AUTH_PATH_NAME.DANG_NHAP
    // })
  }

  async logIn(email: string, password: string) {
    try {
      const res = await httpClient.post<{ _id: string; role: string }>('/auth/login', {
        email,
        password,
      })
      return { adminId: res._id, role: res.role }
    } catch (error) {
      throw error
    }
  }

  async newAccessToken(config?: object) {
    try {
      return await httpClient.get<{ accessToken: string }>('/auth/new-access-token', config)
    } catch (error) {
      throw error
    }
  }

  async forgotPassword(email: string) {
    try {
      await httpClient.get<{ message: string }>(`/auth/otp-code?email=${email}`)
    } catch (error) {
      handleError(error, (res) => {
        throw new Error(res.data.message)
      })
    }
  }

  async resetPassword(email: string, otpCode: string, newPassword: string) {
    try {
      await httpClient.post<{ message: string }>('/auth/reset-password', {
        email,
        otpCode,
        newPassword,
      })
    } catch (error) {
      handleError(error, (res) => {
        throw new Error(res.data.message)
      })
    }
  }

  async logOut() {
    try {
      await httpClient.get<{ admin: Admin }>('/auth/logout')
    } catch (error) {
      handleError(error, (res) => {
        throw new Error(res.data.message)
      })
    }
  }
}

const authApi = new AuthApi()

export default authApi
