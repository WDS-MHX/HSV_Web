export { default as authApi } from './auth'
export { default as adminApi } from './admin'
export { default as documentApi } from './document'

//export DTOs
export type {
    CreateDocumentDTO as CreateDocumentDTO,
    SearchDTO as SearchDTO,
    UpdateDocumentDTO as UpdateDocumentDTO
} from './document'