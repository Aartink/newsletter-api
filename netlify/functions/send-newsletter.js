// netlify/functions/send-newsletter.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://aart.ink', // ✅ restrict to your domain
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default async (req) => {
  // ✅ Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    const { email } = await req.json();

    await resend.emails.send({
      from: 'Abtahi from AART.INK <no-reply@aart.ink>',
      to: email,
      subject: 'Welcome to the digital cosmos 🌌',
      html: '<strong>Thanks for subscribing!</strong><br>Be ready for some cool updates!'
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Resend error:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
};
