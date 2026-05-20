import DockFormContent from '@/app/dock/_components/DockFormContent/DockFormContent';
import { cn } from '@/lib/utils/cn';

function NewProjectPage() {
  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <DockFormContent
          title="Chart a new course"
          subtitle="Paste a public GitHub repo URL to get started."
        />
      </div>
    </main>
  );
}

const styles = {
  root: cn('flex min-h-screen items-center justify-center px-4'),
  inner: cn('w-full max-w-md'),
};

export default NewProjectPage;
