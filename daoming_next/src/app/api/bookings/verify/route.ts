import { NextResponse } from 'next/server';
import { verifyAndCheckInTicket } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.ticketCode) {
      return NextResponse.json({ error: 'ticketCode is required' }, { status: 400 });
    }

    const result = verifyAndCheckInTicket(body.ticketCode);

    if (!result.success) {
      return NextResponse.json(result, { status: result.alreadyCheckedIn ? 409 : 404 });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
