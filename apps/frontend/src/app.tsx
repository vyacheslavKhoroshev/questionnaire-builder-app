import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<'unknown' | 'ok' | 'down'>('unknown');
  const [dbStatus, setDbStatus] = useState<'unknown' | 'up' | 'down'>('unknown');

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
  }, []);

  return (
    <div className='app'>
      <h1>Questionnaire builder</h1>
      <p>Test starter React + TypeScript + Vite</p>
      <ul>
        <li>API: {apiStatus}</li>
        <li>Database: {dbStatus}</li>
      </ul>
    </div>
  );
};

export { App };
