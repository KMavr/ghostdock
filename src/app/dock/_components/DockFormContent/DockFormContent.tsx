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
        <h1 id="dock-form-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <RepoForm />
    </div>
  );
}

const styles = {
  wrapper: cn('w-full'),
  header: cn('mb-6'),
  title: cn('text-gd-text text-xl font-semibold tracking-tight'),
  subtitle: cn('text-gd-muted mt-1.5 text-sm leading-relaxed'),
};

export default DockFormContent;
