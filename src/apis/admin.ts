import { Admin } from '@/models'
import { handleError, httpClient } from '@/services'

interface createAdminDto {
  email: string
  password: string
  name: string
  phoneNumber: string
}

interface updateAdminDto {
  name: string
  phoneNumber: string
}

interface blockAccountDto {
  _id: string
  isBlocked: boolean
}

interface uploadAvatartDto {
  file: File
}

class AdminApi {
  async createAdmin(data: createAdminDto) {
    try {
      const res = await httpClient.post<Admin>('/admin/new-admin', data)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async updateAdmin(data: updateAdminDto) {
    try {
      const res = await httpClient.post<Admin>(`/admin/update-admin`, data)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async blockAccount(_id: string, isBlocked: boolean) {
    try {
      const res = await httpClient.post<blockAccountDto>(`/admin/block-account`, {
        _id,
        isBlocked,
      })
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async uploadAvatar(file: File) {
    let avatar = new FormData()
    avatar.append('avatar', file)
    try {
      const res = await httpClient.post<uploadAvatartDto>(`/admin/upload-avatar`, avatar)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async getAdmin(adminId: string) {
    try {
      const res = await httpClient.get<Admin>(`/admin/info/${adminId}`)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }
}

const adminApi = new AdminApi()

export default adminApi
