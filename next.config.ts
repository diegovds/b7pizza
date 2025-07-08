import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/**`)],
  },
  eslint: {
    // Ignora erros do ESLint ao fazer build
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
