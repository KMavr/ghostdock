import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

function HomePage() {
  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <span className={styles.anchor}>⚓</span>
        <h1 className={styles.title}>GhostDock</h1>
        <p className={styles.tagline}>
          Turn any public GitHub repo into a beautiful landing page in seconds.
        </p>
        <div className={styles.actions}>
          <Link href="/sign-up" className={styles.primary}>
            Get started free
          </Link>
          <Link href="/sign-in" className={styles.secondary}>
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}

const styles = {
  root: cn('bg-gd-bg flex min-h-screen flex-col items-center justify-center px-4 text-center'),
  inner: cn('flex max-w-xl flex-col items-center gap-6'),
  anchor: cn('text-5xl'),
  title: cn('text-gd-text text-5xl font-bold tracking-tight'),
  tagline: cn('text-gd-muted text-lg leading-relaxed'),
  actions: cn('mt-2 flex gap-3'),
  primary: cn(
    'bg-gd-accent text-gd-bg hover:bg-gd-accent-glow',
    'rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors',
  ),
  secondary: cn(
    'text-gd-muted hover:text-gd-text border-gd-surface-2 hover:border-gd-accent/50',
    'rounded-lg border px-6 py-2.5 text-sm transition-colors',
  ),
};

export default HomePage;
