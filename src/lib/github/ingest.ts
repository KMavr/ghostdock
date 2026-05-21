import { and, eq, not } from 'drizzle-orm';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { fetchRepoData } from '@/lib/github/fetch';
import { isValidGithubUrl, parseGithubUrl } from '@/lib/github/urls';
import { parseRepoData } from '@/lib/parse';
import { formatSlug, trimSlug } from '@/lib/utils/slug';

const resolveSlug = async (repoName: string, excludeId?: string): Promise<string | null> => {
  const slug = trimSlug(formatSlug(repoName));
  if (!slug) return null;

  const existing = await db.query.projects.findFirst({
    where: excludeId
      ? and(eq(projects.slug, slug), not(eq(projects.id, excludeId)))
      : eq(projects.slug, slug),
  });

  return existing ? null : slug;
};

export const ingestRepo = async (url: string, userId: string): Promise<{ id: string }> => {
  if (!url || !isValidGithubUrl(url)) {
    throw new Error('Invalid GitHub URL');
  }

  const parsed = parseGithubUrl(url);
  if (!parsed) {
    throw new Error('Invalid GitHub URL');
  }

  const repoData = await fetchRepoData(parsed.owner, parsed.repo);

  const parsedRepoData = parseRepoData(repoData);

  const existing = await db.query.projects.findFirst({
    where: and(
      eq(projects.userId, userId),
      eq(projects.repoUrl, `https://github.com/${parsed.owner}/${parsed.repo}`),
    ),
  });

  if (existing) {
    await db
      .update(projects)
      .set({
        fetchedAt: new Date(),
        readmeRaw: repoData.readmeRaw,
        descriptionParsed: parsedRepoData.descriptionParsed,
        demoUrlParsed: parsedRepoData.demoUrlParsed,
        techStackParsed: parsedRepoData.techStackParsed,
        sectionsParsed: parsedRepoData.sectionsParsed,
        updatedAt: new Date(),
        ...(existing.slug ? {} : { slug: await resolveSlug(existing.repoName, existing.id) }),
      })
      .where(eq(projects.id, existing.id));

    return { id: existing.id };
  }

  const [project] = await db
    .insert(projects)
    .values({
      userId: userId,
      repoUrl: `https://github.com/${parsed.owner}/${parsed.repo}`,
      repoOwner: parsed.owner,
      repoName: parsed.repo,
      fetchedAt: new Date(),
      readmeRaw: repoData.readmeRaw,
      descriptionParsed: parsedRepoData.descriptionParsed,
      demoUrlParsed: parsedRepoData.demoUrlParsed,
      techStackParsed: parsedRepoData.techStackParsed,
      sectionsParsed: parsedRepoData.sectionsParsed,
      slug: await resolveSlug(parsed.repo),
    })
    .returning({ id: projects.id });

  return { id: project.id };
};
