
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureBar from './components/FeatureBar';
import CategoryGrid from './components/CategoryGrid';
import FlashSale from './components/FlashSale';
import ProductCard from './components/ProductCard';
import BrandShowcase from './components/BrandShowcase';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_FEATURES, 
  INITIAL_SLIDES 
} from './constants';
import { Product, Category, Feature, Slide } from './types';

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  // State-managed data for Admin Panel
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [features, setFeatures] = useState<Feature[]>(INITIAL_FEATURES);
  const [slides, setSlides] = useState<Slide[]>(INITIAL_SLIDES);

  const handleAddToCart = (id: string) => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className={`min-h-screen flex flex-col font-['Hind_Siliguri',_sans-serif] ${isAdminOpen ? 'overflow-hidden h-screen' : ''}`}>
      <Header cartCount={cartCount} onOpenAdmin={() => setIsAdminOpen(true)} />
      
      {isAdminOpen && (
        <AdminPanel 
          products={products} setProducts={setProducts}
          categories={categories} setCategories={setCategories}
          features={features} setFeatures={setFeatures}
          slides={slides} setSlides={setSlides}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      <main className="flex-grow">
        <Hero slides={slides} />
        <FeatureBar features={features} />
        
        {/* Categories Section */}
        <CategoryGrid categories={categories} />

        {/* Flash Sale Section */}
        <section className="bg-slate-50 py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <FlashSale onAddToCart={handleAddToCart} />
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900">আপনার জন্য বাছাইকৃত</h2>
              <p className="text-slate-500 mt-3 text-lg">সেরা ডিল এবং নতুন কালেকশন এক জায়গায়</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
          <div className="mt-16 text-center">
            <button className="px-10 py-4 bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all rounded-2xl font-bold text-lg">
              সবগুলো পণ্য দেখুন
            </button>
          </div>
        </section>

        {/* Brand Section */}
        <BrandShowcase />

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      <Footer />

      {/* Floating Mobile Action */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <button className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center relative transform active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
            {cartCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
