import RepoForm from '@/app/dock/RepoForm';
import { cn } from '@/lib/utils/cn';

function Page() {
  return (
    <main className={styles.root}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.anchor}>⚓</span>
          <h1 className={styles.title}>The Dock</h1>
          <p className={styles.subtitle}>
            Paste a public GitHub repo URL and we&apos;ll build your landing page.
          </p>
        </div>
        <RepoForm />
      </div>
    </main>
  );
}

const styles = {
  root: cn('bg-gd-bg flex min-h-screen flex-col items-center justify-center px-4'),
  card: cn('w-full max-w-lg'),
  header: cn('mb-8 text-center'),
  anchor: cn('text-4xl'),
  title: cn('text-gd-text mt-3 text-3xl font-semibold tracking-tight'),
  subtitle: cn('text-gd-muted mt-2'),
};

export default Page;
