'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { submitRepo } from '@/app/dock/actions';
import { cn } from '@/lib/utils/cn';

function RepoForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(submitRepo, null);
  const error = state && 'error' in state ? state.error : null;

  useEffect(() => {
    if (state && 'projectId' in state) {
      router.push(`/dock/project/${state.projectId}`);
    }
  }, [state, router]);

  return (
    <form action={formAction} className={styles.form}>
      <label htmlFor="repo-url" className={styles.label}>
        GitHub repository URL
      </label>
      <input
        id="repo-url"
        type="url"
        name="url"
        required
        autoFocus
        placeholder="https://github.com/owner/repo"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'repo-url-error' : undefined}
        className={styles.input}
      />
      <button type="submit" disabled={pending} className={styles.button}>
        {pending ? 'Charting course...' : 'Chart Course'}
      </button>
      {error && (
        <p id="repo-url-error" role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </form>
  );
}

const styles = {
  form: cn('flex flex-col gap-3'),
  label: cn('sr-only'),
  input: cn(
    'border-gd-surface-2 bg-gd-surface text-gd-text placeholder-gd-muted',
    'focus:border-gd-accent focus:ring-gd-accent w-full rounded-lg border px-4 py-3 transition outline-none focus:ring-1',
  ),
  button: cn(
    'bg-gd-accent text-gd-bg hover:bg-gd-accent-glow',
    'rounded-lg px-4 py-3 font-medium transition',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ),
  error: cn('text-gd-error text-sm'),
};

export default RepoForm;
