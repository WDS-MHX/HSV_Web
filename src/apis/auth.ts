import Admin from '@/models/admin'
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'
import { handleError, httpClient } from '@/services'

class AuthApi {
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

  async newAccessToken(config?: AxiosAuthRefreshRequestConfig) {
    try {
      await httpClient.get<{ access_token: string }>('/auth/new-access-token', config)
    } catch (error) {
      throw error
    }
  }

  async forgotPassword(email: string) {
    try {
      await httpClient.get<{ message: string }>(`/auth/otp-code?email=${email}`)
    } catch (error) {
      if ((error as any).response.status === 500) {
        console.log('Email không tồn tại')
      }
      handleError(error, (res) => {
        throw new res.data.message()
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
        throw new res.data.message()
      })
    }
  }

  async logOut() {
    try {
      await httpClient.get<{ admin: Admin }>('/auth/logout')
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }
}

const authApi = new AuthApi()

export default authApi
