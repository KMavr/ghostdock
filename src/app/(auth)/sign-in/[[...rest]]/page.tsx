import { SignIn } from '@clerk/nextjs';
import { cn } from '@/lib/utils/cn';

function SignInPage() {
  return (
    <div className={styles.container}>
      <SignIn />
    </div>
  );
}

const styles = {
  container: cn('flex min-h-screen items-center justify-center'),
};

export default SignInPage;
