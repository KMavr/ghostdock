'use client';

import { useActionState } from 'react';
import { submitRepo } from '@/app/dock/actions';

function RepoForm() {
  const [state, formAction, pending] = useActionState(submitRepo, null);

  return (
    <form action={formAction}>
      <input type="url" name="url" required placeholder="https://github.com/owner/repo" />
      <button type="submit" disabled={pending}>
        {pending ? 'Loading...' : 'Submit'}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

export default RepoForm;
