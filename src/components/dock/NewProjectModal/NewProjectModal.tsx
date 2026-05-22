'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LuX } from 'react-icons/lu';
import DockFormContent from '@/app/dock/_components/DockFormContent/DockFormContent';
import { cn } from '@/lib/utils/cn';

function NewProjectModal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const close = () => router.back();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dock-form-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className={styles.dialog}>
      <div className={styles.panel}>
        <button type="button" onClick={close} className={styles.close} aria-label="Close">
          <LuX size={18} />
        </button>
        <DockFormContent
          title="Chart a new course"
          subtitle="Paste a public GitHub repo URL to get started."
        />
      </div>
    </dialog>
  );
}

const styles = {
  dialog: cn(
    'm-0 h-dvh max-h-dvh w-dvw max-w-dvw bg-transparent p-6',
    'flex items-center justify-center',
    'backdrop:bg-black/60 backdrop:backdrop-blur-sm',
  ),
  panel: cn(
    'bg-gd-surface border-gd-surface-2 relative w-full max-w-md rounded-xl border p-8 shadow-2xl',
  ),
  close: cn(
    'text-gd-muted hover:text-gd-text absolute top-4 right-4 rounded p-1 transition',
    'focus-visible:outline-gd-accent focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
};

export default NewProjectModal;
