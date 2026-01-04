'use client';

import { useEffect } from 'react';

export default function ServiceWorkerCleaner() {
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const host = typeof window !== 'undefined' ? window.location.hostname : '';
    const isLocalhost = host === 'localhost' || host === '127.0.0.1';

    if (!isDev || !isLocalhost) return;
    if (!('serviceWorker' in navigator)) return;

    (async () => {
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));

        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(k => caches.delete(k)));
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  return null;
}
