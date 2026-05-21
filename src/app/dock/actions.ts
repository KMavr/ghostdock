'use server';

import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { ingestRepo } from '@/lib/github/ingest';

type ActionState = { error: string } | { projectId: string } | null;

export const submitRepo = async (_prev: ActionState, formData: FormData): Promise<ActionState> => {
  const user = await getCurrentUser();
  if (!user) return { error: 'Unauthorized' };

  try {
    const url = formData.get('url') as string;
    const { id } = await ingestRepo(url, user.id);
    return { projectId: id };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Something went wrong' };
  }
};
