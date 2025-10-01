import React, { useRef, useEffect, useState } from 'react';

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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


const OrderCTA: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const phoneNumber = '03057427271';
  const whatsappLink = `https://wa.me/92${phoneNumber.substring(1)}`;
  const telLink = `tel:+92${phoneNumber.substring(1)}`;

  return (
    <section id="order" className="py-20 bg-white overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 text-center">
        <div className={`max-w-3xl mx-auto bg-brand-offwhite p-8 md:p-12 rounded-xl shadow-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-serif font-bold text-brand-charcoal mb-4">Ready for Healthier Hair?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Place your order today by contacting us directly. We're here to help!
          </p>
          <div className="bg-white p-6 rounded-lg shadow-inner mb-8">
            <p className="text-lg text-gray-700">Business Owner: <span className="font-semibold">M. Naveed</span></p>
            <p className="text-4xl font-bold text-brand-charcoal my-2 tracking-wider">{phoneNumber}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
            >
              <WhatsAppIcon />
              Order on WhatsApp
            </a>
            <a
              href={telLink}
              className="flex items-center justify-center w-full md:w-auto bg-brand-charcoal hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
            >
              <PhoneIcon/>
              Call to Order
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderCTA;