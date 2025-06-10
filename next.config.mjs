/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // The basePath and assetPrefix are only needed if you are hosting
  // in a subdirectory on GitHub Pages (e.g., username.github.io/punjabi-dhaba)
  // If you are using a custom domain, you can remove these.
  basePath: '/punjabi-dhaba', 
  assetPrefix: '/punjabi-dhaba/',
  images: {
    // This allows Next.js to optimize images from these domains.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '**',
      }
    ],
  },
};

export default nextConfig;
