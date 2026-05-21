import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

function EmptyDock() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>No projects yet.</p>
      <p className={styles.sub}>Paste a public GitHub repo URL and GhostDock builds the page.</p>
      <Link href="/dock/new" className={styles.cta}>
        Add your first project
      </Link>
    </div>
  );
}

const styles = {
  wrapper: cn('flex flex-col items-start gap-4'),
  heading: cn('text-gd-text text-lg font-semibold tracking-tight'),
  sub: cn('text-gd-muted max-w-[42ch] text-sm leading-relaxed'),
  cta: cn(
    'bg-gd-accent text-gd-bg rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors',
    'hover:bg-gd-accent-glow',
    'focus-visible:outline-gd-accent focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
};

export default EmptyDock;
