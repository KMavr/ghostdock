'use client';

import { useRouter } from 'next/navigation';
import DockFormContent from '@/app/dock/_components/DockFormContent/DockFormContent';
import { cn } from '@/lib/utils/cn';

function NewProjectModal() {
  const router = useRouter();

  return (
    <div className={styles.backdrop} onClick={() => router.back()}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeRow}>
          <button onClick={() => router.back()} className={styles.close} aria-label="Close">
            ✕
          </button>
        </div>
        <DockFormContent
          title="Chart a new course"
          subtitle="Paste a public GitHub repo URL to get started."
        />
      </div>
    </div>
  );
}

const styles = {
  backdrop: cn('fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'),
  dialog: cn(
    'bg-gd-surface border-gd-surface-2 relative w-full max-w-md rounded-xl border p-8 shadow-2xl',
  ),
  closeRow: cn('absolute top-4 right-4'),
  close: cn('text-gd-muted hover:text-gd-text transition'),
};

export default NewProjectModal;
