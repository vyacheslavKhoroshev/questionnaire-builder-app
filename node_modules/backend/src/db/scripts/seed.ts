import 'dotenv/config';
import knex, { Knex } from 'knex';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function run(): Promise<void> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const cfg: Knex.Config = {
    client: 'pg',
    connection: process.env.DATABASE_URL as string,
    migrations: {
      directory: path.resolve(__dirname, '../migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, '../seeds'),
    },
  };
  const db = knex(cfg);
  try {
    await db.seed.run();
    console.log('Seeds executed successfully');
  } finally {
    await db.destroy();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
