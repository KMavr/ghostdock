import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

type UserCreatedEvent = {
  type: 'user.created';
  data: {
    id: string;
    email_addresses: { email_address: string; id: string }[];
    primary_email_address_id: string;
  };
};

type WebhookEvent = UserCreatedEvent;

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return new Response('Webhook secret not configured', { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(secret);

  let event: WebhookEvent;
  try {
    event = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch {
    return new Response('Invalid webhook signature', { status: 400 });
  }

  if (event.type === 'user.created') {
    const primaryEmail = event.data.email_addresses.find(
      (e) => e.id === event.data.primary_email_address_id,
    );

    await db.insert(users).values({
      clerkId: event.data.id,
      email: primaryEmail?.email_address ?? '',
    });
  }

  return new Response(null, { status: 200 });
}
