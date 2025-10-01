import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: "Elegance in Every Drop",
    subtitle: "Discover the secret to naturally radiant hair with our exclusive blend of pure oils.",
    imageUrl: "https://images.pexels.com/photos/2433347/pexels-photo-2433347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A woman with long, shiny, healthy hair, showcasing the results of the hair oil.",
  },
  {
    title: "The Essence of Nature",
    subtitle: "Crafted with potent botanicals like Rosemary & Argan to revitalize and nourish.",
    imageUrl: "https://images.pexels.com/photos/1642823/pexels-photo-1642823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A view from the back of a woman with very long and healthy brown hair.",
  },
  {
    title: "Unlock Luminous Shine",
    subtitle: "Transform dull, tired hair into a mane of strength, softness, and brilliant shine.",
    imageUrl: "https://images.pexels.com/photos/3738347/pexels-photo-3738347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A close-up of a woman's shiny, wavy hair reflecting the light.",
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Images & Overlay */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.imageUrl}
            alt={slide.alt}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Animated Text */}
        <div className="min-h-[150px] md:min-h-[200px] flex flex-col justify-center">
            <div key={currentSlide} className="animate-fade-in-up">
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg md:text-2xl font-light mx-auto drop-shadow-md max-w-2xl">
                {slides[currentSlide].subtitle}
              </p>
            </div>
        </div>
        
        {/* Call to Action Button */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={scrollToProducts}
              className="bg-brand-gold hover:bg-brand-dark-gold text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Discover Our Products
            </button>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;