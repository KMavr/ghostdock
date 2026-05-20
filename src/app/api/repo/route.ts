import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { GithubFetchError } from '@/lib/github/fetch';
import { ingestRepo } from '@/lib/github/ingest';

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { url } = await req.json();
    const { id } = await ingestRepo(url, user.id);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    if (error instanceof GithubFetchError) {
      const statusMap = { not_found: 404, private: 403, rate_limited: 429, unknown: 502 };
      return NextResponse.json({ error: error.message }, { status: statusMap[error.code] });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
