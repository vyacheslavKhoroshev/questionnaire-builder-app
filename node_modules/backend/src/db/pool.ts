import pg from 'pg';
import { config } from '../libs/modules/config/config';

const { Pool } = pg;

const { URL, POOL_MIN, POOL_MAX } = config.ENV.DB;

export const dbPool = new Pool({
  connectionString: URL,
  min: POOL_MIN,
  max: POOL_MAX,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});
