
'use client';

export default function AboutHero() {
  return (
    <section 
      className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=Beautiful%20modern%20chicken%20farm%20in%20Kenya%20with%20green%20rolling%20hills%2C%20traditional%20farming%20structures%2C%20and%20pastoral%20countryside%20setting%20with%20warm%20golden%20lighting%20and%20peaceful%20rural%20atmosphere%20showcasing%20sustainable%20agriculture%20practices&width=1400&height=800&seq=about-hero-farm&orientation=landscape')`
      }}
    >
      <div className="text-center text-white max-w-4xl px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Our Story
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed">
          From humble beginnings in Watamu to becoming Kenya's trusted source for premium farm-fresh broilers
        </p>
        <div className="inline-block bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-8 py-3">
          <p className="font-['Pacifico'] text-green-300 text-lg">Fresh from our farm to your table</p>
        </div>
      </div>
    </section>
  );
}
