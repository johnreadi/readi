'use client';

import { useEffect, useState } from 'react';

export default function DevClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(() => process.env.NODE_ENV !== 'development');

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const host = typeof window !== 'undefined' ? window.location.hostname : '';
    const isLocalhost = host === 'localhost' || host === '127.0.0.1';

    if (!isDev || !isLocalhost) {
      setMounted(true);
      return;
    }

    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
}
