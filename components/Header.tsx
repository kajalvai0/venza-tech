
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Phone, Menu, LayoutDashboard, MoreVertical, X, UserCircle, Zap } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenAdmin: () => void;
  settings: SiteSettings;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenAdmin, settings }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full relative">
      {/* Full Page Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
          <div className="container mx-auto px-6 py-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                 <div className="logo-3d-wrapper logo-float">
                    <span 
                      className="logo-3d-text text-2xl md:text-3xl tracking-tighter"
                      data-text={settings.logoText || 'VENZA TECH'}
                    >
                      {settings.logoText || 'VENZA TECH'}
                    </span>
                 </div>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all">
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col gap-8">
              {['স্মার্টফোন', 'ল্যাপটপ', 'অডিও', 'স্মার্টওয়াচ', 'অফারসমূহ'].map((item, idx) => (
                <a key={idx} href="#" className="text-4xl font-bold text-white/80 hover:text-blue-500 transition-colors">
                  {item}
                </a>
              ))}
            </nav>
            <div className="mt-auto pt-10 border-t border-white/10 space-y-4">
               <div className="text-slate-400 text-sm">যোগাযোগ করুন</div>
               <div className="text-xl font-bold text-white">{settings.contactNumber}</div>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-slate-900 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-blue-400" />
              <span>{settings.contactNumber}</span>
            </div>
            <button 
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-blue-400 hover:text-white transition-colors font-bold text-xs border-l border-slate-700 pl-4"
            >
              <LayoutDashboard size={14} />
              অ্যাডমিন প্যানেল
            </button>
          </div>
          <div className="flex-1 text-center overflow-hidden">
            <span className="animate-marquee">
              ফ্রি ডেলিভারি ৫০০০ টাকার উপরে! দ্রুত অর্ডার করুন। 🚀 ভেনজা টেক (Venza Tech) আপনার বিশ্বস্ত গ্যাজেট পার্টনার।
            </span>
          </div>
          <div className="hidden md:block">
            Badalgachhi, Naogaon
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Extra Menu Section */}
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                <Menu size={24} />
              </button>
              
              <div className="flex items-center gap-2 border-l pl-2 md:pl-4">
                {settings.useImageLogo && settings.logoUrl ? (
                  <div className="flex items-center gap-3">
                    <img 
                      src={settings.logoUrl} 
                      alt="Venza Logo" 
                      className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105 duration-300 drop-shadow-lg" 
                    />
                    <div className="hidden xs:flex flex-col leading-tight cursor-pointer">
                      <span className="text-lg font-black text-slate-900 tracking-tighter uppercase">{settings.logoText}</span>
                      <span className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">Premium Gadgets</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="logo-3d-wrapper logo-float">
                      <div 
                        className="logo-3d-text text-2xl md:text-3xl tracking-tighter cursor-pointer select-none"
                        data-text={settings.logoText || 'VENZA TECH'}
                      >
                        {settings.logoText || 'VENZA TECH'}
                      </div>
                    </div>
                    <div className="hidden lg:flex flex-col leading-none ml-2">
                       <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Official</span>
                       <span className="text-[8px] text-slate-400 font-bold uppercase">Gadget Hub</span>
                    </div>
                  </div>
                )}
                
                {/* 3-Dot Menu and Profile next to Logo */}
                <div className="hidden sm:flex items-center gap-1 border-l ml-3 pl-2">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                    <UserCircle size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Special Service Button */}
            <div className="hidden lg:block">
               <a href={settings.serviceButtonLink} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:shadow-indigo-300 hover:scale-105 transition-all">
                 <Zap size={16} fill="currentColor" />
                 {settings.serviceButtonText}
               </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden md:flex relative w-48 lg:w-64">
                <input
                  type="text"
                  placeholder="খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
              
              <button className="relative p-2.5 bg-slate-100 rounded-full hover:bg-blue-600 group transition-all">
                <ShoppingCart size={20} className="text-slate-700 group-hover:text-white transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button className="hidden sm:flex p-2.5 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all transform hover:rotate-12">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
