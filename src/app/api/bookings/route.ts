import { NextResponse } from 'next/server';
import { createBookingWithSeatLock, getLiveEvents, getAllBookings } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view');

    if (view === 'all') {
      const bookings = getAllBookings();
      return NextResponse.json({ success: true, data: bookings });
    }

    const events = getLiveEvents();
    return NextResponse.json({ success: true, data: events });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.guestName || !body.guestPhone) {
      return NextResponse.json(
        { error: 'Name and Phone number are required' },
        { status: 400 }
      );
    }

    const eventId = body.eventId || 'e1';

    const bookingResult = await createBookingWithSeatLock({
      eventId,
      guestName: body.guestName,
      guestPhone: body.guestPhone,
      guestEmail: body.guestEmail,
      seats: body.seats || 1,
      teaBlend: body.teaBlend,
      pastryType: body.pastryType
    });

    return NextResponse.json({
      success: true,
      message: 'Booking confirmed with seat lock',
      data: bookingResult
    });
  } catch (err: any) {
    if (err.message && err.message.startsWith('SOLD_OUT')) {
      return NextResponse.json(
        { error: 'Seats Sold Out', details: err.message },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
