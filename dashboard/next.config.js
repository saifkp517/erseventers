/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    productionBrowserSourceMaps: false, // Disable source maps in development
    optimizeFonts: false, // Disable font optimization
    images: {
        domains: [
            'images.unsplash.com',
            'localhost',
            'erseventers.in'
        ]
    },
    env: {
        HOST: process.env.HOST
    }
}

module.exports = nextConfig
