import { NextResponse } from 'next/server';
import { getCommunityIdeas, createCommunityIdea } from '@/lib/db';

export async function GET() {
  try {
    const ideas = getCommunityIdeas();
    return NextResponse.json({ success: true, data: ideas });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.desc) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const created = createCommunityIdea({
      title: body.title,
      desc: body.desc,
      author: body.author,
      category_th: body.category_th,
      category_en: body.category_en
    });

    return NextResponse.json({ success: true, data: created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
