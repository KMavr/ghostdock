import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

function InlineCode({ children }: { children?: ReactNode }) {
  return <code className={styles.inlineCode}>{children}</code>;
}

const styles = {
  inlineCode: cn('bg-pp-paper-2 text-pp-ink rounded px-1.5 py-0.5 font-mono text-[0.85em]'),
};

export default InlineCode;
