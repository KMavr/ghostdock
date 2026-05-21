import { eq } from 'drizzle-orm';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import FeaturesSection from '@/components/landing/FeaturesSection/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection/HeroSection';
import InstallSection from '@/components/landing/InstallSection/InstallSection';
import PublicFooter from '@/components/landing/PublicFooter/PublicFooter';
import ThemeToggle from '@/components/landing/ThemeToggle/ThemeToggle';
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

// Applies the visitor's saved theme before first paint, so there is no light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('pp-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-pp-theme',t);}}catch(e){}})();`;

export async function generateMetadata({ params }: PublicProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project || !project.isPublished) return {};

  const name = project.nameOverride ?? project.repoName;
  const description = project.descriptionOverride ?? project.descriptionParsed ?? '';

  return {
    title: name,
    description,
    openGraph: { title: name, description, type: 'website' },
    twitter: { card: 'summary_large_image', title: name, description },
  };
}

async function PublicPage({ params }: PublicProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project || !project.isPublished) return notFound();

  const name = project.nameOverride ?? project.repoName;
  const description = project.descriptionOverride ?? project.descriptionParsed;
  const demoUrl = project.demoUrlOverride ?? project.demoUrlParsed;
  const techStack = project.techStackOverride ?? project.techStackParsed;
  const sections = (project.sectionsParsed ?? {}) as ParsedSections;
  const hasSections = Boolean(sections.features || sections.installation || sections.usage);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <main className={styles.root}>
        <ThemeToggle />
        <div className={styles.inner}>
          <HeroSection
            name={name}
            description={description ?? ''}
            demoUrl={demoUrl}
            techStack={techStack ?? []}
          />
          {hasSections && <hr className={styles.divider} />}
          {sections.features && <FeaturesSection content={sections.features} />}
          {sections.installation && <InstallSection content={sections.installation} />}
          {sections.usage && <UsageSection content={sections.usage} />}
          <PublicFooter repoUrl={project.repoUrl} />
        </div>
      </main>
    </>
  );
}

const styles = {
  root: cn('bg-pp-paper text-pp-ink min-h-screen'),
  inner: cn('mx-auto flex max-w-2xl flex-col gap-14 px-5 py-16 sm:py-20'),
  divider: cn('border-pp-rule w-full border-0 border-t'),
};

export default PublicPage;
