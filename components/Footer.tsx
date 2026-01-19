
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/favicon.png"
                alt="Tapps Broilers Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h3 className="font-['Pacifico'] text-xl text-green-400">Tapps Broilers</h3>
                <p className="text-xs text-gray-400">Fresh from our farm to your table</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Tapps Broilers is a locally based broiler chicken supplier in Watamu, Kenya, providing fresh and hygienically processed chicken to hotels, restaurants, cafés, and households with fast and reliable delivery.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  Our Broilers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="tel:0769751566" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <i className="ri-map-pin-line text-green-400"></i>
                <span className="text-gray-300">Jiwe-leupe, Watamu, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-phone-line text-green-400"></i>
                <span className="text-gray-300">0769751566</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-time-line text-green-400"></i>
                <span className="text-gray-300">Mon-Sun: 6AM - 8PM</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Promise</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <i className="ri-heart-line text-green-400"></i>
                <span className="text-gray-300">Farm Fresh Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-shield-check-line text-green-400"></i>
                <span className="text-gray-300">Healthy & Safe</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-truck-line text-green-400"></i>
                <span className="text-gray-300">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Tapps Broilers Enterprise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
