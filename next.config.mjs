/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
      },
      {
        protocol: 'https',
        hostname: 'hsv-web-fafeefftc5e6fucq.southeastasia-01.azurewebsites.net',
      },
      {
        protocol: 'https',
        hostname: 'hsv-api.lvakhoa.me',
      },
    ],
  },
}

export default nextConfig
