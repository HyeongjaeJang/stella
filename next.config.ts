import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = [...(config.externals || []), "knex", "mysql"];
    return config;
  },
};

export default nextConfig;
