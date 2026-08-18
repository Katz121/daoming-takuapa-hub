import { NextResponse } from 'next/server';
import { toggleIdeaVote } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.ideaId) {
      return NextResponse.json({ error: 'ideaId is required' }, { status: 400 });
    }

    const voterKey = body.voterKey || 'guest-session';
    const result = toggleIdeaVote(Number(body.ideaId), voterKey);

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
