// Cloudflare Pages Serverless Function for Community Ideas
// Runs on Cloudflare Edge Worker during production

export async function onRequestGet(context: any) {
  const { request, env } = context;

  try {
    // If Cloudflare KV is bound to env.DAOMING_KV, read from KV
    if (env && env.DAOMING_KV) {
      const stored = await env.DAOMING_KV.get('daoming_ideas_db', 'json');
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

    if (!body.title || !body.desc) {
      return new Response(JSON.stringify({ error: 'Title and description required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (env && env.DAOMING_KV) {
      let list = (await env.DAOMING_KV.get('daoming_ideas_db', 'json')) || [];
      const newId = list.length > 0 ? Math.max(...list.map((i: any) => i.id || 0)) + 1 : 1;
      const newIdea = {
        id: newId,
        title_th: body.title,
        title_en: body.title,
        desc_th: body.desc,
        desc_en: body.desc,
        author_th: body.author || 'ชาวตะกั่วป่า',
        category_th: body.category_th || '💡 ทั่วไป',
        votes: 1,
        status: 'submitted',
        created_at: new Date().toISOString()
      };
      list = [newIdea, ...list];
      await env.DAOMING_KV.put('daoming_ideas_db', JSON.stringify(list));

      return new Response(JSON.stringify({ success: true, data: newIdea }), {
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
