'use client';

const features = [
  {
    icon: 'ri-hotel-line',
    title: 'Hotels & Resorts',
    description: [
      'Consistent broiler sizes for professional kitchens',
      'Reliable supply for daily and peak-season demand',
      'Early delivery to keep operations running smoothly',
    ],
  },
  {
    icon: 'ri-restaurant-line',
    title: 'Restaurants & Cafés',
    description: [
      'Flexible order quantities',
      'Affordable bulk pricing',
      'Dependable local supplier you can trust',
    ],
  },
  {
    icon: 'ri-home-heart-line',
    title: 'Households',
    description: [
      'Fresh chicken without the market hassle',
      'Clean processing and safe handling',
      'Convenient ordering and delivery',
    ],
  },
];

export default function WhoWeServe() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Who We Supply
          </h2>
          <p className="text-xl text-gray-600">
            We proudly serve customers who depend on quality, hygiene, and consistency.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`${feature.icon} text-green-600 text-2xl`} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <ul className="text-gray-600 space-y-2">
                {feature.description.map((item, index) => (
                  <li key={index}><i className="ri-check-line"></i> {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
