import { NextRequest, NextResponse } from 'next/server';
import { db, updateBookingStatus } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category'); // 'space' or 'event'

    let query = `
      SELECT b.*, e.title_th as event_title, e.title_en as event_title_en, e.category as event_category, e.date_label
      FROM bookings b
      LEFT JOIN events e ON b.event_id = e.id
    `;

    const conditions: string[] = [];
    const params: any[] = [];

    if (category === 'space') {
      conditions.push("e.category = 'space'");
    } else if (category === 'event') {
      conditions.push("e.category != 'space'");
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    query += ` ORDER BY b.id DESC`;

    const bookings = db.prepare(query).all(...params);
    return NextResponse.json({ success: true, data: bookings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticketCode, status, adminNotes } = body;

    if (!ticketCode || !status) {
      return NextResponse.json({ success: false, error: 'ticketCode and status are required' }, { status: 400 });
    }

    const updated = updateBookingStatus(ticketCode, status, adminNotes);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Booking ${ticketCode} updated to ${status}` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
