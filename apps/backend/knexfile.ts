import 'dotenv/config';
import type { Knex } from 'knex';

const connection = process.env.DATABASE_URL ?? '';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection,
    migrations: {
      directory: './src/db/migrations',
      loadExtensions: ['.ts'],
    },
    seeds: {
      directory: './src/db/seeds',
      loadExtensions: ['.ts'],
    },
  },
};

export default config;
