'use server';

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { ingestRepo } from '@/lib/github/ingest';

type ActionState = { error: string } | null;

export const submitRepo = async (_prev: ActionState, formData: FormData): Promise<ActionState> => {
  const user = await getCurrentUser();
  if (!user) return { error: 'Unauthorized' };

  let projectId: string;

  try {
    const url = formData.get('url') as string;
    projectId = (await ingestRepo(url, user.id)).id;
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Something went wrong' };
  }

  redirect(`/dock/project/${projectId}`);
};
