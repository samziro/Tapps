
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Behind every quality broiler is a dedicated team of professionals who care about what they do.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              width={800}
              height={800}
              src="/team.jpg"
              alt="Our Dedicated Team"
              className="w-full object-cover object-top rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Passionate About Quality
            </h3>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                Our team consists of experienced farmers, animal care specialists, and quality control experts who share a common passion for raising the finest broilers in Kenya.
              </p>
              <p className="text-lg leading-relaxed">
                From early morning care routines to final quality checks, every team member plays a crucial role in ensuring that our broilers meet the exceptional standards our customers expect.
              </p>
              <p className="text-lg leading-relaxed">
                We believe that happy, well-trained staff leads to healthier birds and better products for our customers.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-heart-line text-green-600 text-xl"></i>
                </div>
                <div className="font-semibold text-gray-900">Expert Care</div>
                <div className="text-sm text-gray-600">Trained professionals</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-time-line text-green-600 text-xl"></i>
                </div>
                <div className="font-semibold text-gray-900">24/7 Monitoring</div>
                <div className="text-sm text-gray-600">Round-the-clock care</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-green-600 text-white py-16 px-8 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h3>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of satisfied customers who trust Tapps Broilers Enterprise for their family's needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/products" className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
                View Our Broilers
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors cursor-pointer whitespace-nowrap">
                Contact Us Today
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-2 text-green-100">
              <i className="ri-phone-line"></i>
              <span>Call us at 0769751566</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
