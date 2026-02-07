
import React from 'react';
import { INITIAL_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { Clock } from 'lucide-react';

interface FlashSaleProps {
  onAddToCart: (id: string) => void;
}

const FlashSale: React.FC<FlashSaleProps> = ({ onAddToCart }) => {
  const flashProducts = INITIAL_PRODUCTS.filter(p => p.isFlashSale);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-2xl">
            <Clock className="text-red-600 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">ফ্ল্যাশ সেল</h2>
            <div className="flex gap-2 items-center mt-1">
              <span className="text-sm text-slate-500">শেষ হতে বাকি:</span>
              <div className="flex gap-1">
                {['১২', '৪৫', '০৮'].map((val, i) => (
                  <span key={i} className="bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">
                    {val}{i === 0 ? 'ঘ' : i === 1 ? 'মি' : 'সে'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className="text-red-600 font-bold hover:underline">সবগুলো অফার</button>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar scroll-smooth">
        {flashProducts.map((product) => (
          <div key={product.id} className="min-w-[280px] md:min-w-[320px]">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
