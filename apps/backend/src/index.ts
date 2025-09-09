import express from 'express';
import cors from 'cors';
import { checkDatabaseConnection, kx } from './db';

const app = express();
const corsOrigins = process.env.CORS_ORIGINS?.split(',')
  .map((s) => s.trim())
  .filter(Boolean);
app.use(corsOrigins && corsOrigins.length > 0 ? cors({ origin: corsOrigins }) : cors());
app.use(express.json());
const PORT = Number(process.env.PORT);

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

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
