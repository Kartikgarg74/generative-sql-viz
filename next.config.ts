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

};

export default nextConfig;
