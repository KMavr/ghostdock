import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { updateProject } from '@/app/dock/project/[id]/actions';
import ProjectForm from '@/app/dock/project/[id]/ProjectForm';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { cn } from '@/lib/utils/cn';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  const project = await db.query.projects.findFirst({ where: eq(projects.id, id) });

  if (!project) {
    return notFound();
  }

  const action = updateProject.bind(null, id);

  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.owner}>{project.repoOwner}</p>
          <h1 className={styles.title}>{project.nameOverride ?? project.repoName}</h1>
        </div>

        <div className={styles.grid}>
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Edit details</h2>
            <ProjectForm project={project} action={action} />
          </section>

          <section className={styles.readmeSection}>
            <h2 className={styles.sectionTitle}>README</h2>
            <pre className={styles.readme}>{project.readmeRaw ?? 'No README found.'}</pre>
          </section>
        </div>
      </div>
    </main>
  );
}

const styles = {
  root: cn('bg-gd-bg min-h-screen px-4 py-12'),
  inner: cn('mx-auto max-w-5xl'),
  header: cn('mb-10'),
  owner: cn('text-gd-muted text-sm'),
  title: cn('text-gd-text mt-1 text-4xl font-semibold tracking-tight'),
  grid: cn('grid grid-cols-1 gap-8 lg:grid-cols-2'),
  formSection: cn('flex flex-col gap-4'),
  readmeSection: cn('flex flex-col gap-4'),
  sectionTitle: cn('text-gd-muted text-xs font-semibold tracking-widest uppercase'),
  readme: cn(
    'border-gd-surface-2 bg-gd-surface text-gd-muted overflow-auto rounded-lg border p-4 text-sm whitespace-pre-wrap',
  ),
};

export default Page;
