
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Image as ImageIcon, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  X,
  Save,
  CheckCircle2,
  TrendingUp,
  ShoppingCart,
  Users,
  Lock,
  LogOut,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Product, Category, Feature, Slide } from '../types';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  slides: Slide[];
  setSlides: React.Dispatch<React.SetStateAction<Slide[]>>;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  products, setProducts,
  categories, setCategories,
  features, setFeatures,
  slides, setSlides,
  onClose
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'slides' | 'features'>('dashboard');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Unified Form State for all types
  const [formData, setFormData] = useState<any>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('ভুল ইউজারনেম অথবা পাসওয়ার্ড!');
    }
  };

  const handleDelete = (type: string, id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) {
      if (type === 'product') setProducts(prev => prev.filter(p => p.id !== id));
      if (type === 'category') setCategories(prev => prev.filter(c => c.id !== id));
      if (type === 'feature') setFeatures(prev => prev.filter(f => f.id !== id));
      if (type === 'slide') setSlides(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingId || Math.random().toString(36).substr(2, 9);
    const item = { ...formData, id };

    if (activeTab === 'products') {
      const product = { ...item, rating: item.rating || 5.0, reviews: item.reviews || 0 } as Product;
      setProducts(prev => editingId ? prev.map(p => p.id === editingId ? product : p) : [...prev, product]);
    } else if (activeTab === 'categories') {
      setCategories(prev => editingId ? prev.map(c => c.id === editingId ? item : c) : [...prev, item]);
    } else if (activeTab === 'features') {
      setFeatures(prev => editingId ? prev.map(f => f.id === editingId ? item : f) : [...prev, item]);
    } else if (activeTab === 'slides') {
      setSlides(prev => editingId ? prev.map(s => s.id === editingId ? item : s) : [...prev, item]);
    }

    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  const startEdit = (item: any) => {
    setFormData(item);
    setEditingId(item.id);
    setIsAdding(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl animate-in zoom-in duration-300">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/40">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">অ্যাডমিন লগইন</h1>
            <p className="text-slate-500 mt-2">আপনার প্যানেলে প্রবেশ করতে তথ্য দিন</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">ইউজারনেম</label>
              <input 
                type="text"
                className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                placeholder="admin"
                value={loginForm.username}
                onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">পাসওয়ার্ড</label>
              <input 
                type="password"
                className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-sm font-medium text-center">{loginError}</p>}
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2">
              প্রবেশ করুন
              <ArrowRight size={20} />
            </button>
          </form>
          <button onClick={onClose} className="w-full mt-6 text-slate-500 hover:text-white transition-colors text-sm font-medium">
            দোকানে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col md:flex-row font-sans animate-in fade-in duration-300 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col shrink-0">
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-500 tracking-tighter">VENZA HUB</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Management</span>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'categories', label: 'Categories', icon: Layers },
            { id: 'slides', label: 'Hero Banner', icon: ImageIcon },
            { id: 'features', label: 'Features', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setIsAdding(false); setEditingId(null); setFormData({}); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-xl mb-4">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs uppercase">A</div>
             <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Administrator</span>
                <span className="text-[10px] text-slate-500">Online</span>
             </div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2 px-4 py-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
          >
            <LogOut size={18} />
            লগআউট
          </button>
          <button 
            onClick={onClose}
            className="w-full flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
          >
            <X size={18} />
            Storefront
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-10 relative">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white capitalize">{activeTab}</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your storefront {activeTab} information</p>
          </div>
          {activeTab !== 'dashboard' && !isAdding && (
            <button 
              onClick={() => { setIsAdding(true); setFormData({}); setEditingId(null); }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
            >
              <Plus size={20} />
              নতুন আইটেম যোগ করুন
            </button>
          )}
        </header>

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Sales', val: '৳৪,২৫,০০০', icon: TrendingUp, color: 'text-green-500' },
                { label: 'Products', val: products.length, icon: Package, color: 'text-orange-500' },
                { label: 'Categories', val: categories.length, icon: Layers, color: 'text-blue-500' },
                { label: 'Active Users', val: '১,০৫০', icon: Users, color: 'text-purple-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={stat.color} size={24} />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Live</span>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight">{stat.val}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-blue-500" size={20} />
                Recent System Activity
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-800 last:border-0">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-blue-500 shrink-0">
                      <Settings size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">System Update: Data synchronization complete</p>
                      <p className="text-xs text-slate-500">৫ মিনিট আগে</p>
                    </div>
                    <button className="text-slate-500 hover:text-white transition-colors"><Eye size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Forms */}
        {activeTab !== 'dashboard' && isAdding && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden max-w-4xl mx-auto shadow-2xl">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? 'সম্পাদনা করুন' : 'নতুন তথ্য যোগ করুন'} ({activeTab})
                </h2>
                <button type="button" onClick={() => setIsAdding(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dynamic Inputs based on Tab */}
                {activeTab === 'products' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">নাম</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">ক্যাটাগরি</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">মূল্য (৳)</label>
                      <input type="number" required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">পুরাতন মূল্য (৳)</label>
                      <input type="number" className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.originalPrice || ''} onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-400">ইমেজ লিঙ্ক (URL)</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                    </div>
                  </>
                )}

                {activeTab === 'categories' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">ক্যাটাগরি নাম</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">আইকন নাম (Lucide)</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.iconName || ''} onChange={e => setFormData({...formData, iconName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">পণ্যের সংখ্যা (টেক্সট)</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.count || ''} onChange={e => setFormData({...formData, count: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">ইমেজ লিঙ্ক</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                    </div>
                  </>
                )}

                {activeTab === 'slides' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">মূল শিরোনাম</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">হাইলাইট টেক্সট</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.highlight || ''} onChange={e => setFormData({...formData, highlight: e.target.value})} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-400">উপ-শিরোনাম (বর্ণনা)</label>
                      <textarea required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">CTA বাটন টেক্সট</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.cta || ''} onChange={e => setFormData({...formData, cta: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">ব্যানার ইমেজ URL</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                    </div>
                  </>
                )}

                {activeTab === 'features' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">শিরোনাম</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">আইকন নাম</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.iconName || ''} onChange={e => setFormData({...formData, iconName: e.target.value})} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-400">উপ-শিরোনাম</label>
                      <input required className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-4 pt-10">
                <button type="submit" className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20">
                  <Save size={20} />
                  সংরক্ষণ করুন
                </button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all">
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List Views */}
        {activeTab !== 'dashboard' && !isAdding && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <th className="px-8 py-6">আইটেম</th>
                    {activeTab === 'products' && <th className="px-8 py-6">মূল্য</th>}
                    {activeTab === 'categories' && <th className="px-8 py-6">আইকন</th>}
                    {activeTab === 'slides' && <th className="px-8 py-6">CTA</th>}
                    <th className="px-8 py-6 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {(activeTab === 'products' ? products : activeTab === 'categories' ? categories : activeTab === 'features' ? features : slides).map((item: any) => (
                    <tr key={item.id} className="text-sm text-slate-300 hover:bg-slate-800/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          {(item.image || item.iconName) && (
                            <div className="w-12 h-12 bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                               {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="text-blue-500 text-xs font-bold">{item.iconName}</div>}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-bold text-white">{item.name || item.title}</span>
                            <span className="text-[10px] text-slate-500 font-medium truncate max-w-[200px]">{item.category || item.subtitle}</span>
                          </div>
                        </div>
                      </td>
                      {activeTab === 'products' && <td className="px-8 py-6 font-bold text-blue-500">৳{item.price.toLocaleString()}</td>}
                      {activeTab === 'categories' && <td className="px-8 py-6 text-slate-400 font-mono text-xs">{item.iconName}</td>}
                      {activeTab === 'slides' && <td className="px-8 py-6"><span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold">{item.cta}</span></td>}
                      <td className="px-8 py-6 text-right space-x-2">
                        <button onClick={() => startEdit(item)} className="p-3 bg-slate-800 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(activeTab === 'products' ? 'product' : activeTab === 'categories' ? 'category' : activeTab === 'features' ? 'feature' : 'slide', item.id)} className="p-3 bg-slate-800 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {((activeTab === 'products' ? products : activeTab === 'categories' ? categories : activeTab === 'features' ? features : slides).length === 0) && (
                <div className="py-20 text-center text-slate-600 font-medium">
                   কোনো তথ্য খুঁজে পাওয়া যায়নি।
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
