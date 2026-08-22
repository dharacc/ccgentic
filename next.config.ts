import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "project-in-progress.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.project-in-progress.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mistyrose-mule-659662.hostingersite.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
