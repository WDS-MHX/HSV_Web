/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // protocol: 'http',
        hostname: 'hsv-web-fafeefftc5e6fucq.southeastasia-01.azurewebsites.net',
        // hostname: 'localhost',
        // port: '8080',
      },
      {
        protocol: 'https',
        hostname: 'hsv-web-fafeefftc5e6fucq.southeastasia-01.azurewebsites.net',
      },
    ],
  },
}

export default nextConfig
