import { handleError, httpClient } from '@/services'
import axios from 'axios'

class FileApi {
  async downloadFile(id: string) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${id}`, {
        responseType: 'blob',
        withCredentials: true,
      })
      const fileName =
        res.headers['content-disposition']?.replace('attachment; filename=', '') ?? ''

      const url = window.URL.createObjectURL(res.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new Error('Đã có lỗi xảy ra, vui lòng thử lại sau')
      })
    }
  }
  async uploadImage(file: FileList) {
    try {
      const formData = new FormData()
      formData.append('image', file[0])
      const res = await httpClient.post<string>(`/file/upload-image`, formData)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }
  async removeImage(id: string) {
    try {
      await httpClient.delete(`/file/remove-image/${id}`)
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }
}

const fileApi = new FileApi()

export default fileApi
