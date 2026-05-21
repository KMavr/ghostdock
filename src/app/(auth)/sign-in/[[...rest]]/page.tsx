import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

function SignInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Link href="/" className={styles.wordmark}>
          GhostDock{' '}
          <span className={styles.anchor} aria-hidden="true">
            ⚓
          </span>
        </Link>
        <SignIn />
      </div>
    </div>
  );
}

const styles = {
  container: cn('flex min-h-screen items-center justify-center px-4 py-12'),
  inner: cn('flex flex-col items-center gap-8'),
  wordmark: cn('text-gd-text text-lg font-semibold tracking-tight'),
  anchor: cn('text-gd-accent'),
};

export default SignInPage;
