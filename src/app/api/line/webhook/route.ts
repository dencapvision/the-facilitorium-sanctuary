import { NextRequest, NextResponse } from 'next/server';
import { verifyLineSignature } from '@/lib/line';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  if (!channelSecret) {
    // Not yet configured — acknowledge LINE's verify ping but do nothing
    return NextResponse.json({ status: 'ok' });
  }

  const body = await req.text();
  const signature = req.headers.get('x-line-signature') ?? '';

  // Verify LINE signature to prevent spoofed requests
  const isValid = await verifyLineSignature(body, signature, channelSecret);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Process events (extend as needed)
  for (const event of payload.events ?? []) {
    switch (event.type) {
      case 'follow':
        // User followed the LINE Official Account
        console.log('[LINE] New follower:', event.source?.userId);
        break;
      case 'unfollow':
        console.log('[LINE] Unfollowed:', event.source?.userId);
        break;
      case 'message':
        // Auto-reply or logging can be added here
        console.log('[LINE] Message from:', event.source?.userId, '—', event.message?.text);
        break;
      default:
        break;
    }
  }

  // LINE requires a 200 OK response immediately
  return NextResponse.json({ status: 'ok' });
}
