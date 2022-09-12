/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
        "links.papareact.com",
        "platform-lookaside.fbsbx.com",
        "firebasestorage.googleapis.com",
        "avatars.githubusercontent.com"
    ]
  }
}

module.exports = nextConfig
