import React, { useRef, useEffect, useState } from 'react';

// --- ICONS ---
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-brand-gold flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L12 15" />
    </svg>
);
const InstructionsIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);


// --- TYPES ---
interface Product {
  size: string;
  price: string;
  imageUrl: string;
  ingredients: string;
  howToUse: string;
  keyBenefits: string[];
}

// --- HOOKS ---
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


// --- COMPONENTS ---
const ProductModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
    const scrollToOrder = () => {
        document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image Column */}
                <div className="flex items-center justify-center bg-brand-light-gray rounded-lg p-4 h-80 md:h-auto">
                    <img src={product.imageUrl} alt={`SHINE X Hair Oil ${product.size}`} className="max-h-full w-auto object-contain" />
                </div>

                {/* Details Column */}
                <div className="flex flex-col">
                    <h2 className="text-3xl font-serif font-bold text-brand-charcoal">{`SHINE X Hair Oil (${product.size})`}</h2>
                    <p className="text-3xl font-bold text-brand-gold my-3">{product.price}</p>
                    
                    <div className="space-y-4 text-gray-700 mt-4 text-sm">
                        <div>
                            <h4 className="font-bold text-lg text-brand-charcoal mb-2 flex items-center"><CheckIcon/>Key Benefits</h4>
                            <ul className="space-y-1 list-inside">
                                {product.keyBenefits.map(benefit => (
                                    <li key={benefit} className="flex items-start"><span className="text-brand-gold mr-2">&#8226;</span>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-lg text-brand-charcoal mb-2 flex items-center"><InstructionsIcon/>How to Use</h4>
                            <p>{product.howToUse}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-brand-charcoal mb-2 flex items-center"><LeafIcon/>Ingredients</h4>
                            <p className="italic">{product.ingredients}</p>
                        </div>
                    </div>

                    <button 
                        onClick={scrollToOrder}
                        className="bg-brand-gold hover:bg-brand-dark-gold text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 w-full mt-auto"
                        >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductCard: React.FC<{ product: Product; isVisible: boolean; delay: number; onDetailsClick: () => void; }> = ({ product, isVisible, delay, onDetailsClick }) => {
  return (
    <div
      className={`group bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-96 bg-brand-light-gray overflow-hidden">
        <img
          src={product.imageUrl}
          alt={`SHINE X Hair Oil ${product.size}`}
          className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6 text-center flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-serif font-bold text-brand-charcoal">SHINE X Hair Oil</h3>
          <p className="text-gray-500 mb-2">{product.size}</p>
          <p className="text-3xl font-bold text-brand-gold mb-4">{product.price}</p>
        </div>
        <button
          onClick={onDetailsClick}
          className="bg-brand-charcoal text-white font-bold py-2 px-6 rounded-full transform transition-all duration-300 w-full mt-4 group-hover:bg-brand-gold group-hover:scale-105"
        >
          View Details
        </button>
      </div>
    </div>
  );
};


const Products: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productList: Product[] = [
    {
      size: "60ml Bottle",
      price: "399 Rs",
      imageUrl: "https://images.pexels.com/photos/7262995/pexels-photo-7262995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      keyBenefits: [
        "Reduces hair fall and breakage.",
        "Promotes new hair growth.",
        "Adds a natural, healthy shine.",
        "Soothes dry and itchy scalp."
      ],
      howToUse: "Apply a few drops to your scalp and massage gently for 5-10 minutes. For best results, leave overnight and wash with a mild shampoo.",
      ingredients: "Rosemary Oil, Argan Oil, Coconut Oil, Almond Oil, Vitamin E, and a blend of natural herbs."
    },
    {
      size: "100ml Bottle",
      price: "699 Rs",
      imageUrl: "https://images.pexels.com/photos/8466661/pexels-photo-8466661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      keyBenefits: [
        "Intensive nourishment for damaged hair.",
        "Strengthens hair from root to tip.",
        "Controls frizz and smooths texture.",
        "Protects against environmental damage."
      ],
      howToUse: "Take a generous amount and apply thoroughly from root to tip. Massage into scalp for deep nourishment. Leave on for at least 2 hours or overnight before washing.",
      ingredients: "Rosemary Oil, Argan Oil, Jojoba Oil, Castor Oil, Coconut Oil, Almond Oil, Vitamin E, and a blend of natural herbs."
    }
  ];

  return (
    <>
      <section id="products" className="py-20 bg-brand-offwhite overflow-hidden">
        <div ref={ref} className="container mx-auto px-6">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-serif font-bold text-center text-brand-charcoal mb-12">Choose Your Perfect Size</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
            {productList.map((product, index) => (
              <ProductCard
                key={product.size}
                product={product}
                isVisible={isVisible}
                delay={index * 150}
                onDetailsClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      </section>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
};

export default Products;