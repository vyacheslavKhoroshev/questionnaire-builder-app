import knex, { Knex } from 'knex';
import { config } from '../libs/modules/config/config.js';

export const kx: Knex = knex({
  client: 'pg',
  connection: config.ENV.DB.URL,
});
