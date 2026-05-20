import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import FeaturesSection from '@/components/landing/FeaturesSection/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection/HeroSection';
import InstallSection from '@/components/landing/InstallSection/InstallSection';
import UsageSection from '@/components/landing/UsageSection/UsageSection';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import type { ParsedSections } from '@/lib/parse/sections';
import { cn } from '@/lib/utils/cn';

interface PublicProjectPageProps {
  params: Promise<{ slug: string }>;
}

const getProject = unstable_cache(
  (slug: string) => db.query.projects.findFirst({ where: eq(projects.slug, slug) }),
  ['project-by-slug'],
);

async function PublicPage({ params }: PublicProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project || !project.isPublished) return notFound();

  const name = project.nameOverride ?? project.repoName;
  const description = project.descriptionOverride ?? project.descriptionParsed;
  const demoUrl = project.demoUrlOverride ?? project.demoUrlParsed;
  const techStack = project.techStackOverride ?? project.techStackParsed;
  const sections = (project.sectionsParsed ?? {}) as ParsedSections;

  return (
    <main className={styles.root}>
      <div className={styles.inner}>
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
    </main>
  );
}

const styles = {
  root: cn('bg-gd-bg min-h-screen px-4 py-16'),
  inner: cn('mx-auto flex max-w-3xl flex-col gap-16'),
};

export default PublicPage;
