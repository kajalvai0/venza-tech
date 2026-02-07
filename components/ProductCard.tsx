
import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT' })
      .format(price)
      .replace('BDT', '৳');
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        {product.isFlashSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
            FLASH SALE
          </div>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
          <Heart size={16} />
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center text-yellow-400">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold ml-1 text-slate-700">{product.rating}</span>
          </div>
          <span className="text-[10px] text-slate-400">({product.reviews} রিভিউ)</span>
        </div>
        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 mt-1">{product.category}</p>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through mb-0.5">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <button 
          onClick={() => onAddToCart(product.id)}
          className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingCart size={18} />
          ব্যাগ-এ রাখুন
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
