import express from 'express';
import path from 'node:path';
import cors from 'cors';
import { checkDatabaseConnection, kx } from './db';
import { config } from './libs/modules/config/config';

const app = express();
const corsOriginsRaw = config.ENV.APP.CORS_ORIGINS ?? '';
const corsOrigins = corsOriginsRaw
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
app.use(corsOrigins.length > 0 ? cors({ origin: corsOrigins }) : cors());
app.use(express.json());
const PORT = Number(config.ENV.APP.PORT);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/db/health', async (_req, res) => {
  const ok = await checkDatabaseConnection();
  res.status(ok ? 200 : 503).json({ database: ok ? 'up' : 'down' });
});

app.get('/samples', async (_req, res) => {
  try {
    const rows = await kx.select({ id: 'id', title: 'title' }).from('samples').orderBy('id', 'asc');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load samples' });
  }
});
const frontendDist = path.resolve(process.cwd(), 'apps/frontend/dist');
app.use(express.static(frontendDist));

app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

async function bootstrap(): Promise<void> {
  try {
    await kx.migrate.latest();
    if (process.env.RUN_SEEDS === 'true') {
      await kx.seed.run();
    }
  } catch (err) {
    console.error('Migration/seed failed:', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
