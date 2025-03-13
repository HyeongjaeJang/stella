import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2", 
    connection: {
      host: "localhost",
      user: "root",
      password: "admin",
      database: "stella",
      port: 3306,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    useNullAsDefault: true,
  },
};

export default config;
