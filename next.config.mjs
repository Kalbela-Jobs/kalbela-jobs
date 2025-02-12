/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,

      images: {
            remotePatterns: [
                  {
                        protocol: 'https',
                        hostname: 'i.ibb.co.com',
                        port: '',
                        pathname: '/**',
                  },
                  {
                        protocol: 'https',
                        hostname: 'image.kalbelajobs.com',
                        port: '',
                        pathname: '/api/v1/image/**',
                  },
                  {
                        protocol: 'https',
                        hostname: 'lh3.googleusercontent.com',
                        port: '',
                        pathname: '/**',
                  },


            ],
      },
      env: {
            NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
      },
      eslint: {
            ignoreDuringBuilds: true,
      },
}

export default nextConfig
