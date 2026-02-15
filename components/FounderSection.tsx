
import React from 'react';
import { SiteSettings } from '../types';
import { Quote } from 'lucide-react';

interface FounderSectionProps {
  settings: SiteSettings;
}

const FounderSection: React.FC<FounderSectionProps> = ({ settings }) => {
  if (!settings.showFounder) return null;

  return (
    <section className="py-24 bg-slate-950 overflow-hidden relative">
      {/* Background Tech Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Container with Glow Effect */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={settings.founderImageUrl} 
                alt={settings.founderName} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              
              {/* Floating Tech Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                <p className="text-white font-black text-lg tracking-tight uppercase">{settings.logoText || 'VENZA TECH'}</p>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">{settings.founderRole}</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-px bg-blue-500"></span>
                <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-sm">আমাদের কথা</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter">
                আমরা প্রযুক্তিতে <br/> 
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-fill-transparent text-blue-400">বিশ্বাস রাখি</span>
              </h2>
            </div>
            
            <div className="relative">
              <Quote className="absolute -top-6 -left-8 text-white/5 w-20 h-20" />
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium italic">
                "{settings.founderBio}"
              </p>
            </div>

            <div className="pt-6">
              <h4 className="text-2xl font-bold text-white">{settings.founderName}</h4>
              <p className="text-slate-500 font-bold mt-1">{settings.founderRole}</p>
            </div>

            <div className="flex gap-4 pt-4">
               <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                 বিস্তারিত জানুন
               </button>
               <button className="px-8 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl font-bold transition-all">
                 আমাদের টিম
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
