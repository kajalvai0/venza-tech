
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureBar from './components/FeatureBar';
import CategoryGrid from './components/CategoryGrid';
import FlashSale from './components/FlashSale';
import ProductCard from './components/ProductCard';
import FounderSection from './components/FounderSection';
import BrandShowcase from './components/BrandShowcase';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_FEATURES, 
  INITIAL_SLIDES,
  INITIAL_SITE_SETTINGS
} from './constants';
import { Product, Category, Feature, Slide, SiteSettings } from './types';

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  // State-managed data
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [features, setFeatures] = useState<Feature[]>(INITIAL_FEATURES);
  const [slides, setSlides] = useState<Slide[]>(INITIAL_SLIDES);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);

  const handleAddToCart = (id: string) => {
    setCartCount(prev => prev + 1);
  };

  // Safe data check for production readiness
  const displayProducts = products.length > 0 ? products : INITIAL_PRODUCTS;
  const displayCategories = categories.length > 0 ? categories : INITIAL_CATEGORIES;
  const displaySlides = slides.length > 0 ? slides : INITIAL_SLIDES;
  const displayFeatures = features.length > 0 ? features : INITIAL_FEATURES;

  return (
    <div className={`min-h-screen flex flex-col font-['Hind_Siliguri',_sans-serif] ${isAdminOpen ? 'overflow-hidden h-screen' : ''}`}>
      <Header 
        cartCount={cartCount} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        settings={settings}
      />
      
      {isAdminOpen && (
        <AdminPanel 
          products={products} setProducts={setProducts}
          categories={categories} setCategories={setCategories}
          features={features} setFeatures={setFeatures}
          slides={slides} setSlides={setSlides}
          settings={settings} setSettings={setSettings}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      <main className="flex-grow">
        <Hero slides={displaySlides} />
        <FeatureBar features={displayFeatures} />
        
        <CategoryGrid categories={displayCategories} />

        <section className="bg-slate-50 py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <FlashSale onAddToCart={handleAddToCart} />
          </div>
        </section>

        <section className="py-20 container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900">আপনার জন্য বাছাইকৃত</h2>
              <p className="text-slate-500 mt-3 text-lg">সেরা ডিল এবং নতুন কালেকশন এক জায়গায়</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <button className="px-10 py-4 bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all rounded-2xl font-bold text-lg">
              সবগুলো পণ্য দেখুন
            </button>
          </div>
        </section>

        {/* Founder & CEO Section */}
        <FounderSection settings={settings} />

        <BrandShowcase />
        <Newsletter />
      </main>

      <Footer settings={settings} />

      {/* Admin Floating Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20 hover:scale-110 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;
