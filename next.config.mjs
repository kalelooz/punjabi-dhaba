/** @type {import('next').NextConfig} */

// This is a simplified configuration for hosting on Vercel.
// We have removed the 'output', 'basePath', and 'assetPrefix' options,
// as Vercel handles this automatically.

const nextConfig = {
  // We can also remove 'unoptimized: true' to let Vercel handle
  // its powerful, free image optimization.
  images: {
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
