import Link from 'next/link';
import { GiBoatHorizon } from 'react-icons/gi';
import { cn } from '@/lib/utils/cn';

function DockNotFound() {
  return (
    <main className={styles.root}>
      <GiBoatHorizon className={styles.icon} aria-hidden="true" />
      <div className={styles.heading}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Project not found</h1>
      </div>
      <p className={styles.description}>
        That project drifted off the map — it may have been removed, or the link’s wrong.
      </p>
      <Link href="/dock" className={styles.action}>
        Back to your dock
      </Link>
    </main>
  );
}

const styles = {
  root: cn(
    'text-gd-text flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center',
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

export default DockNotFound;
