import { LuArrowUpRight } from 'react-icons/lu';
import Attribution from '@/components/landing/PublicFooter/components/Attribution';
import { cn } from '@/lib/utils/cn';

interface PublicFooterProps {
  repoUrl: string;
}

function PublicFooter({ repoUrl }: PublicFooterProps) {
  return (
    <footer className={styles.footer}>
      <Attribution />
      <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
        View source
        <LuArrowUpRight className={styles.icon} aria-hidden="true" />
      </a>
    </footer>
  );
}

const styles = {
  footer: cn(
    'border-pp-rule text-pp-muted mt-2 flex flex-col gap-3 border-t pt-6 text-sm',
    'sm:flex-row sm:items-center sm:justify-between',
  ),
  link: cn(
    'inline-flex w-fit items-center gap-1.5 transition-colors duration-[var(--pp-dur-micro)]',
    'hover:text-pp-ink ease-[var(--pp-ease-out)]',
    'focus-visible:outline-pp-focus focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
  icon: cn('h-3.5 w-3.5'),
};

export default PublicFooter;
