'use client';

import { useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import { checkSlugAvailability } from '@/app/dock/project/[id]/actions';
import { cn } from '@/lib/utils/cn';
import { SLUG_REGEX, SLUG_STATUS, type SlugStatus } from '@/lib/utils/slug';

interface SlugInputProps {
  defaultValue?: string;
  projectId: string;
}

const formatSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
const trimSlug = (value: string) => value.replace(/^-+|-+$/g, '');

const STATUS_MESSAGE: Record<SlugStatus | 'checking', string> = {
  available: 'Available',
  taken: 'Already taken',
  invalid: 'Only lowercase letters, numbers and hyphens',
  checking: 'Checking...',
};

function SlugInput({ defaultValue, projectId }: SlugInputProps) {
  const [slug, setSlug] = useState<string>(formatSlug(defaultValue ?? ''));
  const [dbStatus, setDbStatus] = useState<{ slug: string; result: SlugStatus } | null>(null);

  useEffect(() => {
    if (!slug || !SLUG_REGEX.test(slug)) return;

    const timer = setTimeout(async () => {
      const result = await checkSlugAvailability(slug, projectId);
      setDbStatus({ slug, result });
    }, 300);

    return () => clearTimeout(timer);
  }, [slug, projectId]);

  const deriveStatus = (): SlugStatus | 'checking' | null => {
    if (!slug) return null;
    if (!SLUG_REGEX.test(slug)) return SLUG_STATUS.invalid;
    if (dbStatus?.slug === slug) return dbStatus.result;
    return 'checking';
  };

  const status = deriveStatus();

  return (
    <div className={styles.field}>
      <label htmlFor="slug" className={styles.label}>
        Project slug
      </label>
      <input
        id="slug"
        name="slug"
        type="text"
        value={slug}
        className={styles.input}
        onChange={(e) => setSlug(formatSlug(e.target.value))}
        onBlur={() => setSlug(trimSlug(slug))}
      />
      {status && <p className={cn(hintVariants({ status }))}>{STATUS_MESSAGE[status]}</p>}
    </div>
  );
}

const hintVariants = cva('text-xs', {
  variants: {
    status: {
      available: 'text-gd-accent',
      taken: 'text-gd-error',
      invalid: 'text-gd-muted',
      checking: 'text-gd-muted',
    },
  },
});

const styles = {
  field: cn('flex flex-col gap-1'),
  label: cn('text-gd-muted text-sm font-medium'),
  input: cn(
    'border-gd-surface-2 bg-gd-surface rounded-lg border px-4 py-2',
    'text-gd-text placeholder-gd-muted',
    'focus:border-gd-accent focus:ring-gd-accent transition outline-none focus:ring-1',
  ),
};

export default SlugInput;
