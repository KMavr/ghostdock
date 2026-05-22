import { cn } from '@/lib/utils/cn';

// Applies the visitor's saved theme before first paint, so there is no light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('pp-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-pp-theme',t);}}catch(e){}})();`;

function PublicLoading() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <main className={styles.root} role="status" aria-label="Loading project">
        <span className={styles.srOnly}>Loading project…</span>
        <div className={styles.inner} aria-hidden="true">
          <div className={styles.title} />
          <div className={styles.lines}>
            <div className={styles.line} />
            <div className={cn(styles.line, 'w-2/3')} />
          </div>
          <div className={styles.badges}>
            <div className={styles.badge} />
            <div className={styles.badge} />
            <div className={styles.badge} />
          </div>
        </div>
      </main>
    </>
  );
}

const styles = {
  root: cn('bg-pp-paper min-h-screen'),
  srOnly: cn('sr-only'),
  inner: cn('mx-auto flex max-w-2xl flex-col gap-6 px-5 py-16 motion-safe:animate-pulse sm:py-20'),
  title: cn('bg-pp-rule h-10 w-2/3 rounded-md'),
  lines: cn('flex flex-col gap-2.5'),
  line: cn('bg-pp-rule h-4 w-full rounded'),
  badges: cn('mt-2 flex gap-2'),
  badge: cn('bg-pp-rule h-7 w-20 rounded-full'),
};

export default PublicLoading;
