
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Fresh from Our Farm
            <span className="block text-green-400">To Your Table</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Premium quality broilers raised with care in Watamu, Kenya. Experience the difference of truly fresh, healthy poultry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
              Order Fresh Broilers - KSh 500 Each
            </Link>
            <Link href="/products" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors whitespace-nowrap cursor-pointer">
              View Our Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Tapps Broilers?</h2>
            <p className="text-xl text-gray-600">Experience the difference of farm-fresh quality</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-leaf-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Farm Fresh</h3>
              <p className="text-gray-600">
                Our broilers are raised naturally on our farm in Watamu, ensuring the freshest quality for your family.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-shield-check-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                Each broiler is carefully selected and processed to meet the highest standards of quality and freshness.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-truck-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery service throughout Watamu and surrounding areas to ensure freshness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Broilers</h2>
            <p className="text-xl text-gray-600">Fresh, healthy, and ready for your table</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://readdy.ai/api/search-image?query=High%20quality%20fresh%20broiler%20chicken%20meat%20cuts%20displayed%20professionally%20on%20clean%20white%20background%2C%20premium%20poultry%20products%20showcase%2C%20commercial%20food%20photography%20with%20natural%20lighting%2C%20fresh%20chicken%20pieces%20arranged%20beautifully%20for%20retail%20display&width=600&height=500&seq=product-showcase&orientation=landscape"
                alt="Fresh Broiler Products"
                className="rounded-2xl shadow-2xl object-cover object-top w-full h-96"
              />
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Premium Fresh Broilers</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <i className="ri-check-line text-green-600 text-xl"></i>
                  <span className="text-lg">Raised naturally without hormones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-check-line text-green-600 text-xl"></i>
                  <span className="text-lg">Fed with premium quality feed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-check-line text-green-600 text-xl"></i>
                  <span className="text-lg">Processed in clean, hygienic conditions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-check-line text-green-600 text-xl"></i>
                  <span className="text-lg">Average weight: 2-3 kg per broiler</span>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">KSh 500</span>
                  <span className="text-gray-600">per broiler</span>
                </div>
              </div>

              <Link href="/order" className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors inline-block whitespace-nowrap cursor-pointer">
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-green-600 text-white text-center py-6">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Ready to Order Fresh Broilers?</h2>
          <p className="text-green-100 mb-6">
            Get farm-fresh broilers delivered to your doorstep in Watamu and surrounding areas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-shopping-bag-3-line"></i>
                <span>Place Order Now</span>
              </div>
            </Link>
            <Link
              href="/track"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-truck-line"></i>
                <span>Track Your Order</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Farm Fresh Quality?</h2>
          <p className="text-xl mb-8">
            Contact us today to place your order and taste the difference of genuine farm-fresh broilers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
              Place Your Order
            </Link>
            <a href="tel:0769751566" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors whitespace-nowrap cursor-pointer">
              Call 0769751566
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
