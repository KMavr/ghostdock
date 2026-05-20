'use client';

import { useActionState } from 'react';
import type { InferSelectModel } from 'drizzle-orm';
import SlugInput from '@/components/landing/SlugInput/SlugInput';
import TechStackEditor from '@/components/landing/TechStackEditor/TechStackEditor';
import type { projects } from '@/lib/db/schema';
import { cn } from '@/lib/utils/cn';
import type { ActionState } from './actions';

type Project = InferSelectModel<typeof projects>;
type BoundAction = (prev: ActionState, formData: FormData) => Promise<ActionState>;

interface ProjectFormProps {
  project: Project;
  action: BoundAction;
}

function ProjectForm({ project, action }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={project.nameOverride ?? project.repoName}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={project.descriptionOverride ?? project.descriptionParsed ?? ''}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="demoUrl" className={styles.label}>
          Demo URL
        </label>
        <input
          id="demoUrl"
          name="demoUrl"
          type="url"
          defaultValue={project.demoUrlOverride ?? project.demoUrlParsed ?? ''}
          className={styles.input}
        />
      </div>
      <SlugInput projectId={project.id} defaultValue={project.slug ?? ''} />

      <TechStackEditor initialValue={project.techStackOverride ?? project.techStackParsed ?? []} />

      {state?.error && <p className={styles.error}>{state.error}</p>}

      <button type="submit" disabled={pending} className={styles.button}>
        {pending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}

const styles = {
  form: cn('flex flex-col gap-4'),
  field: cn('flex flex-col gap-1'),
  label: cn('text-gd-muted text-sm font-medium'),
  input: cn(
    'border-gd-surface-2 bg-gd-surface rounded-lg border px-4 py-2',
    'text-gd-text placeholder-gd-muted',
    'focus:border-gd-accent focus:ring-gd-accent transition outline-none focus:ring-1',
  ),
  button: cn(
    'bg-gd-accent text-gd-bg',
    'hover:bg-gd-accent-glow self-start',
    'rounded-lg px-6 py-2 font-medium transition',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ),
  error: cn('text-gd-error text-sm'),
};

export default ProjectForm;
