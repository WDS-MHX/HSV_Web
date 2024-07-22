import { Document } from "@/models"
import { handleError, httpClient } from '@/services'
import { DOCUMENT_LIMIT_DEFAULT } from "@/configs"


//DTOs
interface GetDocumentsDTO {
    data: Document[]
    pagination: {
        total: number
        currentPage: number
    }
}

export interface CreateDocumentDTO {
    docNumber: number
    reference: string
    title: string
    categrory: string
    mediaFileId: string
    issueDate: Date
}

export interface SearchDTO {
    title: string
    category: string
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
    async getAllDocument(page: number, limit: number = DOCUMENT_LIMIT_DEFAULT) {
        try {
            const res = await httpClient.get<GetDocumentsDTO>(`/document/docs?page=${page}&limit=${limit}`)
            return res
        } catch (error) {
            handleError(error, (res) => {
                throw new res.data.message()
            })
        }
    }

    async getAllDocumentUploadedByAdmin(page: number, limit: number = DOCUMENT_LIMIT_DEFAULT) {
        try {
            const res = await httpClient.get<GetDocumentsDTO>(`/document/docs-of-admin?page=${page}&limit=${limit}`)
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
        try {
            const res = await httpClient.post<Document>('/document/create-doc', data)
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