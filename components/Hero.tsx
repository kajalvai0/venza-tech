
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Slide } from '../types';

interface HeroProps {
  slides: Slide[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  if (slides.length === 0) return null;

  return (
    <section className="relative h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden bg-slate-950 group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === current 
                ? 'opacity-100 scale-100 translate-x-0' 
                : 'opacity-0 scale-105 translate-x-10 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 h-full relative flex items-center">
              <div className={`max-w-2xl text-white space-y-6 transition-all duration-700 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="inline-block px-4 py-1.5 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20">
                  এক্সক্লুসিভ কালেকশন
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter">
                  {slide.title} <br/>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-fill-transparent text-blue-400">
                    {slide.highlight}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 font-medium max-w-lg leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-5 pt-4">
                  <button className="px-10 py-4 bg-white text-slate-950 hover:bg-blue-600 hover:text-white rounded-2xl font-black text-lg flex items-center gap-3 transition-all transform active:scale-95 shadow-xl">
                    {slide.cta}
                    <ArrowRight size={22} strokeWidth={3} />
                  </button>
                  <button className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/30 rounded-2xl font-bold text-lg transition-all">
                    অফারগুলো দেখুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/20 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-30 border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/20 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-30 border border-white/10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 transition-all duration-500 rounded-full ${
                  i === current ? 'w-10 bg-blue-500' : 'w-2.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Aesthetic Overlay Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-10 pointer-events-none" />
    </section>
  );
};

export default Hero;
