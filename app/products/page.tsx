
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Whole Fresh Broiler",
      description: "Complete broiler, perfectly cleaned and ready for cooking. Average weight 2-3 kg.",
      price: 500,
      image: "Premium whole fresh broiler chicken on white background, clean and professionally presented, commercial food photography with natural lighting, high quality poultry product for retail display"
    },
    {
      id: 2,
      name: "Broiler Cuts - Mixed",
      description: "Assorted premium cuts including breast, thighs, wings, and drumsticks.",
      price: 550,
      image: "Fresh broiler chicken cuts mixed pieces including breast thighs wings drumsticks on white background, premium poultry cuts professionally arranged, commercial food photography"
    },
    {
      id: 3,
      name: "Broiler Breast",
      description: "Premium boneless broiler breast meat, perfect for grilling and roasting.",
      price: 650,
      image: "Fresh boneless broiler chicken breast meat on white background, premium quality poultry cuts, clean commercial food photography with natural lighting"
    },
    {
      id: 4,
      name: "Broiler Thighs & Drumsticks",
      description: "Tender and juicy thighs and drumsticks, great for family meals.",
      price: 480,
      image: "Fresh broiler chicken thighs and drumsticks on white background, premium quality poultry pieces, commercial food photography with natural lighting"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 

        className="relative h-[75dvh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hero.jpg')`,

          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Premium Broilers</h1>
          <p className="text-xl">Fresh, healthy, and raised with care in Watamu, Kenya</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Cut</h2>
            <p className="text-xl text-gray-600">All our broilers are farm-fresh and processed with the highest standards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square">
                  <img 
                    src={`https://readdy.ai/api/search-image?query=$%7Bproduct.image%7D&width=400&height=400&seq=product-${product.id}&orientation=squarish`}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-green-600">
                      KSh {product.price}
                    </div>
                    <Link href="/order" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Quality Promise</h2>
            <p className="text-xl text-gray-600">Every broiler meets our strict quality standards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-pulse-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Healthy Rearing</h3>
              <p className="text-gray-600 text-sm">Raised in clean, spacious environments with proper ventilation</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-restaurant-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Feed</h3>
              <p className="text-gray-600 text-sm">Fed with high-quality, nutritious feed for optimal growth</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Safe Processing</h3>
              <p className="text-gray-600 text-sm">Processed in hygienic conditions following safety protocols</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-timer-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fresh Delivery</h3>
              <p className="text-gray-600 text-sm">Delivered fresh to maintain quality and taste</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Order Fresh Broilers?</h2>
          <p className="text-xl mb-8">
            Contact us today and experience the difference of farm-fresh quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
              Place Order Now
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
