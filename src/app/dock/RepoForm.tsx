'use client';

import { useActionState } from 'react';
import { submitRepo } from '@/app/dock/actions';
import { cn } from '@/lib/utils/cn';

function RepoForm() {
  const [state, formAction, pending] = useActionState(submitRepo, null);

  return (
    <form action={formAction} className={styles.form}>
      <input
        type="url"
        name="url"
        required
        autoFocus
        placeholder="https://github.com/owner/repo"
        className={styles.input}
      />
      <button type="submit" disabled={pending} className={styles.button}>
        {pending ? 'Charting course...' : 'Chart Course'}
      </button>
      {state?.error && <p className={styles.error}>{state.error}</p>}
    </form>
  );
}

const styles = {
  form: cn('flex flex-col gap-3'),
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
