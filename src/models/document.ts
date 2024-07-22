export default interface documentType {
  id: number
  releaseDate: string
  title: string
}

export default interface Document {
  _id: string
  docNumber: number
  title: string
  categrory: string
  mediaFileId: string
  issueDate: string
}
