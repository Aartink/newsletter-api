// netlify/functions/send-newsletter.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req) => {
  try {
    const { email } = await req.json(); // ✅ FIX: req.json() parses correctly

    const data = await resend.emails.send({
      from: 'Abtahi from AART.INK <no-reply@aart.ink>',
      to: email,
      subject: 'Welcome to the digital cosmos 🌌',
      html: '<strong>Thanks for subscribing!</strong><br>Be ready for some cool updates!'
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Resend error:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
