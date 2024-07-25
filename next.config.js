/** @type {import('next').NextConfig} */

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
/* ...Your other config rules */
}

module.exports = nextConfig