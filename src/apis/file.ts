import { handleError, httpClient } from '@/services'

class FileApi {
  async downloadFile(id: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/download/${id}`, {
        method: 'GET',
      })

      let fileName = 'downloaded-file'
      const blob = await res.blob()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }
}

const fileApi = new FileApi()

export default fileApi
