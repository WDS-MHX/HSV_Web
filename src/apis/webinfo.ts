import { handleError, httpClient } from '@/services'

export interface updateImgWebinfoDTO {
  webInfoJson: string
  image: File
}

export interface updateWebinfoDTO {
  webInfoJson: string
}

class WebInfoApi {
  async getAllWebInfo() {
    try {
      const res = await httpClient.get(`/webinfo/all`)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new Error(res.data.message)
      })
    }
  }

  async getWebInfoByType(type: string) {
    try {
      const res = await httpClient.get(`/webinfo/type/${type}`)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new Error(res.data.message)
      })
    }
  }

  async updateImgWebinfo(data: updateImgWebinfoDTO) {
    try {
      const formData = new FormData()
      formData.append('webInfoJson', data.webInfoJson)
      formData.append('image', data.image)
      const res = await httpClient.post(`/webinfo/update-webinfo`, formData)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new Error(res.data.message)
      })
    }
  }

  async updateWebInfo(data: updateWebinfoDTO) {
    try {
      const res = await httpClient.post(`/webinfo/update-webinfo`, data)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new Error(res.data.message)
      })
    }
  }
}

const webInfoApi = new WebInfoApi()

export default webInfoApi
