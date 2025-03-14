import { handleResponse } from '@/helpers'
import Admin from '@/models/admin'
import {
  AdminSearchPostDTO,
  AllPosts,
  CreatePostDto,
  Post,
  SearchPostDTO,
  UpdatePostDTO,
} from '@/models/post'
import { handleError, httpClient } from '@/services'

interface CreatePostWithImg {
  postJson: CreatePostDto
  titleImage: File
}

interface UpdatePostWithImg {
  postJson: UpdatePostDTO
  titleImage: File | null
}

class PostApi {
  async createPost(data: CreatePostWithImg) {
    const formData = new FormData()
    formData.append('postJson', JSON.stringify(data.postJson))
    formData.append('titleImage', data.titleImage)
    const res = await handleResponse<Post>(() => httpClient.post<Post>('/post/new-post', formData))
    return res
  }

  async updatePost(data: UpdatePostWithImg) {
    const formData = new FormData()
    formData.append('postJson', JSON.stringify(data.postJson))
    if (data.titleImage !== null) formData.append('titleImage', data.titleImage)
    const res = await handleResponse<Post>(() =>
      httpClient.put<Post>('/post/update-post', formData),
    )
    return res
  }

  async updateShowPost(postId: string, showPost: boolean) {
    await handleResponse<Post>(() =>
      httpClient.get<Post>(`/post/update-showpost/${postId}?showPost=${showPost}`),
    )
  }

  async getAllPosts(page: number, limit: number) {
    const res = await handleResponse<AllPosts>(() =>
      httpClient.get<AllPosts>(`/post/posts?page=${page}&limit=${limit}`),
    )
    return res
  }

  async getPostById(postId: string) {
    const res = await handleResponse<Post>(() => httpClient.get<Post>(`/post/id/${postId}`))
    return res
  }

  async getAllPostsByCategory(page: number, limit: number, category: string) {
    const res = await handleResponse<AllPosts>(() =>
      httpClient.get<AllPosts>(`/post/categrory/${category}?page=${page}&limit=${limit}`),
    )
    return res
  }

  async searchPosts(body: SearchPostDTO) {
    const res = await handleResponse<AllPosts>(() =>
      httpClient.post<AllPosts>('/post/search', body),
    )
    return res
  }

  async searchPostsForAdmin(body: AdminSearchPostDTO) {
    const res = await handleResponse<AllPosts>(() =>
      httpClient.post<AllPosts>('/post/search-for-admin', body),
    )
    return res
  }

  async deletePost(postId: string) {
    await handleResponse(() => httpClient.delete(`/post/delete-post/${postId}`))
  }
}

const postApi = new PostApi()

export default postApi
