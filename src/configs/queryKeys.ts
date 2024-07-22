export const queryKeys = {
  adminSearchPosts: {
    gen: (
      page: number,
      limit: number,
      searchText: string,
      categories: string[],
      isPosted: boolean,
    ) => ['adminPosts', page, limit, searchText, categories, isPosted],
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
