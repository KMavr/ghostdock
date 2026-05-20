import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface ProjectCardProps {
  id: string;
  repoOwner: string;
  repoName: string;
  nameOverride: string | null;
  slug: string | null;
  isPublished: boolean;
}

function ProjectCard({
  id,
  repoOwner,
  repoName,
  nameOverride,
  slug,
  isPublished,
}: ProjectCardProps) {
  const name = nameOverride ?? repoName;

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <p className={styles.owner}>{repoOwner}</p>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.status}>
          <span className={isPublished ? styles.dotLive : styles.dotDraft}>●</span>
          <span className={styles.statusLabel}>{isPublished ? 'Live' : 'Draft'}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <Link href={`/dock/project/${id}`} className={styles.editLink}>
          Edit →
        </Link>
        {isPublished && slug && (
          <a
            href={`/p/${slug}`}
            className={styles.viewLink}
            target="_blank"
            rel="noopener noreferrer">
            View ↗
          </a>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: cn(
    'bg-gd-surface border-gd-surface-2 flex flex-col justify-between',
    'rounded-xl border p-5 transition-colors',
    'hover:border-gd-accent/40',
  ),
  body: cn('mb-4 flex flex-col gap-1'),
  owner: cn('text-gd-muted text-xs'),
  name: cn('text-gd-text text-base font-semibold'),
  status: cn('mt-2 flex items-center gap-1.5'),
  dotLive: cn('text-gd-accent text-xs'),
  dotDraft: cn('text-gd-muted text-xs'),
  statusLabel: cn('text-gd-muted text-xs'),
  footer: cn('flex items-center gap-4'),
  editLink: cn('text-gd-accent hover:text-gd-accent-glow text-sm font-medium transition-colors'),
  viewLink: cn('text-gd-muted hover:text-gd-text text-sm transition-colors'),
};

export default ProjectCard;
