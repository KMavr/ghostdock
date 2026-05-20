'use client';

import { useTransition } from 'react';
import { cva } from 'class-variance-authority';
import { GiShoonerSailboat } from 'react-icons/gi';
import { publishProject } from '@/app/dock/project/[id]/actions';
import { cn } from '@/lib/utils/cn';

interface PublishButtonProps {
  projectId: string;
  hasSlug: boolean;
}

function PublishButton({ projectId, hasSlug }: PublishButtonProps) {
  const [pending, startTransition] = useTransition();

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
      className={buttonVariants({ pending })}>
      <span className={cn(hasSlug && !pending && styles.shipAnimate)}>
        <GiShoonerSailboat className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>{pending ? 'Setting sail...' : 'Set Sail'}</span>
    </button>
  );
}

const buttonVariants = cva(
  'group flex items-center gap-3 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40',
  {
    variants: {
      pending: {
        true: 'bg-gd-accent text-gd-bg',
        false: 'bg-gd-accent text-gd-bg hover:bg-gd-accent-glow',
      },
    },
  },
);

const styles = {
  shipAnimate: cn('group-hover:animate-bob'),
};

export default PublishButton;
