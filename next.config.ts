import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = [
      ...(config.externals || []),
      "knex",
      "better-sqlite3",
      "pg",
      "oracledb",
      "tedious",
      "sqlite3"
    ];
    return config;
  },
};

export default nextConfig;
