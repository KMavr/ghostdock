'use client';

import { useState } from 'react';
import { LuCheck, LuCopy } from 'react-icons/lu';
import { cn } from '@/lib/utils/cn';

interface CodeBlockProps {
  code: string;
}

type CopyState = 'idle' | 'copied' | 'error';

const COPY_LABELS: Record<CopyState, string> = {
  idle: 'Copy code',
  copied: 'Copied',
  error: 'Copy failed',
};

function CodeBlock({ code }: CodeBlockProps) {
  const [state, setState] = useState<CopyState>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setState('copied');
    } catch {
      setState('error');
    }
    window.setTimeout(() => setState('idle'), 2000);
  };

  return (
    <div className={cn('not-prose', styles.wrapper)}>
      <pre className={styles.pre}>
        <code className={styles.code}>{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={COPY_LABELS[state]}
        className={cn(styles.copy, state === 'error' && styles.copyError)}>
        {state === 'copied' ? (
          <LuCheck className={styles.copyIcon} aria-hidden="true" />
        ) : (
          <LuCopy className={styles.copyIcon} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

const styles = {
  wrapper: cn('relative my-4'),
  pre: cn('border-pp-rule bg-pp-paper-2 overflow-x-auto rounded-lg border py-4 pr-14 pl-4'),
  code: cn('text-pp-ink font-mono text-sm leading-relaxed whitespace-pre'),
  copy: cn(
    'absolute top-2.5 right-2.5 grid h-9 w-9 place-items-center rounded-md',
    'border-pp-rule bg-pp-paper text-pp-muted border max-sm:h-11 max-sm:w-11',
    'transition-colors duration-[var(--pp-dur-micro)] ease-[var(--pp-ease-out)]',
    'hover:border-pp-muted hover:text-pp-ink',
    'focus-visible:outline-pp-focus focus-visible:outline-2 focus-visible:outline-offset-2',
    'active:translate-y-px',
  ),
  copyError: cn('text-pp-ink-strong'),
  copyIcon: cn('h-4 w-4'),
};

export default CodeBlock;
