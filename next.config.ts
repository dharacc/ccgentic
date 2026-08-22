import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "project-in-progress.com",
        pathname: "/wp-ccgentic/**",
      },
    ],
  },
};

export default nextConfig;
