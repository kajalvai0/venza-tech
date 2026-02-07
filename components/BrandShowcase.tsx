
import React from 'react';
import { BRANDS } from '../constants';

const BrandShowcase: React.FC = () => {
  return (
    <section className="py-16 container mx-auto px-4 border-t border-slate-100">
      <h2 className="text-center text-slate-400 font-medium uppercase tracking-[0.2em] mb-12 text-sm">
        আমাদের টপ পার্টনার ব্র্যান্ডসমূহ
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-12 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
        {BRANDS.map((brand, i) => (
          <div key={i} className="flex justify-center group">
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-110" 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandShowcase;
