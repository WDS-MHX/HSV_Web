import { POST_STATUS } from './enum'

export const queryKeys = {
  adminSearchPosts: {
    gen: (
      page: number,
      limit: number,
      searchText: string,
      categories: string[],
      postStatus: POST_STATUS,
    ) => ['adminPosts', page, limit, searchText, categories, postStatus],
  },
  viewerSearchPosts: {
    gen: (page: number, limit: number, searchText: string, categories: string[]) => [
      'viewerSearchPosts',
      page,
      limit,
      searchText,
      categories,
    ],
  },
  allPosts: {
    gen: (categories?: string) => ['allPosts', categories],
  },
  post: {
    gen: (postId: string) => ['post', postId],
  },
}
