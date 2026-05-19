import { SignUp } from '@clerk/nextjs';
import { cn } from '@/lib/utils/cn';

function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUp />
    </div>
  );
}

const styles = {
  container: cn('flex min-h-screen items-center justify-center'),
};

export default SignUpPage;
