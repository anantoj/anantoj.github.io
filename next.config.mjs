/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: "/anantoj.github.io",
  trailingSlash: true, // Add this line
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig