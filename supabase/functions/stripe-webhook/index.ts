import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.0.0?target=denonext";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-12-18",
  httpClient: Stripe.createFetchHttpClient(),
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
      undefined,
      cryptoProvider
    );
  } catch (err) {
    console.error(`Error verifying webhook signature: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Initialize Supabase Client with Service Role
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || "Member";

    console.log(`Payment confirmed for: ${customerEmail}`);

    // 1. Create or Find User
    const { data: user, error: userError } = await supabase
      .from("users")
      .upsert({ email: customerEmail, name: customerName }, { onConflict: "email" })
      .select()
      .single();

    if (userError) throw userError;

    // 2. Create Subscription
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const { error: subError } = await supabase.from("subscriptions").insert({
      user_id: user.id,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: session.subscription as string,
      status: "active",
      expiry_date: expiryDate.toISOString(),
    });

    if (subError) throw subError;

    // 3. Generate Access Code
    const accessCode = `CAP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    await supabase.from("access_codes").insert({
      user_id: user.id,
      code: accessCode,
      status: "unused",
    });

    // 4. Send Beautiful LINE Flex Message to Admin
    const flexMessage = {
      type: "flex",
      altText: `🚀 สมาชิกใหม่ FA-OS: ${customerName}`,
      contents: {
        type: "bubble",
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "🎯 NEW FA-OS MEMBER",
              color: "#D4AF37",
              weight: "bold",
              size: "sm",
              letterSpacing: "0.2em",
            },
          ],
          backgroundColor: "#0F172A",
          paddingAll: "20px",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: customerName,
              weight: "bold",
              size: "xl",
              color: "#1E3A8A",
            },
            {
              type: "text",
              text: customerEmail,
              size: "xs",
              color: "#64748B",
              margin: "sm",
            },
            {
              type: "box",
              layout: "vertical",
              margin: "lg",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    { type: "text", text: "Package", size: "sm", color: "#64748B" },
                    { type: "text", text: "FA-OS (30 Days)", size: "sm", color: "#1E3A8A", align: "end", weight: "bold" },
                  ],
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    { type: "text", text: "Amount", size: "sm", color: "#64748B" },
                    { type: "text", text: "฿590.00", size: "sm", color: "#059669", align: "end", weight: "bold" },
                  ],
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    { type: "text", text: "Access Code", size: "sm", color: "#64748B" },
                    { type: "text", text: accessCode, size: "sm", color: "#D4AF37", align: "end", weight: "bold" },
                  ],
                },
              ],
            },
          ],
          paddingAll: "20px",
        },
        footer: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "MANAGE IN ADMIN",
                uri: "https://facilitorium.denmasterfa.com/admin",
              },
              style: "primary",
              color: "#1E3A8A",
            },
          ],
          paddingAll: "20px",
        },
      },
    };

    const lineResponse = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("LINE_CHANNEL_ACCESS_TOKEN")}`,
      },
      body: JSON.stringify({
        to: Deno.env.get("LINE_ADMIN_ID") || "USER_ID_PLACEHOLDER",
        messages: [flexMessage],
      }),
    });

    console.log(`LINE Notification status: ${lineResponse.status}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
