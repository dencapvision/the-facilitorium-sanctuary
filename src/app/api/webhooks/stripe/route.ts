import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from '@/lib/email';
import { sendLineWelcomeMessage } from '@/lib/line';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const stripeKey        = process.env.STRIPE_SECRET_KEY;
  const webhookSecret    = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl      = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables for Stripe webhook');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2025-02-24.acacia',
  });

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  const body      = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId  = session.client_reference_id;

    if (!userId) {
      console.warn('Checkout session completed but missing client_reference_id');
      return NextResponse.json({ received: true });
    }

    console.log(`Processing subscription for user: ${userId}`);

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    // Insert subscription (service_role bypasses RLS)
    const { error: subError } = await supabaseAdmin
      .from('subscriptions')
      .insert({
        user_id:                userId,
        stripe_customer_id:     session.customer as string,
        stripe_subscription_id: session.subscription as string,
        status:                 'active',
        expiry_date:            expiryDate.toISOString(),
      });

    if (subError) {
      console.error('Error inserting subscription:', subError);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    // ── Send welcome notifications (non-blocking) ──────────────────
    try {
      const { data: userData } = await supabaseAdmin
        .from('users')
        .select('name, email, line_user_id')
        .eq('id', userId)
        .single();

      if (userData) {
        const formattedExpiry = expiryDate.toLocaleDateString('th-TH', {
          year: 'numeric', month: 'long', day: 'numeric',
        });

        // Email via Resend
        if (userData.email) {
          await sendWelcomeEmail(userData.email, userData.name, formattedExpiry)
            .catch((e) => console.error('Welcome email failed:', e));
        }

        // LINE Flex Message
        if (userData.line_user_id) {
          await sendLineWelcomeMessage(userData.line_user_id, userData.name, formattedExpiry)
            .catch((e) => console.error('LINE notification failed:', e));
        }
      }
    } catch (notifErr) {
      // Notifications must never fail the webhook response
      console.error('Notification error (non-critical):', notifErr);
    }
    // ───────────────────────────────────────────────────────────────
  }

  return NextResponse.json({ received: true });
}
