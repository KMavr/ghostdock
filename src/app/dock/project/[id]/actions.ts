'use server';

import { and, eq, not } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { SLUG_REGEX, SLUG_STATUS, type SlugStatus } from '@/lib/utils/slug';

export type ActionState = { error: string } | null;

type Project = InferSelectModel<typeof projects>;
type AuthorizedProject =
  | { project: Project; error?: undefined }
  | { error: ActionState; project?: undefined };

const getAuthorizedProject = async (id: string): Promise<AuthorizedProject> => {
  const user = await getCurrentUser();
  if (!user) return { error: { error: 'Unauthorized' } };

  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, id), eq(projects.userId, user.id)),
  });
  if (!project) return { error: { error: 'Project not found' } };

  return { project };
};

export const updateProject = async (
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const result = await getAuthorizedProject(id);
  if (result.error) return result.error;

  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const demoUrl = formData.get('demoUrl') as string;
    const techStack = JSON.parse((formData.get('techStack') as string) ?? '[]') as string[];
    const slug = formData.get('slug') as string;

    await db
      .update(projects)
      .set({
        nameOverride: name || null,
        descriptionOverride: description || null,
        demoUrlOverride: demoUrl || null,
        techStackOverride: techStack,
        slug: slug || null,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Something went wrong' };
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

export const publishProject = async (id: string): Promise<ActionState> => {
  const result = await getAuthorizedProject(id);
  if (result.error) return result.error;

  const { project } = result;
  if (!project?.slug) return { error: 'A slug is required before publishing' };

  try {
    await db
      .update(projects)
      .set({ isPublished: true, publishedAt: new Date(), updatedAt: new Date() })
      .where(eq(projects.id, id));
    revalidatePath(`/p/${project.slug}`);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Something went wrong' };
  }

  revalidatePath(`/dock/project/${id}`);
  return null;
};
