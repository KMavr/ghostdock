'use client';

import { useEffect } from 'react';
import { GiSinkingShip } from 'react-icons/gi';
import { cn } from '@/lib/utils/cn';

interface RootErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

function RootError({ error, unstable_retry }: RootErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.root}>
      <GiSinkingShip className={styles.icon} aria-hidden="true" />
      <h1 className={styles.title}>We’ve sprung a leak</h1>
      <p className={styles.description}>
        Something went wrong on deck. Try again — if it keeps happening, check back later.
      </p>
      <button type="button" onClick={() => unstable_retry()} className={styles.action}>
        Try again
      </button>
    </main>
  );
}

const styles = {
  root: cn(
    'bg-gd-bg text-gd-text flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center',
  ),
  icon: cn('text-gd-error text-7xl'),
  title: cn('text-3xl font-semibold'),
  description: cn('text-gd-muted max-w-md text-balance'),
  action: cn(
    'bg-gd-accent text-gd-bg hover:bg-gd-accent-glow active:translate-y-px',
    'focus-visible:outline-gd-accent focus-visible:outline-2 focus-visible:outline-offset-2',
    'mt-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
  ),
};

export default RootError;
