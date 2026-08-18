import { NextRequest, NextResponse } from 'next/server';
import { db, updateIdeaStatus } from '@/lib/db';

export async function GET() {
  try {
    const ideas = db.prepare('SELECT * FROM community_ideas ORDER BY votes DESC, id DESC').all();
    return NextResponse.json({ success: true, data: ideas });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { ideaId, status } = body;

    if (!ideaId || !status) {
      return NextResponse.json({ success: false, error: 'ideaId and status are required' }, { status: 400 });
    }

    const updated = updateIdeaStatus(Number(ideaId), status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Idea not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Idea #${ideaId} updated to ${status}` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
