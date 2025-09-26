'use client';

export default function AboutHero() {
  return (
    <section 
      className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/bg.jpg')`

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
        <p>We&apos;re committed to quality.</p>
      </div>
    </section>
  );
}
