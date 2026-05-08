import { Resend } from 'resend';

const FROM = 'FA-OS <noreply@facilitorium.denmasterfa.com>';

export async function sendWelcomeEmail(to: string, name: string, expiryDate: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'ยินดีต้อนรับสู่ The Facilitorium FA-OS! 🎉',
    html: welcomeTemplate(name, expiryDate),
  });
}

function welcomeTemplate(name: string, expiryDate: string): string {
  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ยินดีต้อนรับสู่ FA-OS</title>
</head>
<body style="margin:0;padding:0;background-color:#F8F7F4;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#FFFFFF;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,35,102,0.08);">

    <!-- Header -->
    <div style="background:#002366;padding:40px;text-align:center;">
      <p style="color:#C5A059;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:0 0 8px 0;">THE FACILITORIUM</p>
      <h1 style="color:#FFFFFF;font-size:26px;margin:0;font-weight:700;">FA-OS Access Granted ✓</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:8px 0 0;letter-spacing:2px;text-transform:uppercase;">Facilitation Operating System</p>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <h2 style="color:#002366;margin:0 0 16px;font-size:22px;">ยินดีต้อนรับ, ${name}! 👋</h2>
      <p style="color:#555555;line-height:1.7;margin:0 0 24px;font-size:15px;">
        บัญชีสมาชิก VIP ของคุณพร้อมใช้งานแล้ว คุณสามารถเข้าถึง
        <strong>คลังความรู้, AI Coach "Wise Brother"</strong> และ
        <strong>Community สำหรับวิทยากรมืออาชีพ</strong> ได้ทันที
      </p>

      <!-- Expiry Badge -->
      <div style="background:#F8F7F4;border-radius:12px;padding:20px 24px;margin:0 0 28px;border-left:4px solid #C5A059;">
        <p style="margin:0;color:#999999;font-size:11px;text-transform:uppercase;letter-spacing:2px;">สมาชิกหมดอายุ</p>
        <p style="margin:6px 0 0;color:#002366;font-size:20px;font-weight:700;">${expiryDate}</p>
      </div>

      <!-- Features -->
      <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 28px;">
        ${[
          ['📚', 'Knowledge Library', 'คลังวิดีโอและบทความเชิงลึก'],
          ['🤖', 'Wise Brother AI', 'ช่วยออกแบบ Workshop & Script'],
          ['👥', 'Exclusive Community', 'เครือข่ายวิทยากรแถวหน้า'],
          ['🏆', 'Certification Track', 'ใบ Certificate รับรองการเรียนรู้'],
        ].map(([icon, title, desc]) => `
          <tr>
            <td style="padding:8px 0;vertical-align:top;width:32px;font-size:18px;">${icon}</td>
            <td style="padding:8px 0 8px 12px;">
              <strong style="color:#002366;font-size:14px;">${title}</strong><br>
              <span style="color:#888888;font-size:13px;">${desc}</span>
            </td>
          </tr>
        `).join('')}
      </table>

      <!-- CTA Button -->
      <a href="https://facilitorium.denmasterfa.com/dashboard"
         style="display:block;background:#002366;color:#C5A059;text-decoration:none;text-align:center;padding:18px;border-radius:14px;font-weight:700;font-size:16px;letter-spacing:1px;">
        เข้าสู่ FA-OS Dashboard →
      </a>
    </div>

    <!-- Footer -->
    <div style="padding:24px 40px;border-top:1px solid #F0EEE8;text-align:center;">
      <p style="color:#CCCCCC;font-size:10px;margin:0;letter-spacing:2px;text-transform:uppercase;">
        By Den Masterfa • Professional Ecosystem • facilitorium.denmasterfa.com
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
