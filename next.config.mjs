import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: config => {
    config.resolve.alias = Object.assign(config.resolve.alias || {}, {
      '@': path.resolve('./src'),
    });
    return config;
  },
};

export default nextConfig;
