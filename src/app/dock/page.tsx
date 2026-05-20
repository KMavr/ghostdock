import { eq } from 'drizzle-orm';
import EmptyDock from '@/app/dock/_components/EmptyDock/EmptyDock';
import ProjectGrid from '@/app/dock/_components/ProjectGrid/ProjectGrid';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { cn } from '@/lib/utils/cn';

async function DockPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const userProjects = await db.query.projects.findMany({
    where: eq(projects.userId, user.id),
    columns: {
      id: true,
      repoOwner: true,
      repoName: true,
      nameOverride: true,
      slug: true,
      isPublished: true,
    },
  });

  return (
    <main className={styles.root}>
      {userProjects.length > 0 ? (
        <div className={styles.grid}>
          <ProjectGrid projects={userProjects} />
        </div>
      ) : (
        <div className={styles.centered}>
          <EmptyDock />
        </div>
      )}
    </main>
  );
}

const styles = {
  root: cn('bg-gd-bg min-h-screen px-4'),
  centered: cn('flex min-h-screen flex-col items-center justify-center'),
  grid: cn('mx-auto max-w-5xl py-12'),
};

export default DockPage;
