'use client';

import { useRouter } from 'next/navigation';
import { LuX } from 'react-icons/lu';
import DockFormContent from '@/app/dock/_components/DockFormContent/DockFormContent';
import { cn } from '@/lib/utils/cn';

function NewProjectModal() {
  const router = useRouter();

  return (
    <div className={styles.backdrop} onClick={() => router.back()}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => router.back()} className={styles.close} aria-label="Close">
          <LuX size={18} />
        </button>
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
  close: cn(
    'text-gd-muted hover:text-gd-text absolute top-4 right-4 rounded p-1 transition',
    'focus-visible:outline-gd-accent focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
};

export default NewProjectModal;
