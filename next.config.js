/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
          domains: ['res.cloudinary.com',"images.unsplash.com"], // Allow images from Cloudinary
     },
      eslint: {
    // ✅ ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  // Ensure caches key markdown vs HTML variants (acceptmarkdown.com).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Vary",
            value: "Accept, Accept-Encoding",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
