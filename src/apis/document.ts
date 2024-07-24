import { Document } from '@/models'
import { handleError, httpClient } from '@/services'
import { DOCUMENT_PAGE_LIMIT_DEFAULT } from '@/configs'

//DTOs
interface GetDocumentsDTO {
  data: Document[]
  pagination: {
    total: number
    currentPage: number
  }
}

export interface CreateDocumentDTO {
  docJson: string
  file: FileList
}

export interface SearchDTO {
  title: string
  categrory: string
  page: number
  limit: number
}

export interface UpdateDocumentDTO {
  _id: string
  docNumber: number
  reference: string
  title: string
  categrory: string
  mediaFileId: string
  issueDate: Date
}

//API
class DocumentApi {
  async getAllDocuments() {
    try {
      const res = await httpClient.get<GetDocumentsDTO>(`/document/docs`)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async getAllDocumentsUploadedByAdmin() {
    try {
      const res = await httpClient.get<GetDocumentsDTO>(`/document/docs-of-admin`)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async searchDocument(data: SearchDTO) {
    try {
      const res = await httpClient.post<GetDocumentsDTO>(`/document/search`, data)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async createDocument(data: CreateDocumentDTO) {
    console.log('FILENETWORK', data.file[0])
    const formData = new FormData()
    formData.append('docJson', data.docJson)
    formData.append('file', data.file[0])
    try {
      const res = await httpClient.post<Document>('/document/create-doc', formData)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async updateDocument(data: UpdateDocumentDTO) {
    try {
      const res = await httpClient.patch<Document>(`/document/update-doc`, data)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }

  async deleteDocument(id: string) {
    try {
      const res = await httpClient.delete(`/document/delete-doc/${id}`)
      return res
    } catch (error) {
      handleError(error, (res) => {
        throw new res.data.message()
      })
    }
  }
}

const documentApi = new DocumentApi()

export default documentApi
