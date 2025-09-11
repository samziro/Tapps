'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

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
  notifications: Array<{
    message: string;
    timestamp: string;
    type: 'info' | 'success' | 'warning';
  }>;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setOrder(null);

    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = savedOrders.find((o: Order) => 
      o.id === orderId && o.phone === phone
    );

    setTimeout(() => {
      if (foundOrder) {
        // Add default notifications based on order status
        const notifications = [];
        
        notifications.push({
          message: `Order #${foundOrder.id} has been received and is being prepared.`,
          timestamp: foundOrder.orderDate,
          type: 'info' as const
        });

        if (foundOrder.status === 'processing' || foundOrder.status === 'delivered') {
          notifications.push({
            message: 'Your order is now being processed and prepared for delivery.',
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            type: 'info' as const
          });
        }

        if (foundOrder.status === 'delivered') {
          notifications.push({
            message: 'Your order has been delivered successfully. Thank you for choosing us!',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            type: 'success' as const
          });
        }

        setOrder({
          ...foundOrder,
          notifications: foundOrder.notifications || notifications
        });
      } else {
        setError('Order not found. Please check your Order ID and phone number.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'ri-time-line';
      case 'processing': return 'ri-truck-line';
      case 'delivered': return 'ri-check-double-line';
      default: return 'ri-information-line';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'ri-check-line';
      case 'warning': return 'ri-alert-line';
      default: return 'ri-information-line';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-600">Enter your order details to see the latest updates</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your 6-digit order ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Phone number used for the order"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  'Track Order'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-2">
                <i className="ri-error-warning-line text-red-600"></i>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Order #{order.id}</h2>
                <div className={`px-4 py-2 rounded-full border-2 font-medium ${getStatusColor(order.status)}`}>
                  <div className="flex items-center space-x-2">
                    <i className={`${getStatusIcon(order.status)} text-lg`}></i>
                    <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Product:</span> {order.quantity}x {order.product}</p>
                    <p><span className="text-gray-600">Total Amount:</span> <span className="font-semibold text-green-600">KSh {order.totalAmount}</span></p>
                    <p><span className="text-gray-600">Payment:</span> {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'M-Pesa'}</p>
                    <p><span className="text-gray-600">Order Date:</span> {formatDate(order.orderDate)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Customer:</span> {order.customerName}</p>
                    <p><span className="text-gray-600">Phone:</span> {order.phone}</p>
                    <p><span className="text-gray-600">Location:</span> {order.location}</p>
                    {order.notes && (
                      <p><span className="text-gray-600">Notes:</span> {order.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Progress</h3>
              
              <div className="space-y-4">
                {/* Pending */}
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'pending' || order.status === 'processing' || order.status === 'delivered' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <i className="ri-shopping-bag-3-line"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Order Received</p>
                    <p className="text-sm text-gray-600">Your order has been received and is being prepared</p>
                  </div>
                  {(order.status === 'pending' || order.status === 'processing' || order.status === 'delivered') && (
                    <i className="ri-check-line text-green-600 text-xl"></i>
                  )}
                </div>

                {/* Processing */}
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'processing' || order.status === 'delivered' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <i className="ri-truck-line"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-gray-600">Your order is being prepared and packed for delivery</p>
                  </div>
                  {(order.status === 'processing' || order.status === 'delivered') && (
                    <i className="ri-check-line text-green-600 text-xl"></i>
                  )}
                </div>

                {/* Delivered */}
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'delivered' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <i className="ri-check-double-line"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Delivered</p>
                    <p className="text-sm text-gray-600">Your order has been delivered successfully</p>
                  </div>
                  {order.status === 'delivered' && (
                    <i className="ri-check-line text-green-600 text-xl"></i>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Updates</h3>
              
              {order.notifications && order.notifications.length > 0 ? (
                <div className="space-y-4">
                  {order.notifications.map((notification, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                        <i className={`${getNotificationIcon(notification.type)} text-sm`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{notification.message}</p>
                        <p className="text-sm text-gray-600 mt-1">{formatDate(notification.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-notification-3-line text-gray-400 text-2xl"></i>
                  </div>
                  <p className="text-gray-600">No updates available yet</p>
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="text-center">
                <h3 className="font-semibold text-green-800 mb-2">Need Help?</h3>
                <p className="text-green-700 mb-4">Contact us if you have any questions about your order</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="tel:+254712345678"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <i className="ri-phone-line"></i>
                      <span>Call Us</span>
                    </div>
                  </a>
                  <Link
                    href="/"
                    className="bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-xl hover:bg-green-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
    
  );
}