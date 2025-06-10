/** @type {import('next').NextConfig} */

// This is the correct configuration for hosting on GitHub Pages
// in a repository named 'punjabi-dhaba'.

const nextConfig = {
  output: 'export',
  basePath: '/punjabi-dhaba',
  assetPrefix: '/punjabi-dhaba/',
  images: {
    unoptimized: true, // Necessary for static export on GitHub Pages
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      }
    ],
  },
};

export default nextConfig;
