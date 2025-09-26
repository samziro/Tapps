'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthGuard from '../../../components/AuthGuard';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Order {
  id: string;
  customerName: string;
  phone: string;
  location: string;
  product: string;
  quantity: number;
  totalAmount: number;
  paymentMethod: string;
  notes: string;
  status: 'pending' | 'processing' | 'delivered';
  orderDate: string;
  notificationSent: boolean;
  notifications?: {
    message: string;
    timestamp: string;
    type: 'info' | 'success';
  }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'delivered'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch orders from Supabase
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('orderDate', { ascending: false });

      if (error) {
        setError('Failed to fetch orders.');
        setOrders([]);
        setLoading(false);
        return;
      }
      setOrders(data || []);
      setLoading(false);
    };

    loadOrders();

    // Optionally, poll for new orders every 10 seconds
    const interval = setInterval(loadOrders, 10000);

    return () => clearInterval(interval);
  }, []);

  // Update order status in Supabase
  const updateOrderStatus = async (orderId: string, newStatus: 'pending' | 'processing' | 'delivered') => {
    setError('');
    try {
      const body = { orderId, newStatus };

      const res = await fetch('/api/admin/update-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ensure httpOnly cookie is sent
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        console.error('update-order response status', res.status, 'text:', txt);
        const json = (() => { try { return JSON.parse(txt || '{}'); } catch { return {}; } })();
        setError(json?.message || `Update failed (status ${res.status})`);
        return;
      }

      const json = await res.json();
      if (!json?.ok) {
        console.error('updateOrderStatus failed:', json);
        setError(json?.message || 'Failed to update order.');
        return;
      }

      const updated = json.order;
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? { ...o, ...updated } : o)));
    } catch (err) {
      console.error('updateOrderStatus error', err);
      setError('Failed to update order.');
    }
  };

  const handleLogout = async () => {
    try {
      // call logout route that clears the httpOnly cookie on the server
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      console.error(e);
    } finally {
      router.push('/admin/login');
    }
  };

  // Helper to format phone number for WhatsApp (Kenya example)
  const formatPhoneForWhatsApp = (phone: string) => {
    let cleaned = String(phone).replace(/[\s-]/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    }
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    }
    return cleaned;
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter((order) => order.status === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const processingOrders = orders.filter((o) => o.status === 'processing').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <AuthGuard>
      <div className="min-h-dvh bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-xl md:text-3xl md:text-center font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600 mt-2">Manage and track all customer orders - Updates in real-time</p>
            </div>
            <div className="flex flex-row space-x-4">
              <Link
                href="/"
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Back to Website
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <i className="ri-logout-box-line"></i>
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-1 md:space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="ri-shopping-bag-3-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <i className="ri-time-line text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="ri-truck-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Processing</p>
                  <p className="text-2xl font-bold text-gray-900">{processingOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">KSh {totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
            <div className="flex space-x-2 md:space-x-3">
              {(['all', 'pending', 'processing', 'delivered'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`${filter === status ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-lg md:px-6 md:py-2 md:rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="ml-1 md:ml-2 text-sm pl-1 ">
                      ({status === 'pending' ? pendingOrders : status === 'processing' ? processingOrders : orders.filter((o) => o.status === 'delivered').length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <i className="ri-error-warning-line text-red-500"></i>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* New Order Alert */}
          {!loading && orders.some((order) => order.status === 'pending' && !order.notificationSent) && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="ri-notification-3-line text-yellow-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-yellow-800">New Orders Available!</p>
                  <p className="text-yellow-700 text-sm">
                    You have {orders.filter((o) => o.status === 'pending' && !o.notificationSent).length} new orders waiting for your attention.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Orders List */}
          <div className="space-y-4">
            {!loading && filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-inbox-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">No orders match your current filter.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-lg font-bold text-gray-900">Order #{order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        {order.notificationSent && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            Notified
                          </span>
                        )}
                        {order.status === 'pending' && !order.notificationSent && (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium animate-pulse">
                            New
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <p className="font-semibold">Customer</p>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                          <p className=" text-sm text-gray-600">{order.phone}</p>
                        </div>

                        <div>
                          <p className="font-semibold">Product & Quantity</p>
                          <p className="text-sm text-gray-600 ">{order.quantity} x {order.product}</p>
                          <p className="text-sm text-green-600 font-medium">KSh {order.totalAmount}</p>
                        </div>

                        <div>
                          <p className="font-semibold">Delivery Location</p>
                          <p className="text-sm text-gray-600 ">{order.location}</p>
                          <p className="text-sm text-gray-600">
                            {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'M-Pesa'}
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold">Order Date</p>
                          <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                        </div>

                        {order.notes && (
                          <div className="md:col-span-2">
                            <p className=" font-semibold">Special Instructions</p>
                            <p className="text-sm text-gray-600">{order.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 lg:w-48">
                      {/* Status Update */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer pr-8"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                      </select>

                      {/* Notify Customer Buttons */}
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            const message = encodeURIComponent(
                              `Hi ${order.customerName}, your order #${order.id} is now being processed and will be delivered soon. Thank you for choosing Tapps Broilers!`
                            );
                            const phone = formatPhoneForWhatsApp(order.phone);
                            // Use window.location.href for better mobile support
                            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                          }}
                          disabled={order.notificationSent}
                          className={`flex-1 px-2 py-2 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                            order.notificationSent
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                          title="Notify via WhatsApp"
                        >
                          <i className="ri-whatsapp-line mr-1"></i> WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const message = encodeURIComponent(
                              `Hi ${order.customerName}, your order #${order.id} is now being processed and will be delivered soon. Thank you for choosing Tapps Broilers!`
                            );
                            window.open(`sms:${order.phone}?body=${message}`, '_blank');
                          }}
                          disabled={order.notificationSent}
                          className={`flex-1 px-2 py-2 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                            order.notificationSent
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          title="Notify via SMS"
                        >
                          <i className="ri-message-3-line mr-1"></i> SMS
                        </button>
                      </div>

                      {/* Call Customer */}
                      <a
                        href={`tel:${order.phone}`}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors text-center whitespace-nowrap cursor-pointer"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <i className="ri-phone-line"></i>
                          <span>Call</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}