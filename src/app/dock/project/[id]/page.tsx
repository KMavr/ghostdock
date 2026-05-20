import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { updateProject } from '@/app/dock/project/[id]/actions';
import ProjectForm from '@/app/dock/project/[id]/ProjectForm';
import FeaturesSection from '@/components/landing/FeaturesSection/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection/HeroSection';
import InstallSection from '@/components/landing/InstallSection/InstallSection';
import PublishButton from '@/components/landing/PublishButton/PublishButton';
import UsageSection from '@/components/landing/UsageSection/UsageSection';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import type { ParsedSections } from '@/lib/parse/sections';
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

  const name = project.nameOverride ?? project.repoName;
  const description = project.descriptionOverride ?? project.descriptionParsed;
  const demoUrl = project.demoUrlOverride ?? project?.demoUrlParsed;
  const techStack = project.techStackOverride ?? project.techStackParsed;
  const sections = (project.sectionsParsed ?? {}) as ParsedSections;

  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.owner}>{project.repoOwner}</p>
            <h1 className={styles.title}>{project.nameOverride ?? project.repoName}</h1>
          </div>
          <div className={styles.actions}>
            <PublishButton
              projectId={project.id}
              hasSlug={!!project.slug}
              isPublished={project.isPublished}
            />
            {project.isPublished && project.slug && (
              <a href={`/p/${project.slug}`} className={styles.viewLink}>
                View live page →
              </a>
            )}
          </div>
        </div>

        <div className={styles.grid}>
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Edit details</h2>
            <ProjectForm project={project} action={action} />
          </section>

          <section className={styles.previewSection}>
            <h2 className={styles.sectionTitle}>Preview</h2>
            <div className={styles.preview}>
              <HeroSection
                name={name}
                description={description ?? ''}
                demoUrl={demoUrl}
                techStack={techStack ?? []}
              />
              {sections.features && <FeaturesSection content={sections.features} />}
              {sections.installation && <InstallSection content={sections.installation} />}
              {sections.usage && <UsageSection content={sections.usage} />}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const styles = {
  root: cn('bg-gd-bg min-h-screen px-4 py-12'),
  inner: cn('mx-auto max-w-5xl'),
  header: cn('mb-10 flex flex-row items-start justify-between'),
  actions: cn('flex items-center gap-3'),
  viewLink: cn('text-gd-accent hover:text-gd-accent-glow text-sm font-medium transition-colors'),
  owner: cn('text-gd-muted text-sm'),
  title: cn('text-gd-text mt-1 text-4xl font-semibold tracking-tight'),
  grid: cn('grid grid-cols-1 gap-8 lg:grid-cols-2'),
  formSection: cn('flex flex-col gap-4'),
  previewSection: cn('flex flex-col gap-4'),
  sectionTitle: cn('text-gd-muted text-xs font-semibold tracking-widest uppercase'),
  preview: cn(
    'border-gd-surface-2 bg-gd-surface flex flex-col gap-10 overflow-auto rounded-lg border p-6',
  ),
};

export default Page;
