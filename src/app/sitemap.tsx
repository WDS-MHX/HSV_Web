import postApi from '@/apis/post'
import { Post } from '@/models/post'
import { PATH_NAME } from '@/configs'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3001'

  const staticRoutes = Object.values(PATH_NAME).map((path) => ({
    url: `${clientUrl}${path}`,
    lastModified: new Date().toISOString(),
  }))

  try {
    const response = await postApi.getAllPosts(1, 99999)
    const posts: Post[] = response?.data || []

    const dynamicRoutes = posts.map((post) => ({
      url: `${clientUrl}/bai-viet/${post._id}`,
      lastModified: new Date().toISOString(),
    }))

    const allRoutes = [...staticRoutes, ...dynamicRoutes]

    return allRoutes
  } catch (error) {
    return staticRoutes
  }
}
