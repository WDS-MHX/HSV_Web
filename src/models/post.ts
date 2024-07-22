import { POST_CATEGORY } from '@/configs/enum'
import Admin from './admin'

export interface CreatePostDto {
  title: string
  titleImageId: string
  contentImageIds: string[]
  content: string
  postedDate?: Date
  categrory?: POST_CATEGORY
}

export interface UpdatePostDTO {
  _id: string
  title: string
  titleImageId: string
  contentImageIds: string[]
  content: string
  postedDate?: Date
  categrory?: POST_CATEGORY
}

export interface Post {
  _id: string
  title: string
  titleImageId?: string
  contentImageIds?: string[]
  content?: string
  showPost: boolean
  postedDate?: Date
  categrory?: POST_CATEGORY
  creator?: Admin
}

export interface AllPosts {
  data: Post[]
  pagination: {
    total: number
    currentPage: number
  }
}

export interface SearchPostDTO {
  title?: string
  categrories?: string[]
  page: number
  limit: number
}

export interface AdminSearchPostDTO extends Partial<SearchPostDTO> {
  showPost: boolean
}
