/** @type {import('next').NextConfig} */

// This configuration is for hosting on GitHub Pages.
// The basePath and assetPrefix are set to match the repository name.

const nextConfig = {
  output: 'export', // <-- Necessary for static export
  basePath: '/punjabi-dhaba', // <-- Updated to the correct repository name
  assetPrefix: '/punjabi-dhaba/', // <-- Updated to the correct repository name
  
  // unoptimized: true is required for static exports (next export) to work correctly with next/image.
  images: {
    unoptimized: true,
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
