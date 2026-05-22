import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

// Applies the visitor's saved theme before first paint, so there is no light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('pp-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-pp-theme',t);}}catch(e){}})();`;

function PublicNotFound() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <main className={styles.root}>
        <div className={styles.heading}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Project not found</h1>
        </div>
        <p className={styles.description}>
          This project page doesn’t exist, or it hasn’t been published yet.
        </p>
        <Link href="/" className={styles.action}>
          Go to GhostDock
        </Link>
      </main>
    </>
  );
}

const styles = {
  root: cn(
    'bg-pp-paper text-pp-ink flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center',
  ),
  heading: cn('flex flex-col items-center gap-1'),
  code: cn('text-pp-muted text-sm font-semibold tracking-[0.2em]'),
  title: cn('text-pp-ink-strong text-3xl font-semibold'),
  description: cn('text-pp-muted max-w-md text-balance'),
  action: cn(
    'border-pp-rule text-pp-ink hover:bg-pp-paper-2 active:translate-y-px',
    'focus-visible:outline-pp-focus focus-visible:outline-2 focus-visible:outline-offset-2',
    'mt-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors',
  ),
};

export default PublicNotFound;
