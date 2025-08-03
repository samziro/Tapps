
'use client';

export default function OurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Rooted in Tradition, Driven by Quality
            </h2>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                Tapps Broilers Enterprise was founded with a simple vision: to provide families across Kenya with the freshest, healthiest broilers straight from our farm in the beautiful coastal region of Watamu.
              </p>
              <p className="text-lg leading-relaxed">
                Located in the serene area of Jiwe-leupe, our farm has been carefully developed to ensure optimal conditions for raising premium broilers. We combine traditional farming wisdom with modern sustainable practices to deliver birds that meet the highest standards of quality and taste.
              </p>
              <p className="text-lg leading-relaxed">
                Every day, we wake up committed to our motto: "Fresh from our farm to your table." This isn't just a slogan – it's our promise to you and your family.
              </p>
            </div>
            <div className="mt-8 flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">5+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">1000+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-500">Farm Fresh</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://readdy.ai/api/search-image?query=Traditional%20Kenyan%20poultry%20farmer%20in%20rural%20farming%20environment%20with%20healthy%20chickens%20roaming%20freely%20in%20natural%20outdoor%20setting%2C%20warm%20lighting%2C%20authentic%20African%20farming%20lifestyle%20with%20lush%20green%20vegetation%20and%20traditional%20structures&width=600&height=700&seq=story-farmer&orientation=portrait"
              alt="Our Farm Story"
              className="w-full h-[500px] object-cover object-top rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center space-x-3">
                <i className="ri-map-pin-line text-2xl"></i>
                <div>
                  <div className="font-semibold">Located in</div>
                  <div className="text-sm">Jiwe-leupe, Watamu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
