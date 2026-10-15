import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages render plain <img> tags with imported asset URLs, so Next's image optimizer is not used
  images: { unoptimized: true },
};

export default nextConfig;
