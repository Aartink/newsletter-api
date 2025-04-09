import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Handle CORS preflight
export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://aart.ink',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  try {
    const { email } = await req.json();

    const htmlContent = `
<div style="font-family: 'Segoe UI', 'Orbitron', sans-serif; color: #00ffee; background-color: #0a0a0a; padding: 40px 24px; border-radius: 12px; max-width: 600px; margin: auto; box-shadow: 0 0 25px rgba(0,255,255,0.1);">
  <h1 style="text-align: center; font-size: 28px; margin-bottom: 12px;">✨ Welcome to <span style="color: #ff0077;">AART.INK</span> ✨</h1>
  <p style="font-size: 16px; line-height: 1.6; color: #cccccc; text-align: center; margin-bottom: 28px;">
    Thank you for signing up!
  </p>
  <div style="text-align: center; margin-bottom: 24px;">
    <a href="https://aart.ink" style="text-decoration: none; padding: 14px 28px; background-color: #00ffee; color: black; font-weight: bold; border-radius: 8px; box-shadow: 0 0 10px rgba(0,255,255,0.5); font-size: 14px;">
      Explore the Universe
    </a>
  </div>
  <hr style="border: none; border-top: 1px dashed #333; margin: 32px 0;">
  <div style="font-size: 13px; text-align: center; color: #666;">
    You’re receiving this email because you signed up at <a href="https://aart.ink" style="color: #00ffee;">aart.ink</a>.
    <br>
    If this wasn’t you, just ignore it — Yoko probably signed you up by walking on the keyboard. 🐾
  </div>
</div>`;

    await resend.emails.send({
      from: 'Abtahi from AART.INK <no-reply@aart.ink>',
      to: email,
      subject: '✨ Welcome to AART.INK!',
      html: htmlContent,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://aart.ink',
      },
    });
  } catch (error) {
    console.error('Resend error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://aart.ink',
      },
    });
  }
};
