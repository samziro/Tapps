/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OrderPage() {
  const [selectedProduct, setSelectedProduct] = useState('whole');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    location: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const products = [
    { id: 'whole', name: 'Whole Broiler', price: 500, weight: '1.2 - 1.8kg' },
   
  ];

  const selectedProductData = products.find(p => p.id === selectedProduct);
  const totalAmount = selectedProductData ? selectedProductData.price * quantity : 0;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };



  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customerName: customerInfo.name,
      phone: customerInfo.phone.replace(/\D/g, ''),
      location: customerInfo.location,
      product: selectedProductData?.name,
      quantity: quantity,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
      notes: customerInfo.notes
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const result = await res.json();
      setIsSubmitting(false);
      if (res.ok && result.orderId) {
        setOrderId(result.orderId);
        setOrderSubmitted(true);
      } else {
        alert(result.error || 'Failed to submit order. Please try again.');
      }
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
      alert('Failed to submit order. Please try again.');
    }
  };

  if (orderSubmitted) {
    return (

      <div className="min-h-dvh bg-gray-50 pt-24 pb-12">

        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-green-600 text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Submitted Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll contact you shortly at {customerInfo.phone} to confirm your order and arrange delivery.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Order Summary:</h3>
              <p className="text-sm text-gray-600 mb-2">Order ID: #{orderId}</p>
              <p className='text-bold'>{quantity}x {selectedProductData?.name} - KSh {totalAmount}</p>
              <p className="text-sm text-gray-600">Payment: {paymentMethod === 'cash' ? 'Cash on Delivery' : 'M-Pesa'}</p>
            </div>
            <Link href="/" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Place Your Order</h1>
          <p className="text-gray-600">Fresh broilers delivered straight from our farm to your table</p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Select Your Broiler</h2>

            <div className="space-y-4 mb-6">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedProduct === product.id 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.weight}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">KSh {product.price}</p>
                      <div className={`w-4 h-4 rounded-full border-2 mt-2 ${
                        selectedProduct === product.id 
                          ? 'bg-green-600 border-green-600' 
                          : 'border-gray-300'
                      }`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-4">
                <button 
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  <i className="ri-subtract-line"></i>
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button 
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
              <div className="space-y-3">
                <div 
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex items-center space-x-3 ${
                    paymentMethod === 'cash' 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    paymentMethod === 'cash' 
                      ? 'bg-green-600 border-green-600' 
                      : 'border-gray-300'
                  }`}></div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-hand-coin-line text-xl text-green-600"></i>
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when we deliver</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex items-center space-x-3 ${
                    paymentMethod === 'mpesa' 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setPaymentMethod('mpesa')}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    paymentMethod === 'mpesa' 
                      ? 'bg-green-600 border-green-600' 
                      : 'border-gray-300'
                  }`}></div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-smartphone-line text-xl text-green-600"></i>
                    <div>
                      <p className="font-medium">M-Pesa Payment</p>
                      <p className="text-sm text-gray-600">Pay via mobile money</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Your Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="07xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your delivery address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                <textarea
                  value={customerInfo.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
                  placeholder="Any special requests or delivery instructions"
                  maxLength={500}
                ></textarea>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <input id="agreeTerms" className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" required type="checkbox" />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700 cursor-pointer"><span className="font-medium">I agree to the payment terms:</span><br />I understand that cash payments are due upon delivery and orders cannot be cancelled once confirmed.</label>
                  </div>
                  </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mt-6">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{selectedProductData?.name}</span>
                  <span>KSh {selectedProductData?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span>{quantity}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-green-600">KSh {totalAmount}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Payment: {paymentMethod === 'cash' ? 'Cash on Delivery' : 'M-Pesa'}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors mt-6 disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting Order...</span>
                </div>
              ) : (
                'Place Order'
              )}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              By placing an order, you agree to our delivery terms. We'll contact you to confirm your order within 30 minutes.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
