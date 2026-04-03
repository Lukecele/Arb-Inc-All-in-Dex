import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
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

    // Ensure data directory exists
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });

    // Read existing subscribers
    let subscribers: string[] = [];
    try {
      const existing = await fs.readFile(DATA_FILE, 'utf-8');
      subscribers = JSON.parse(existing);
    } catch (err) {
      // File doesn't exist or is empty, start fresh
      subscribers = [];
    }

    // Check if email already exists
    if (subscribers.includes(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Add new subscriber
    subscribers.push(normalizedEmail);

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));

    return NextResponse.json(
      { success: true, message: 'Subscription successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
