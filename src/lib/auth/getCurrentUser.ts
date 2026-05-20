import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

export async function getCurrentUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;
  return db.query.users.findFirst({ where: eq(users.clerkId, clerkId) });
}
