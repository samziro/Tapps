/* eslint-disable react/no-unescaped-entities */
'use client';


import Image from "next/image";


export default function QualityStandards() {
  const standards = [
    {
      title: 'Natural Feed Only',
      description: 'Our broilers are fed with carefully selected natural grains and supplements, free from harmful chemicals and artificial additives.'
    },
    {
      title: 'Spacious Living Conditions',
      description: 'Each bird has adequate space to move freely, ensuring they develop naturally and maintain good health throughout their growth.'
    },
    {
      title: 'Regular Health Monitoring',
      description: 'Our team conducts daily health checks and works with qualified veterinarians to maintain the highest health standards.'
    },
    {
      title: 'Stress-Free Environment',
      description: 'We maintain quiet, clean environments that minimize stress, resulting in healthier, better-tasting meat.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>

            <Image
              width={400}
              height={400}
              src="/close_up.jpg"
              alt="Quality Standards"
              className="w-full object-cover object-top rounded-2xl shadow-xl"

            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Quality Standards
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              At Tapps Broilers Enterprise, quality isn't negotiable. We've established rigorous standards that ensure every broiler meets our high expectations before reaching your table.
            </p>
            
            <div className="space-y-6">
              {standards.map((standard, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <i className="ri-check-line text-green-600 font-bold"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{standard.title}</h3>
                    <p className="text-gray-600">{standard.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <i className="ri-award-line text-2xl text-green-600"></i>
                <h4 className="font-semibold text-green-800">Our Commitment</h4>
              </div>
              <p className="text-green-700">
                Every broiler from Tapps Broilers Enterprise represents our commitment to excellence, health, and the satisfaction of our customers across Kenya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
