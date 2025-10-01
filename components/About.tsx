import React, { useEffect, useRef, useState } from 'react';

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L12 15" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
  </svg>
);

const DropletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048l8.28-8.28.012.012z" />
    </svg>
);

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


const About: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const benefits = [
    {
      icon: <DropletIcon />,
      title: 'Moisturizes',
      description: 'Deeply hydrates each strand, leaving your hair soft and silky smooth.',
    },
    {
      icon: <ShieldIcon />,
      title: 'Protects',
      description: 'Forms a natural barrier against environmental damage and heat styling.',
    },
    {
      icon: <LeafIcon />,
      title: 'Nourishes',
      description: 'Infused with essential nutrients from Rosemary & Argan to promote healthy growth.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-serif font-bold text-brand-charcoal mb-4">Purely Natural, Powerfully Effective</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-12">
            SHINE X is crafted from a blend of nature's finest ingredients to give your hair the care it deserves.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="p-4 bg-brand-light-gray rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-serif font-semibold text-brand-charcoal mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;