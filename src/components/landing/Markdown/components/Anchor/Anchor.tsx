import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

function Anchor({ href, children }: { href?: string; children?: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {children}
    </a>
  );
}

const styles = {
  link: cn(
    'text-pp-ink-strong decoration-pp-rule font-medium underline underline-offset-2',
    'hover:decoration-pp-ink transition-colors duration-[var(--pp-dur-micro)] ease-[var(--pp-ease-out)]',
  ),
};

export default Anchor;
