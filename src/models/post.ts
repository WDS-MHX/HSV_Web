import { POST_CATEGORY } from '@/configs/enum'
import Admin from './admin'
import { z } from 'zod'

export const postSchema = z.object({
  title: z.string({ required_error: 'Tiêu đề không được để trống' }),
  titleImageId: z.string(),
  description: z.string({ required_error: 'Mô tả không được để trống' }),
  contentImageIds: z.array(z.string()),
  content: z.string({ required_error: 'Nội dung không được để trống' }),
  postedDate: z.date().default(new Date()),
  categrory: z.nativeEnum(POST_CATEGORY).optional(),
})
export type CreatePostDto = z.infer<typeof postSchema>

export const postSchemaTemporary = z.object({
  title: z.string({ required_error: 'Tiêu đề không được để trống' }),
  // titleImageId: z.string(),
  description: z.string({ required_error: 'Mô tả không được để trống' }),
  // contentImageIds: z.array(z.string()),
  content: z.string({ required_error: 'Nội dung không được để trống' }),
  // postedDate: z.date().default(new Date()),
  // categrory: z.nativeEnum(POST_CATEGORY).optional(),
})
export type CreatePostTemporaryDto = z.infer<typeof postSchemaTemporary>

export type UpdatePostDTO = z.infer<typeof postSchema> & {
  _id: string
}

export interface Post {
  _id: string
  title: string
  titleImageId?: string
  description?: string
  contentImageIds?: string[]
  content?: string
  showPost: boolean
  postedDate?: Date
  categrory?: POST_CATEGORY
  creator?: Admin
}
export interface imgContent {
  id: string
  contentId: string
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
