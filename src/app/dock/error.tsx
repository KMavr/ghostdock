'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { GiSinkingShip } from 'react-icons/gi';
import { cn } from '@/lib/utils/cn';

interface DockErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

function DockError({ error, unstable_retry }: DockErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.root}>
      <GiSinkingShip className={styles.icon} aria-hidden="true" />
      <h1 className={styles.title}>We’ve sprung a leak</h1>
      <p className={styles.description}>
        We hit rough water loading your dock. Try again, or head back.
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={() => unstable_retry()} className={styles.retry}>
          Try again
        </button>
        <Link href="/dock" className={styles.back}>
          Back to your dock
        </Link>
      </div>
    </main>
  );
}

const styles = {
  root: cn(
    'text-gd-text flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center',
  ),
  icon: cn('text-gd-error text-7xl'),
  title: cn('text-3xl font-semibold'),
  description: cn('text-gd-muted max-w-md text-balance'),
  actions: cn('mt-2 flex flex-wrap items-center justify-center gap-3'),
  retry: cn(
    'bg-gd-accent text-gd-bg hover:bg-gd-accent-glow active:translate-y-px',
    'focus-visible:outline-gd-accent focus-visible:outline-2 focus-visible:outline-offset-2',
    'rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
  ),
  back: cn(
    'text-gd-muted hover:text-gd-text active:translate-y-px',
    'focus-visible:outline-gd-accent focus-visible:outline-2 focus-visible:outline-offset-2',
    'rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
  ),
};

export default DockError;
