import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, users } from '@/lib/db/schema';
import { fetchRepoData } from '@/lib/github/fetch';
import { isValidGithubUrl, parseGithubUrl } from '@/lib/github/urls';

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { url } = await req.json();
  if (!url || !isValidGithubUrl(url)) {
    return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 });
  }

  const parsed = parseGithubUrl(url);
  if (!parsed) {
    return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 });
  }

  const user = await db.query.users.findFirst({ where: eq(users.clerkId, clerkId) });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const repoData = await fetchRepoData(parsed.owner, parsed.repo);

  const [project] = await db
    .insert(projects)
    .values({
      userId: user.id,
      repoUrl: `github.com/${parsed.owner}/${parsed.repo}`,
      repoOwner: parsed.owner,
      repoName: parsed.repo,
      fetchedAt: new Date(),
      readmeRaw: repoData.readmeRaw,
      descriptionParsed: repoData.description,
      demoUrlParsed: repoData.homepage,
    })
    .returning({ id: projects.id });

  return NextResponse.json({ id: project.id }, { status: 201 });
}
