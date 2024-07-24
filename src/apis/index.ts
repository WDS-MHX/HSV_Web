export { default as authApi } from './auth'
export { default as adminApi } from './admin'
export { default as documentApi } from './document'
export { default as fileApi } from './file'

export type {
  CreateDocumentDTO as CreateDocumentDTO,
  SearchDTO as SearchDocumentDTO,
  UpdateDocumentDTO as UpdateDocumentDTO,
} from './document'
