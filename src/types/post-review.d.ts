import { POST_CATEGORY } from '@/configs/enum'

export interface PostReviewType {
  id: string
  categorized?: POST_CATEGORY
  title: string
  content: string
  img?: string
  date?: Date
  isSearchPage?: boolean
}
