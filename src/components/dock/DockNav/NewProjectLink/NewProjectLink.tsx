'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

function NewProjectLink() {
  const pathname = usePathname();
  if (pathname === '/dock/new') return null;

  return (
    <Link href="/dock/new" className={styles.link}>
      + New project
    </Link>
  );
}

const styles = {
  link: cn(
    'text-gd-muted hover:text-gd-text border-gd-surface-2 hover:border-gd-accent/50',
    'rounded-lg border px-3 py-1.5 text-sm transition-colors',
  ),
};

export default NewProjectLink;
