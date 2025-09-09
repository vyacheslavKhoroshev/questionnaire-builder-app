import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<'unknown' | 'ok' | 'down'>('unknown');
  const [dbStatus, setDbStatus] = useState<'unknown' | 'up' | 'down'>('unknown');
  const [samples, setSamples] = useState<Array<{ id: number; title: string }>>([]);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';
    fetch(`${base}/health`)
      .then((r) => {
        setApiStatus(r.ok ? 'ok' : 'down');
      })
      .catch(() => setApiStatus('down'));

    fetch(`${base}/db/health`)
      .then(async (r) => {
        const json = await r.json().catch(() => ({} as { database?: string }));
        setDbStatus(r.ok && json?.database === 'up' ? 'up' : 'down');
      })
      .catch(() => setDbStatus('down'));

    fetch(`${base}/samples`)
      .then(async (r) => {
        const json = await r.json().catch(() => [] as Array<{ id: number; title: string }>);
        if (Array.isArray(json)) {
          setSamples(json);
        }
      })
      .catch(() => setSamples([]));
  }, []);

  return (
    <div className='app'>
      <h1>Questionnaire builder</h1>
      <p>Test starter React + TypeScript + Vite</p>
      <ul>
        <li>API: {apiStatus}</li>
        <li>Database: {dbStatus}</li>
      </ul>
      <h2>Samples</h2>
      <ul>
        {samples.map((s) => (
          <li key={s.id}>
            {s.id}. {s.title}
          </li>
        ))}
        {samples.length === 0 && <li>No data</li>}
      </ul>
    </div>
  );
};

export { App };
