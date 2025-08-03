'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="font-['Pacifico'] text-2xl text-gray-900">Tapps Broilers</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
              About
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
              Products
            </Link>
            <Link href="/track" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
              Track Order
            </Link>
            <Link href="/order" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
              Order Now
            </Link>
            <Link href="/admin/login" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-shield-user-line text-lg"></i>
              </div>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                About
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Products
              </Link>
              <Link href="/track" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Track Order
              </Link>
              <Link href="/order" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors text-center whitespace-nowrap cursor-pointer">
                Order Now
              </Link>
              <Link href="/admin/login" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Admin Access
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}