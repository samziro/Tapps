import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function parseCookie(header: string | null, name: string) {
  if (!header) return null;
  const match = header.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export async function POST(request: Request) {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('update-order: missing env vars ->', {
        NEXT_PUBLIC_SUPABASE_URL: !!SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: !!SUPABASE_SERVICE_ROLE_KEY,
      });
      return NextResponse.json({ ok: false, message: 'Server misconfigured' }, { status: 500 });
    }

    // try cookie first
    const cookieHeader = request.headers.get('cookie');
    let raw = parseCookie(cookieHeader, 'adminAuth');

    // fallback #1: Authorization: Bearer <base64-json-or-token>
    if (!raw) {
      const auth = request.headers.get('authorization') || request.headers.get('Authorization');
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        raw = auth.slice(7).trim();
      }
    }

    // fallback #2: body.adminAuth
    let bodyData: any = {};
    try {
      bodyData = await request.json().catch(() => ({}));
    } catch {
      bodyData = {};
    }
    if (!raw && bodyData?.adminAuth) raw = bodyData.adminAuth;

    if (!raw) {
      console.error('update-order: no adminAuth provided (cookie/header/body)');
      return NextResponse.json({ ok: false, message: 'Not authenticated' }, { status: 401 });
    }

    // try parse admin session (if JSON)
    let admin: any = raw;
    try {
      if (typeof raw === 'string' && (raw.startsWith('{') || raw.startsWith('%7B'))) {
        // attempt decodeURIComponent for cookie values
        const decoded = decodeURIComponent(raw);
        admin = JSON.parse(decoded);
      }
    } catch (e) {
      // leave admin as raw string; validation below will fail if needed
    }

    // minimal validation (adjust to your auth shape)
    if (!admin || (!admin.id && !admin.email && typeof admin !== 'string')) {
      console.error('update-order: invalid admin session payload', admin);
      return NextResponse.json({ ok: false, message: 'Not authenticated' }, { status: 401 });
    }

    const orderId = bodyData?.orderId ?? bodyData?.id;
    const newStatus = String(bodyData?.newStatus ?? '').trim();
    if (!orderId || !newStatus) {
      return NextResponse.json({ ok: false, message: 'Missing orderId or newStatus' }, { status: 400 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // select actual columns (adjust if you use notificationStatus)
    const { data: currentOrder, error: fetchErr } = await supabase
      .from('orders')
      .select('id, status, notificationSent, notificationStatus')
      .eq('id', orderId)
      .single();

    if (fetchErr || !currentOrder) {
      console.error('Order fetch error', fetchErr);
      return NextResponse.json({ ok: false, message: 'Order not found' }, { status: 404 });
    }

    // optional: validate admin row in DB if you store admins
    // const { data: adminRow } = await supabase.from('adminCredentials').select('id').eq('id', admin.id).single();
    // if (!adminRow) return NextResponse.json({ ok: false, message: 'Invalid admin session' }, { status: 401 });

    const payload: Record<string, any> = { status: newStatus };
    if (Object.prototype.hasOwnProperty.call(currentOrder, 'notificationSent')) {
      payload.notificationSent = newStatus !== 'pending';
    }

    const currentNotif = (currentOrder as any).notificationStatus;
    if (currentNotif && Array.isArray(currentNotif)) {
      const statusMessage =
        newStatus === 'processing'
          ? 'Your order is now being processed and prepared for delivery.'
          : newStatus === 'delivered'
          ? 'Your order has been delivered successfully. Thank you!'
          : `Order status updated to ${newStatus}.`;
      payload.notificationStatus = [...currentNotif, { message: statusMessage, timestamp: new Date().toISOString(), type: newStatus === 'delivered' ? 'success' : 'info' }];
    }

    const { data: updated, error: updateErr } = await supabase
      .from('orders')
      .update(payload)
      .eq('id', orderId)
      .select('id, status, notificationSent, notificationStatus')
      .single();

    if (updateErr || !updated) {
      console.error('Order update error', updateErr);
      return NextResponse.json({ ok: false, message: 'Failed to update order' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, order: updated });
  } catch (err) {
    console.error('update-order route error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}