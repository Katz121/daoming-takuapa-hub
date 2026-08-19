// Cloudflare Pages Serverless Function for Bookings & Space Proposals

export async function onRequestGet(context: any) {
  const { env } = context;

  try {
    if (env && env.DAOMING_KV) {
      const stored = await env.DAOMING_KV.get('daoming_bookings_db', 'json');
      if (stored && Array.isArray(stored)) {
        return new Response(JSON.stringify({ success: true, data: stored }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    return new Response(JSON.stringify({ success: true, message: 'Ready' }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body: any = await request.json();

    if (env && env.DAOMING_KV) {
      let list = (await env.DAOMING_KV.get('daoming_bookings_db', 'json')) || [];
      const newRec = {
        ...body,
        id: `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString()
      };
      list = [newRec, ...list];
      await env.DAOMING_KV.put('daoming_bookings_db', JSON.stringify(list));

      return new Response(JSON.stringify({ success: true, data: newRec }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    return new Response(JSON.stringify({ success: true, received: body }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
