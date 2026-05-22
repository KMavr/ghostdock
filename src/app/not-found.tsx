import Link from 'next/link';
import { GiBoatHorizon } from 'react-icons/gi';
import { cn } from '@/lib/utils/cn';

function RootNotFound() {
  return (
    <main className={styles.root}>
      <GiBoatHorizon className={styles.icon} aria-hidden="true" />
      <div className={styles.heading}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Lost in the fog</h1>
      </div>
      <p className={styles.description}>
        This page drifted off the map. Let’s get you back to shore.
      </p>
      <Link href="/" className={styles.action}>
        Return home
      </Link>
    </main>
  );
}

const styles = {
  root: cn(
    'bg-gd-bg text-gd-text flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center',
  ),
  icon: cn('text-gd-muted text-7xl'),
  heading: cn('flex flex-col items-center gap-1'),
  code: cn('text-gd-accent text-sm font-semibold tracking-[0.2em]'),
  title: cn('text-3xl font-semibold'),
  description: cn('text-gd-muted max-w-md text-balance'),
  action: cn(
    'bg-gd-accent text-gd-bg hover:bg-gd-accent-glow active:translate-y-px',
    'focus-visible:outline-gd-accent focus-visible:outline-2 focus-visible:outline-offset-2',
    'mt-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
  ),
};

export default RootNotFound;
