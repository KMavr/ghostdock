import RepoForm from '@/app/dock/RepoForm';
import { cn } from '@/lib/utils/cn';

interface DockFormContentProps {
  title: string;
  subtitle: string;
}

function DockFormContent({ title, subtitle }: DockFormContentProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.anchor}>⚓</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <RepoForm />
    </div>
  );
}

const styles = {
  wrapper: cn('w-full'),
  header: cn('mb-8 text-center'),
  anchor: cn('text-4xl'),
  title: cn('text-gd-text mt-3 text-2xl font-semibold tracking-tight'),
  subtitle: cn('text-gd-muted mt-2 text-sm'),
};

export default DockFormContent;
