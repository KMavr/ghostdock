'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { projects, users } from '@/lib/db/schema';

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

    await db
      .update(projects)
      .set({
        nameOverride: name || null,
        descriptionOverride: description || null,
        demoUrlOverride: demoUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Something went wrong' };
  }

  return null;
};
