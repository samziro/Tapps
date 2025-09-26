import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase server keys missing for admin login route.');
      return NextResponse.json({ ok: false, message: 'Server misconfigured' }, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const password = String(body?.password ?? '').trim();

    if (!name || !password) {
      return NextResponse.json({ ok: false, message: 'Name and password required' }, { status: 400 });
    }

    // plaintext password compare (for now) — replace with hashed check in production
    const { data, error } = await supabase
      .from('adminCredentials')
      .select('id, name')
      .eq('name', name)
      .eq('password', password)
      .single();

    if (error || !data) {
      return NextResponse.json({ ok: false, message: 'Invalid name or password' }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true, admin: { id: data.id, name: data.name } });

    // set httpOnly cookie (force secure=false in dev by NODE_ENV check)
    res.cookies.set(
      'adminAuth',
      JSON.stringify({ id: data.id, name: data.name }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      }
    );

    return res;
  } catch (err) {
    console.error('Admin login error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
