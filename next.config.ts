import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.externals = [...(config.externals || []), "knex", "mysql"];
    return config;
  },
};

export default nextConfig;
