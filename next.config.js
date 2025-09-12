/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
          domains: ['res.cloudinary.com',"images.unsplash.com"], // Allow images from Cloudinary
     },
      eslint: {
    // ✅ ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
