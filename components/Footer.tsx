import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-charcoal text-brand-offwhite">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-serif font-bold">
              SHINE <span className="text-brand-gold">X</span>
            </h3>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-300">Business Owner: <span className="font-semibold text-white">M. Naveed</span></p>
            <p className="text-gray-400 mt-1">
              Website Developed by <a href="mailto:daniyal@example.com" className="font-semibold text-white hover:underline">M. Daniyal</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;