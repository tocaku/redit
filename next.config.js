/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com', "github.com", "media.stickerswiki.app"],
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
