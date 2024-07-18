import axios, { AxiosInstance, AxiosResponse } from 'axios'
import _createAuthRefreshInterceptor, { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'
import { authApi } from '@/apis'

class HttpClient {
  baseUrl: string
  instance: AxiosInstance

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    this.instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    })
  }

  private getUrl(endpoint: string) {
    return `${this.baseUrl}${endpoint}`
  }

  async get<T = any>(endpoint: string, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.get<T>(this.getUrl(endpoint), config)
    return response.data
  }

  async post<T = any>(endpoint: string, data?: object, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.post<T>(this.getUrl(endpoint), data, config)
    return response.data
  }

  async patch<T = any>(endpoint: string, data?: object, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.patch<T>(this.getUrl(endpoint), data, config)
    return response.data
  }

  async delete<T = any>(endpoint: string, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.delete<T>(this.getUrl(endpoint), config)
    return response.data
  }

  setAuthHeader(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  removeAuthHeader() {
    delete this.instance.defaults.headers.common['Authorization']
  }

  createAuthRefreshInterceptor(
    onSuccess?: (accessToken: string) => void,
    onError?: (error: any) => void,
  ) {
    _createAuthRefreshInterceptor(
      this.instance,
      async (failedRequest) => {
        try {
          const { accessToken } = await authApi.refreshToken()
          failedRequest.response.config.headers['Authorization'] = 'Bearer ' + accessToken
          onSuccess?.(accessToken)
          return Promise.resolve()
        } catch (error) {
          onError?.(error)
          return Promise.reject(error)
        }
      },
      {
        pauseInstanceWhileRefreshing: true,
        statusCodes: [401],
      },
    )
  }
}

export function handleError(error: any, onError?: (error: AxiosResponse) => void) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status >= 500 && error.response.status < 600) {
        throw new Error('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
      }

      onError?.(error.response)
    } else {
      throw new Error('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
    }
  } else {
    throw new Error('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
  }
}

const httpClient = new HttpClient()

export default httpClient
