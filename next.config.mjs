import nextPwa from "next-pwa"

/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
      images: {
            domains: ["image.kalbelajobs.com", "lh3.googleusercontent.com", "d2vyhi5ouo1we3.cloudfront.net", "i.ibb.co", "kalbelajobs.com", "yt3.googleusercontent.com", "img.freepik.com"],
      },
      env: {
            NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
      },
      eslint: {
            ignoreDuringBuilds: true,
      },
}

// Wrap nextConfig with nextPwa
export default nextPwa({
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === "development",
      mode: "production",
})(nextConfig)
