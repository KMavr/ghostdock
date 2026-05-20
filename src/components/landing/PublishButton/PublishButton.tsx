'use client';

import { useTransition } from 'react';
import { GiShoonerSailboat } from 'react-icons/gi';
import { publishProject } from '@/app/dock/project/[id]/actions';
import { cn } from '@/lib/utils/cn';

interface PublishButtonProps {
  projectId: string;
  hasSlug: boolean;
  isPublished: boolean;
}

function PublishButton({ projectId, hasSlug, isPublished }: PublishButtonProps) {
  const [pending, startTransition] = useTransition();

  const getLabel = () => {
    if (pending) return 'Setting sail...';
    if (isPublished) return 'Published';
    return 'Set Sail';
  };

  const handleClick = () => {
    startTransition(async () => {
      await publishProject(projectId);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={!hasSlug || pending}
      title={!hasSlug ? 'Save a slug first' : undefined}
      className={cn(styles.button, isPublished && styles.published)}>
      <span className={cn(hasSlug && !pending && styles.shipAnimate)}>
        <GiShoonerSailboat className="h-5 w-5" aria-hidden="true" />
      </span>

      <span>{getLabel()}</span>
    </button>
  );
}

const styles = {
  button: cn(
    'group flex items-center gap-3 rounded-lg px-5 py-2.5',
    'bg-gd-accent text-gd-bg text-sm font-semibold',
    'hover:bg-gd-accent-glow transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-40',
  ),
  published: cn('bg-gd-surface-2 text-gd-muted hover:bg-gd-surface-2 cursor-default'),
  shipAnimate: cn('group-hover:animate-bob'),
};

export default PublishButton;
