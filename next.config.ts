import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This will completely skip ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This will skip TypeScript type checking during builds
    ignoreBuildErrors: true,
  },
  // Disable static page generation errors
  experimental: {
    // Disable strict mode for faster builds
    strictMode: false,
  },
};

export default nextConfig;
