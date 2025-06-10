/** @type {import('next').NextConfig} */

// This file configures the "address" for your website on GitHub Pages.

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  // Trim preceding slash since NEXT_PUBLIC_BASE_PATH starts with a slash
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}


const nextConfig = {
  output: 'export',
  // This tells Next.js the full "address" for your website on GitHub Pages.
  basePath: basePath, 
  assetPrefix: assetPrefix,

  // This tells Next.js it's allowed to load images from these websites
  // and disables its default image optimization, which is required for GitHub Pages.
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
