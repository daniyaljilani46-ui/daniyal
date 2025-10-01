
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import OrderCTA from './components/OrderCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-brand-offwhite font-sans text-brand-charcoal min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Testimonials />
        <OrderCTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
