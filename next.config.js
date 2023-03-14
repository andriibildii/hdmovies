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
                hostname: 'hdmovies.vercel.app',
                port: '',
                pathname: '/_next/**',
            },
        ],
    },
};

module.exports = nextConfig;
