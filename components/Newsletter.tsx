
import React from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-white text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">সবচেয়ে সেরা অফারগুলো মিস করবেন না!</h2>
            <p className="text-blue-100">ভেনজা-র নিউজলেটারে সাবস্ক্রাইব করুন এবং নিয়মিত আপডেট পান।</p>
          </div>
          <div className="w-full max-w-lg">
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন"
                className="flex-1 px-6 py-4 rounded-xl text-slate-900 focus:outline-none font-medium"
              />
              <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
                সাবস্ক্রাইব
                <Send size={18} />
              </button>
            </form>
            <p className="text-[10px] text-blue-200 mt-3 text-center lg:text-left">
              *আপনার তথ্য আমাদের কাছে ১০০% নিরাপদ। যেকোনো সময় আনসাবস্ক্রাইব করা সম্ভব।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
