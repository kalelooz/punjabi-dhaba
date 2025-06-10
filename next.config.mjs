/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // This tells Next.js the full "address" for your website on GitHub Pages.
  basePath: '/punjabi-dhaba', 
  assetPrefix: '/punjabi-dhaba/',

  // This tells Next.js it's allowed to load images from these websites.
  images: {
    unoptimized: true, // Required for static export on GitHub pages
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
