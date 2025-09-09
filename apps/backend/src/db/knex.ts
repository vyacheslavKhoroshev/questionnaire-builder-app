import knex, { Knex } from 'knex';
import { config } from '../libs/modules/config/config';

export const kx: Knex = knex({
  client: 'pg',
  connection: config.ENV.DB.URL,
});
