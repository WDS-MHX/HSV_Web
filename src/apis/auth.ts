import Admin from '@/models/admin'
import { handleError, httpClient } from '@/services'

class AuthApi {
  async logIn(email: string, password: string) {
    const res = await httpClient.post<{ _id: string; role: string }>('/auth/login', {
      email,
      password,
    })
    return { adminId: res._id, role: res.role }
  }

  async newAccessToken() {
    const res = await httpClient.get<{ access_token: string }>('/auth/new-access-token', {
      skipAuthRefresh: true,
    })
    return { accessToken: res.access_token }
  }

  async forgotPassword() {
    try {
      const res = await httpClient.get<{ message: string }>('/auth/otp-code')
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

  async resetPassword(email: string, otpCode: string, newPassword: string) {
    try {
      const res = await httpClient.post<{ message: string }>('/auth/reset-password', {
        email,
        otpCode,
        newPassword,
      })
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async logOut() {
    try {
      const res = await httpClient.get<{ admin: Admin }>('/auth/logout')
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
