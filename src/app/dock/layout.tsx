import { eq } from 'drizzle-orm';
import DockNav from '@/components/dock/DockNav/DockNav';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { cn } from '@/lib/utils/cn';

interface DockLayoutProps {
  children?: React.ReactNode;
  modal?: React.ReactNode;
}

async function DockLayout({ children, modal }: DockLayoutProps) {
  const user = await getCurrentUser();
  if (!user) return null;

  const hasProjects = !!(await db.query.projects.findFirst({
    where: eq(projects.userId, user.id),
    columns: { id: true },
  }));

  return (
    <div className={styles.container}>
      <DockNav showNew={hasProjects} />
      {children}
      {modal}
    </div>
  );
}

const styles = {
  container: cn('bg-gd-bg min-h-screen'),
};

export default DockLayout;
