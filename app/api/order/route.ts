import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const data = await req.json();
  // Generate a 6-digit order ID 
  const orderId = Math.floor(100000 + Math.random() * 900000).toString();
  const orderData = {
    ...data,
    id: orderId,
    orderDate: new Date().toISOString(),
    status: 'pending',
    notificationSent: false
  };
  const { error } = await supabase.from('orders').insert([orderData]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ orderId });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const phone = searchParams.get('phone');
  if (!id || !phone) {
    return NextResponse.json({ error: 'Missing id or phone' }, { status: 400 });
  }
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .eq('phone', Number(phone.replace(/\D/g, '')))
    .single();
  if (error || !data) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json({ order: data });
}
