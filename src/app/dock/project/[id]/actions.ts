'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq, not } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { projects, users } from '@/lib/db/schema';
import { SLUG_REGEX, SLUG_STATUS, type SlugStatus } from '@/lib/utils/slug';

export type ActionState = { error: string } | null;

export const updateProject = async (
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { error: 'Unauthorized' };
  }

  const user = await db.query.users.findFirst({ where: eq(users.clerkId, clerkId) });
  if (!user) {
    return { error: 'User not found' };
  }

  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, id), eq(projects.userId, user.id)),
  });

  if (!project) {
    return { error: 'Project not found' };
  }

  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const demoUrl = formData.get('demoUrl') as string;
    const techStack = JSON.parse((formData.get('techStack') as string) ?? '[]') as string[];

    await db
      .update(projects)
      .set({
        nameOverride: name || null,
        descriptionOverride: description || null,
        demoUrlOverride: demoUrl || null,
        techStackOverride: techStack,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Something went wrong' };
  }

  revalidatePath(`/dock/project/${id}`);
  return null;
};

export const checkSlugAvailability = async (
  slug: string,
  projectId: string,
): Promise<SlugStatus> => {
  if (!slug || !SLUG_REGEX.test(slug)) {
    return SLUG_STATUS.invalid;
  }

  const existing = await db.query.projects.findFirst({
    where: and(not(eq(projects.id, projectId)), eq(projects.slug, slug)),
  });

  return existing ? SLUG_STATUS.taken : SLUG_STATUS.available;
};
