import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { projects, users } from '@/lib/db/schema';
import { fetchRepoData } from '@/lib/github/fetch';
import { isValidGithubUrl, parseGithubUrl } from '@/lib/github/urls';
import { parseRepoData } from '@/lib/parse';

export const ingestRepo = async (url: string, clerkId: string): Promise<{ id: string }> => {
  if (!url || !isValidGithubUrl(url)) {
    throw new Error('Invalid GitHub URL');
  }

  const parsed = parseGithubUrl(url);
  if (!parsed) {
    throw new Error('Invalid GitHub URL');
  }

  const user = await db.query.users.findFirst({ where: eq(users.clerkId, clerkId) });
  if (!user) {
    throw new Error('User not found');
  }

  const repoData = await fetchRepoData(parsed.owner, parsed.repo);

  const parsedRepoData = parseRepoData(repoData);

  const existing = await db.query.projects.findFirst({
    where: and(
      eq(projects.userId, user.id),
      eq(projects.repoUrl, `github.com/${parsed.owner}/${parsed.repo}`),
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
      })
      .where(eq(projects.id, existing.id));

    return { id: existing.id };
  }

  const [project] = await db
    .insert(projects)
    .values({
      userId: user.id,
      repoUrl: `github.com/${parsed.owner}/${parsed.repo}`,
      repoOwner: parsed.owner,
      repoName: parsed.repo,
      fetchedAt: new Date(),
      readmeRaw: repoData.readmeRaw,
      descriptionParsed: parsedRepoData.descriptionParsed,
      demoUrlParsed: parsedRepoData.demoUrlParsed,
      techStackParsed: parsedRepoData.techStackParsed,
      sectionsParsed: parsedRepoData.sectionsParsed,
    })
    .returning({ id: projects.id });

  return { id: project.id };
};
