const LINE_PUSH_API = 'https://api.line.me/v2/bot/message/push';

/**
 * Send a LINE Flex Message to a specific user.
 * Requires LINE_CHANNEL_ACCESS_TOKEN env var (LINE Messaging API channel).
 */
export async function sendLineWelcomeMessage(
  lineUserId: string,
  name: string,
  expiryDate: string
): Promise<boolean> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) {
    console.warn('LINE_CHANNEL_ACCESS_TOKEN not set — skipping LINE notification');
    return false;
  }

  const res = await fetch(LINE_PUSH_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: lineUserId,
      messages: [buildWelcomeFlex(name, expiryDate)],
    }),
  });

  if (!res.ok) {
    console.error('LINE push failed:', await res.text());
  }

  return res.ok;
}

/**
 * Verify incoming LINE webhook signature (Web Crypto — works on Cloudflare Workers).
 */
export async function verifyLineSignature(
  body: string,
  signature: string,
  channelSecret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(channelSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signed = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const computed = btoa(String.fromCharCode(...new Uint8Array(signed)));
  return computed === signature;
}

// ──────────────────────────────────────────────
// Flex Message builder — Welcome notification
// ──────────────────────────────────────────────
function buildWelcomeFlex(name: string, expiryDate: string) {
  return {
    type: 'flex',
    altText: `ยินดีต้อนรับสู่ FA-OS คุณ ${name}! 🎉`,
    contents: {
      type: 'bubble',
      size: 'mega',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'THE FACILITORIUM',
            color: '#C5A059',
            size: 'xs',
            weight: 'bold',
            letterspacing: '4px',
          },
          {
            type: 'text',
            text: 'FA-OS Access Granted ✓',
            color: '#FFFFFF',
            size: 'xl',
            weight: 'bold',
            margin: 'sm',
          },
          {
            type: 'text',
            text: 'Facilitation Operating System',
            color: 'rgba(255,255,255,0.5)',
            size: 'xxs',
            margin: 'xs',
          },
        ],
        backgroundColor: '#002366',
        paddingAll: '20px',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        paddingAll: '20px',
        contents: [
          {
            type: 'text',
            text: `ยินดีต้อนรับ ${name}!`,
            size: 'lg',
            weight: 'bold',
            color: '#002366',
          },
          {
            type: 'text',
            text: 'สมาชิก VIP ของคุณพร้อมใช้งานแล้ว เข้าเรียน ใช้ AI Coach และ Community ได้เลย',
            size: 'sm',
            color: '#666666',
            wrap: true,
          },
          { type: 'separator', margin: 'lg', color: '#F0EEE8' },
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'lg',
            contents: [
              { type: 'text', text: 'หมดอายุ', size: 'sm', color: '#999999', flex: 1 },
              { type: 'text', text: expiryDate, size: 'sm', color: '#002366', weight: 'bold', align: 'end' },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'xs',
            contents: [
              ['📚', 'Knowledge Library — คลังวิดีโอเชิงลึก'],
              ['🤖', 'Wise Brother AI — ออกแบบ Workshop'],
              ['👥', 'Community — เครือข่ายวิทยากร'],
              ['🏆', 'Certification Track — ใบ Certificate'],
            ].map(([icon, text]) => ({
              type: 'text',
              text: `${icon}  ${text}`,
              size: 'xs',
              color: '#555555',
              wrap: true,
            })),
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '12px',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: 'เข้าสู่ FA-OS Dashboard',
              uri: 'https://facilitorium.denmasterfa.com/dashboard',
            },
            style: 'primary',
            color: '#002366',
            height: 'sm',
          },
        ],
      },
    },
  };
}
