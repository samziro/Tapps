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

    // improved diagnostic
    const missing: string[] = [];
    if (!SUPABASE_URL) missing.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
    if (missing.length) {
      console.error('update-order: missing env vars ->', missing.join(', '));
      return NextResponse.json({ ok: false, message: `Server misconfigured: missing ${missing.join(', ')}` }, { status: 500 });
    }

    const raw = parseCookie(request.headers.get('cookie'), 'adminAuth');
    if (!raw) return NextResponse.json({ ok: false, message: 'Not authenticated' }, { status: 401 });

    let admin;
    try { admin = JSON.parse(raw); } catch { return NextResponse.json({ ok: false, message: 'Invalid session' }, { status: 401 }); }

    const body = await request.json().catch(() => ({}));
    const orderId = body?.orderId;
    const newStatus = String(body?.newStatus ?? '').trim();

    if (!orderId || !newStatus) {
      return NextResponse.json({ ok: false, message: 'Missing orderId or newStatus' }, { status: 400 });
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // select known columns; use notificationStatus (jsonb) as in the DB
    const { data: currentOrder, error: fetchErr } = await supabase
      .from('orders')
      .select('id, customerName, phone, location, product, quantity, totalAmount, paymentMethod, notes, status, orderDate, notificationSent, notificationStatus')
      .eq('id', orderId)
      .single();

    if (fetchErr || !currentOrder) {
      console.error('Order fetch error', fetchErr);
      return NextResponse.json({ ok: false, message: 'Order not found' }, { status: 404 });
    }

    // re-validate admin
    const { data: adminRow } = await supabase
      .from('adminCredentials')
      .select('id, name')
      .eq('id', admin.id)
      .eq('name', admin.name)
      .single();

    if (!adminRow) {
      return NextResponse.json({ ok: false, message: 'Invalid admin session' }, { status: 401 });
    }

    // prepare payload
    const payload: Record<string, any> = { status: newStatus };
    if (Object.prototype.hasOwnProperty.call(currentOrder, 'notificationSent')) {
      payload.notificationSent = newStatus !== 'pending';
    }

    // update notificationStatus (jsonb array) if present
    const currentNotif = (currentOrder as any).notificationStatus;
    if (currentNotif && Array.isArray(currentNotif)) {
      const statusMessage =
        newStatus === 'processing'
          ? 'Your order is now being processed and prepared for delivery.'
          : newStatus === 'delivered'
          ? 'Your order has been delivered successfully. Thank you!'
          : `Order status updated to ${newStatus}.`;
      const newNotifs = [
        ...currentNotif,
        { message: statusMessage, timestamp: new Date().toISOString(), type: newStatus === 'delivered' ? 'success' : 'info' },
      ];
      payload.notificationStatus = newNotifs;
    }

    const { data: updated, error: updateErr } = await supabase
      .from('orders')
      .update(payload)
      .eq('id', orderId)
      .select('id, customerName, phone, location, product, quantity, totalAmount, paymentMethod, notes, status, orderDate, notificationSent, notificationStatus')
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