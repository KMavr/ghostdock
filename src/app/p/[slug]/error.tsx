'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

// Applies the visitor's saved theme before first paint, so there is no light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('pp-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-pp-theme',t);}}catch(e){}})();`;

interface PublicErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

function PublicError({ error, unstable_retry }: PublicErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <main className={styles.root}>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.description}>This page couldn’t be loaded. Try again in a moment.</p>
        <button type="button" onClick={() => unstable_retry()} className={styles.action}>
          Try again
        </button>
      </main>
    </>
  );
}

const styles = {
  root: cn(
    'bg-pp-paper text-pp-ink flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center',
  ),
  title: cn('text-pp-ink-strong text-3xl font-semibold'),
  description: cn('text-pp-muted max-w-md text-balance'),
  action: cn(
    'border-pp-rule text-pp-ink hover:bg-pp-paper-2 active:translate-y-px',
    'focus-visible:outline-pp-focus focus-visible:outline-2 focus-visible:outline-offset-2',
    'mt-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors',
  ),
};

export default PublicError;
