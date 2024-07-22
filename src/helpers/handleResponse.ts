import { handleError } from '@/services'

export const handleResponse = async <T = any>(
  request: () => Promise<T>,
): Promise<T | undefined> => {
  try {
    const data = await request()
    return data
  } catch (error) {
    handleError(error, (res) => {
      throw new res.data.message()
    })
  }
}
