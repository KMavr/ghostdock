import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import NewProjectLink from './NewProjectLink/NewProjectLink';

interface DockNavProps {
  showNew: boolean;
}

function DockNav({ showNew }: DockNavProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/dock" className={styles.logo}>
          GhostDock
        </Link>
        <div className={styles.actions}>
          {showNew && <NewProjectLink />}
          <UserButton />
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: cn('bg-gd-bg/80 border-gd-surface-2 sticky top-0 z-40 border-b backdrop-blur-sm'),
  inner: cn('mx-auto flex max-w-5xl items-center justify-between px-4 py-3'),
  logo: cn('text-gd-text text-sm font-semibold tracking-wide'),
  actions: cn('flex items-center gap-4'),
};

export default DockNav;
