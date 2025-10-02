/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações básicas do Next.js
  reactStrictMode: true,
  swcMinify: true,
  
  // Configurações para PWA
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
