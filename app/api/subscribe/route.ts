import { NextRequest, NextResponse } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

// Deduce data center from API key (e.g., "abc123-us1" -> "us1")
function getMailchimpDC(apiKey: string): string {
  if (apiKey.includes('-')) {
    return apiKey.split('-').pop() || 'us1';
  }
  // Default to us1 if no DC suffix
  return 'us1';
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Check if Mailchimp is configured
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
      return NextResponse.json(
        { success: false, error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const dc = getMailchimpDC(MAILCHIMP_API_KEY);
    const memberId = btoa(normalizedEmail).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${memberId}`;

    const credentials = Buffer.from(`apikey:${MAILCHIMP_API_KEY}`).toString('base64');
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        email_address: normalizedEmail,
        status: 'subscribed',
        double_optin: false, // Set to true if you want double opt-in
      }),
    });

    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      return NextResponse.json(
        { success: true, message: 'Successfully subscribed!' },
        { status: 200 }
      );
    } else if (response.status === 400 && data.title === 'Member Exists') {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      );
    } else {
      console.error('Mailchimp error:', data);
      return NextResponse.json(
        { success: false, error: 'Subscription failed', details: data.detail },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
