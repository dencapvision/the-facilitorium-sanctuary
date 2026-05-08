import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables for Stripe webhook');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2026-03-25.dahlia' as any,
  });

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    
    if (userId) {
      console.log(`Processing subscription for user: ${userId}`);
      
      // Calculate expiry date (30 days from now)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);

      const { error } = await supabaseAdmin
        .from('subscriptions')
        .insert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          status: 'active',
          expiry_date: expiryDate.toISOString(),
        });

      if (error) {
        console.error('Error inserting subscription:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
    } else {
      console.warn('Checkout session completed but missing client_reference_id');
    }
  }

  return NextResponse.json({ received: true });
}
