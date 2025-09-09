import 'dotenv/config';
import type { Knex } from 'knex';
import { config as baseConfig } from './src/libs/modules/config/config';

const connection = baseConfig.ENV.DB.URL;

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
