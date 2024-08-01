import { POST_CATEGORY } from '@/configs/enum'

export interface SearchPostType {
  id: string
  categorized?: POST_CATEGORY
  title: string
  description: string
  content: string
  img?: string
  date?: Date
  isAuth?: boolean
}

export interface PostReviewType extends SearchPostType {
  isSearchPage?: boolean
}
