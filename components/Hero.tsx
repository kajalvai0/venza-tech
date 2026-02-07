
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Slide } from '../types';

interface HeroProps {
  slides: Slide[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  const slide = slides[0] || {
    title: 'সর্বোচ্চ',
    highlight: '৫০% ছাড়',
    subtitle: 'আপনার প্রিয় গ্যাজেট এখন আরও সাশ্রয়ী দামে।',
    image: 'https://picsum.photos/seed/venza-hero/1920/1080',
    cta: 'এখনই কিনুন'
  };

  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-slate-900 transition-all duration-500">
      <div className="absolute inset-0">
        <img 
          src={slide.image} 
          alt="High-end gadgets" 
          className="w-full h-full object-cover opacity-60 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 h-full relative flex items-center">
        <div className="max-w-2xl text-white space-y-6">
          <div className="inline-block px-4 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
            সীমিত সময়ের অফার
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {slide.title} <span className="text-blue-500">{slide.highlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-lg">
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95">
              {slide.cta}
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold transition-all">
              অফার দেখুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
