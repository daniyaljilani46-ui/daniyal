import React, { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isIntersecting] as const;
};

const testimonials = [
  {
    name: 'Jessica M.',
    quote: 'SHINE X has completely transformed my hair! It\'s softer, stronger, and has a beautiful shine I never thought was possible. I get compliments all the time!',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
  },
  {
    name: 'Sarah L.',
    quote: 'I was skeptical at first, but this hair oil is magic. My hair fall has reduced significantly, and my scalp feels so much healthier. Highly recommended!',
    image: 'https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
  },
  {
    name: 'Emily R.',
    quote: 'The natural ingredients are what drew me in, and the results are what made me stay. My frizzy hair is finally manageable and smooth. I love this product!',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
  },
];

const StarIcon = () => (
  <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const nextSlide = () => setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? testimonials.length - 1 : current - 1);

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div ref={ref} className="container mx-auto px-6">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-serif font-bold text-center text-brand-charcoal mb-4">What Our Customers Say</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-center mb-12">
            Real stories from real users who love their new hair.
          </p>
        </div>
        
        <div className={`relative max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '150ms' }}>
          <div className="relative h-[450px] md:h-[350px] overflow-hidden rounded-lg bg-brand-offwhite shadow-lg">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="flex flex-col md:flex-row items-center h-full">
                  <div className="w-full md:w-1/3 h-1/2 md:h-full flex-shrink-0">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 text-left flex flex-col justify-center">
                    <div className="flex mb-4">
                      {Array(testimonial.rating).fill(0).map((_, i) => <StarIcon key={i} />)}
                    </div>
                    <blockquote className="text-lg italic text-gray-700 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="mt-4 font-bold text-brand-charcoal text-lg">- {testimonial.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button onClick={prevSlide} aria-label="Previous testimonial" className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white/80 hover:bg-white text-brand-charcoal p-3 rounded-full shadow-md transition-all duration-300 z-10">
            <ChevronLeft />
          </button>
          <button onClick={nextSlide} aria-label="Next testimonial" className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white/80 hover:bg-white text-brand-charcoal p-3 rounded-full shadow-md transition-all duration-300 z-10">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;