
import React from 'react';
import { Search, ShoppingCart, User, Phone, Menu, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenAdmin: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenAdmin }) => {
  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="bg-slate-900 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-blue-400" />
              <span>+৮৮০ ১৭৪৮-১২৩৪৫৬</span>
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
              ফ্রি ডেলিভারি ৫০০০ টাকার উপরে! দ্রুত অর্ডার করুন। 🚀 ফিনজা (Venza) আপনার বিশ্বস্ত গ্যাজেট পার্টনার।
            </span>
          </div>
          <div className="hidden md:block">
            Badalgachhi, Naogaon
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <button className="lg:hidden p-1 text-slate-600">
                <Menu size={24} />
              </button>
              <div className="flex flex-col leading-tight cursor-pointer">
                <span className="text-2xl font-bold text-blue-600 tracking-tight">VENZA</span>
                <span className="text-[10px] text-slate-500 font-medium">ভেনজা</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
              <input
                type="text"
                placeholder="আপনার কাঙ্খিত পণ্যটি খুঁজুন..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-6">
              <button className="flex items-center gap-1 text-slate-700 hover:text-blue-600 transition-colors">
                <User size={20} />
                <span className="hidden sm:inline text-sm font-medium">লগইন</span>
              </button>
              <button className="relative p-2 bg-slate-100 rounded-full hover:bg-blue-100 transition-colors">
                <ShoppingCart size={20} className="text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="mt-4 md:hidden relative">
             <input
                type="text"
                placeholder="খুঁজুন..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full outline-none text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
