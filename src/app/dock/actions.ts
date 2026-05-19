'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ingestRepo } from '@/lib/github/ingest';

type ActionState = { error: string } | null;

export const submitRepo = async (_prev: ActionState, formData: FormData): Promise<ActionState> => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { error: 'Unauthorized' };
  }

  let projectId: string;

  try {
    const url = formData.get('url') as string;
    projectId = (await ingestRepo(url, clerkId)).id;
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Something went wrong' };
  }

  redirect(`/dock/project/${projectId}`);
};
