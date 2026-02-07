
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">ক্যাটাগরি অনুযায়ী কিনুন</h2>
          <p className="text-slate-500 mt-2">আপনার পছন্দের গ্যাজেট ক্যাটাগরি বেছে নিন</p>
        </div>
        <button className="text-blue-600 font-bold hover:underline">সবগুলো দেখুন</button>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const IconComponent = (LucideIcons as any)[cat.iconName] || LucideIcons.Layout;
          return (
            <div 
              key={cat.id} 
              className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg w-fit mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-sm text-slate-300 font-medium">{cat.count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
