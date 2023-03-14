/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['m.media-amazon.com', 'images.rawpixel.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.rawpixel.com',
            },
        ],
    },
};

module.exports = nextConfig;
