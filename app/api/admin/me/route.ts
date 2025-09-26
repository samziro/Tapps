import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function parseCookie(header: string | null, name: string) {
  if (!header) return null;
  const match = header.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export async function GET(request: Request) {
  try {
    const raw = parseCookie(request.headers.get('cookie'), 'adminAuth');
    if (!raw) return NextResponse.json({ ok: false, message: 'Not authenticated' }, { status: 401 });

    let admin;
    try {
      admin = JSON.parse(raw);
    } catch {
      return NextResponse.json({ ok: false, message: 'Invalid cookie' }, { status: 401 });
    }

    // optional DB re-validation
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const { data } = await supabase
        .from('adminCredentials')
        .select('id, name')
        .eq('id', admin.id)
        .eq('name', admin.name)
        .single();

      if (!data) return NextResponse.json({ ok: false, message: 'Invalid session' }, { status: 401 });
      return NextResponse.json({ ok: true, admin: { id: data.id, name: data.name } });
    }

    // fallback: return cookie content (dev only)
    return NextResponse.json({ ok: true, admin });
  } catch (err) {
    console.error('admin/me error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}