/* eslint-disable react/no-unescaped-entities */
'use client';

export default function WhyChooseUs() {
  const features = [
    {
      icon: 'ri-heart-line',
      title: 'Farm Fresh Quality',
      description: 'Our broilers are raised in optimal conditions with natural feed and plenty of space to ensure the highest quality meat.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Health & Safety First',
      description: 'We follow strict health protocols and regular veterinary check-ups to ensure our birds are healthy and safe for consumption.'
    },
    {
      icon: 'ri-leaf-line',
      title: 'Sustainable Farming',
      description: 'Our farming practices are environmentally friendly and sustainable, contributing to the local ecosystem in Watamu.'
    },
    {
      icon: 'ri-truck-line',
      title: 'Fast Delivery',
      description: 'We ensure quick delivery to maintain freshness from our farm directly to your kitchen table, On agreed terms.'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Fair Pricing',
      description: 'At KSh 500 each, we offer competitive pricing without compromising on the quality you deserve.'
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Personal Service',
      description: 'Every customer receives personalized attention. Call us at 0769751566 for direct communication with our team.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Tapps Broilers?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another poultry farm. We're your neighbors in Watamu, committed to providing you with the best broilers in Kenya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i className={`${feature.icon} text-2xl text-green-600`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
