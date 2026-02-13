
import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
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
  ArrowRight,
  Globe,
  Smartphone,
  Upload,
  ChevronRight,
  Monitor,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Mail,
  Phone,
  Link as LinkIcon
} from 'lucide-react';
import { Product, Category, Feature, Slide, SiteSettings, LinkItem } from '../types';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  slides: Slide[];
  setSlides: React.Dispatch<React.SetStateAction<Slide[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  products, setProducts,
  categories, setCategories,
  features, setFeatures,
  slides, setSlides,
  settings, setSettings,
  onClose
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'slides' | 'features' | 'settings'>('dashboard');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('ভুল ইউজারনেম অথবা পাসওয়ার্ড!');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('সাইট সেটিংস সফলভাবে আপডেট হয়েছে!');
  };

  const handleDelete = (type: string, id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) {
      if (type === 'product') setProducts(prev => prev.filter(p => p.id !== id));
      if (type === 'category') setCategories(prev => prev.filter(c => c.id !== id));
      if (type === 'feature') setFeatures(prev => prev.filter(f => f.id !== id));
      if (type === 'slide') setSlides(prev => prev.filter(s => s.id !== id));
    }
  };

  const startEditing = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingId || Math.random().toString(36).substr(2, 9);
    const item = { ...formData, id };

    if (activeTab === 'products') {
      const product = { 
        ...item, 
        price: Number(item.price), 
        originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
        rating: item.rating || 5.0, 
        reviews: item.reviews || 0 
      } as Product;
      setProducts(prev => editingId ? prev.map(p => p.id === editingId ? product : p) : [...prev, product]);
    } else if (activeTab === 'categories') {
      const category = { ...item, count: item.count || '0+ পণ্য' } as Category;
      setCategories(prev => editingId ? prev.map(c => c.id === editingId ? category : c) : [...prev, category]);
    } else if (activeTab === 'features') {
      setFeatures(prev => editingId ? prev.map(f => f.id === editingId ? item : f) : [...prev, item]);
    } else if (activeTab === 'slides') {
      setSlides(prev => editingId ? prev.map(s => s.id === editingId ? item : s) : [...prev, item]);
    }

    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  // Helper to handle link changes
  const handleLinkChange = (listName: 'importantLinks' | 'popularCategories', index: number, field: keyof LinkItem, value: string) => {
    const newList = [...settings[listName]];
    newList[index] = { ...newList[index], [field]: value };
    setSettings({ ...settings, [listName]: newList });
  };

  const addLink = (listName: 'importantLinks' | 'popularCategories') => {
    setSettings({
      ...settings,
      [listName]: [...settings[listName], { label: 'নতুন লিঙ্ক', url: '#' }]
    });
  };

  const removeLink = (listName: 'importantLinks' | 'popularCategories', index: number) => {
    const newList = settings[listName].filter((_, i) => i !== index);
    setSettings({ ...settings, [listName]: newList });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl animate-in zoom-in duration-300">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">অ্যাডমিন লগইন</h1>
            <p className="text-slate-500 mt-2">আপনার প্যানেলে প্রবেশ করতে তথ্য দিন</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="text" placeholder="admin"
              className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-5 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
              value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} required
            />
            <input 
              type="password" placeholder="••••••••"
              className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-5 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
              value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} required
            />
            {loginError && <p className="text-red-500 text-sm font-medium text-center">{loginError}</p>}
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg">প্রবেশ করুন</button>
          </form>
          <button onClick={onClose} className="w-full mt-6 text-slate-500 hover:text-white text-sm font-medium">দোকানে ফিরে যান</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col md:flex-row font-sans animate-in fade-in duration-300 overflow-hidden text-slate-200">
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col shrink-0">
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-500 tracking-tighter">VENZA HUB</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Management</span>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white"><X size={24} /></button>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto hide-scrollbar">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'categories', label: 'Categories', icon: Layers },
            { id: 'slides', label: 'Hero Slides', icon: Monitor },
            { id: 'features', label: 'Features', icon: Smartphone },
            { id: 'settings', label: 'Site Settings', icon: SettingsIcon },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setIsAdding(false); setEditingId(null); setFormData({}); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-2 px-4 py-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-sm">
            <LogOut size={18} /> লগআউট
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-10 relative">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white capitalize">{activeTab}</h1>
            <p className="text-slate-500 text-sm mt-1">ম্যানেজ করুন আপনার ভেনজা টেক শপ</p>
          </div>
          {activeTab !== 'dashboard' && activeTab !== 'settings' && !isAdding && (
            <button onClick={() => { setIsAdding(true); setFormData({}); setEditingId(null); }} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95">
              <Plus size={20} /> নতুন আইটেম
            </button>
          )}
        </header>

        {isAdding && (activeTab === 'products' || activeTab === 'categories' || activeTab === 'slides') ? (
          <div className="max-w-4xl bg-slate-900 rounded-3xl border border-slate-800 p-8 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">{editingId ? 'আপডেট করুন' : 'নতুন যোগ করুন'}</h2>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-800 rounded-full text-slate-500"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase mb-2">
                      {activeTab === 'slides' ? 'স্লাইড শিরোনাম' : 'নাম'}
                    </label>
                    <input 
                      className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.name || formData.title || ''} 
                      onChange={e => {
                        if (activeTab === 'slides') setFormData({...formData, title: e.target.value});
                        else setFormData({...formData, name: e.target.value});
                      }}
                      required
                    />
                  </div>

                  {activeTab === 'slides' && (
                    <>
                      <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase mb-2">হাইলাইট টেক্সট (যেমন: ৫০% ছাড়)</label>
                        <input 
                          className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                          value={formData.highlight || ''} 
                          onChange={e => setFormData({...formData, highlight: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase mb-2">সাব-টাইটেল (বিস্তারিত)</label>
                        <textarea 
                          rows={3}
                          className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                          value={formData.subtitle || ''} 
                          onChange={e => setFormData({...formData, subtitle: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase mb-2">বাটন টেক্সট (CTA)</label>
                        <input 
                          className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                          value={formData.cta || 'এখনই কিনুন'} 
                          onChange={e => setFormData({...formData, cta: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'products' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">বর্তমান দাম (৳)</label>
                          <input 
                            type="number"
                            className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.price || ''} 
                            onChange={e => setFormData({...formData, price: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">আগের দাম (৳)</label>
                          <input 
                            type="number"
                            className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.originalPrice || ''} 
                            onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase mb-2">ক্যাটাগরি</label>
                        <select 
                          className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                          value={formData.category || ''}
                          onChange={e => setFormData({...formData, category: e.target.value})}
                          required
                        >
                          <option value="">সিলেক্ট করুন</option>
                          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                    </>
                  )}

                  {activeTab === 'categories' && (
                    <div>
                      <label className="block text-slate-400 text-xs font-bold uppercase mb-2">আইকন নাম (Lucide)</label>
                      <input 
                        className="w-full bg-slate-800 border-slate-700 text-white rounded-xl px-4 py-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.iconName || ''} 
                        placeholder="Smartphone, Laptop, etc."
                        onChange={e => setFormData({...formData, iconName: e.target.value})}
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-slate-400 text-xs font-bold uppercase mb-2">ইমেজ (ছবি)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video bg-slate-800 border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all overflow-hidden relative group"
                  >
                    {formData.image ? (
                      <>
                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="text-white" size={32} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 bg-slate-700 rounded-full mb-3 text-slate-400 group-hover:text-blue-500">
                          <ImageIcon size={32} />
                        </div>
                        <p className="text-slate-400 text-sm">ছবি আপলোড করতে ক্লিক করুন</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="submit" className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all">
                  <Save size={22} /> {editingId ? 'আপডেট করুন' : 'সাবমিট করুন'}
                </button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold">বাতিল</button>
              </div>
            </form>
          </div>
        ) : null}

        {!isAdding && activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 group">
                <div className="aspect-square bg-slate-800 rounded-2xl mb-4 overflow-hidden relative">
                  <img src={product.image} className="w-full h-full object-contain" alt={product.name} />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button onClick={() => startEditing(product)} className="p-2 bg-white/10 hover:bg-blue-600 backdrop-blur-md rounded-full text-white transition-all"><Edit size={16} /></button>
                    <button onClick={() => handleDelete('product', product.id)} className="p-2 bg-white/10 hover:bg-red-600 backdrop-blur-md rounded-full text-white transition-all"><Trash2 size={16} /></button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex flex-col">
                    <span className="text-blue-400 font-bold text-lg">৳ {product.price}</span>
                    {product.originalPrice && <span className="text-slate-600 text-[10px] line-through">৳ {product.originalPrice}</span>}
                  </div>
                  <span className="text-slate-500 text-xs px-3 py-1 bg-slate-800 rounded-full">{product.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8 pb-20">
            {/* Logo & Basic Settings */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 max-w-5xl mx-auto shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Globe className="text-blue-500" /> হোমপেজ ও লোগো কন্ট্রোল
              </h2>
              <form onSubmit={handleSettingsSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-blue-400 font-bold text-sm uppercase tracking-widest">লোগো সেটিংস</h3>
                    <div className="flex items-center justify-between bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                      <label className="text-white text-sm font-medium">ইমেজ লোগো ব্যবহার করুন?</label>
                      <input 
                        type="checkbox" checked={settings.useImageLogo} 
                        onChange={e => setSettings({...settings, useImageLogo: e.target.checked})}
                        className="w-6 h-6 rounded-lg accent-blue-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-[10px] font-bold uppercase ml-2">লোগো টেক্সট</label>
                      <input className="w-full bg-slate-800 border-slate-700 text-white rounded-2xl px-5 py-4 border focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={settings.logoText} onChange={e => setSettings({...settings, logoText: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-blue-400 font-bold text-sm uppercase tracking-widest">সার্ভিস ও কন্টাক্ট</h3>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-[10px] font-bold uppercase ml-2">সার্ভিস বাটন টেক্সট</label>
                      <input className="w-full bg-slate-800 border-slate-700 text-white rounded-2xl px-5 py-4 border focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={settings.serviceButtonText} onChange={e => setSettings({...settings, serviceButtonText: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-[10px] font-bold uppercase ml-2">কন্টাক্ট নাম্বার</label>
                      <input className="w-full bg-slate-800 border-slate-700 text-white rounded-2xl px-5 py-4 border focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={settings.contactNumber} onChange={e => setSettings({...settings, contactNumber: e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* Footer Content */}
                <hr className="border-slate-800" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-purple-400 font-bold text-sm uppercase tracking-widest">ফুটার ও যোগাযোগ</h3>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-[10px] font-bold uppercase ml-2">ফুটার 'আমাদের সম্পর্কে'</label>
                      <textarea rows={3} className="w-full bg-slate-800 border-slate-700 text-white rounded-2xl px-5 py-4 border focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={settings.footerAbout} onChange={e => setSettings({...settings, footerAbout: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-[10px] font-bold uppercase ml-2">ঠিকানা</label>
                      <input className="w-full bg-slate-800 border-slate-700 text-white rounded-2xl px-5 py-4 border focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-[10px] font-bold uppercase ml-2">ইমেইল</label>
                      <input className="w-full bg-slate-800 border-slate-700 text-white rounded-2xl px-5 py-4 border focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-orange-400 font-bold text-sm uppercase tracking-widest">সোশ্যাল মিডিয়া</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                         <Facebook className="text-blue-500 shrink-0" size={20} />
                         <input className="bg-transparent w-full text-white outline-none text-sm" placeholder="Facebook URL" value={settings.facebookUrl} onChange={e => setSettings({...settings, facebookUrl: e.target.value})} />
                      </div>
                      <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                         <Instagram className="text-pink-500 shrink-0" size={20} />
                         <input className="bg-transparent w-full text-white outline-none text-sm" placeholder="Instagram URL" value={settings.instagramUrl} onChange={e => setSettings({...settings, instagramUrl: e.target.value})} />
                      </div>
                      <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                         <Youtube className="text-red-500 shrink-0" size={20} />
                         <input className="bg-transparent w-full text-white outline-none text-sm" placeholder="Youtube URL" value={settings.youtubeUrl} onChange={e => setSettings({...settings, youtubeUrl: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Footer Links */}
                <hr className="border-slate-800" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <h3 className="text-green-400 font-bold text-sm uppercase tracking-widest">গুরুত্বপূর্ণ লিংকসমূহ</h3>
                       <button type="button" onClick={() => addLink('importantLinks')} className="p-1 bg-green-500/10 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-all"><Plus size={16} /></button>
                    </div>
                    <div className="space-y-3">
                      {settings.importantLinks.map((link, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input className="flex-1 bg-slate-800 border-slate-700 text-white rounded-xl px-3 py-2 border text-sm" value={link.label} onChange={e => handleLinkChange('importantLinks', idx, 'label', e.target.value)} />
                          <input className="flex-[2] bg-slate-800 border-slate-700 text-white rounded-xl px-3 py-2 border text-sm" value={link.url} onChange={e => handleLinkChange('importantLinks', idx, 'url', e.target.value)} />
                          <button type="button" onClick={() => removeLink('importantLinks', idx)} className="text-slate-500 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <h3 className="text-blue-400 font-bold text-sm uppercase tracking-widest">পপুলার ক্যাটাগরি লিংক</h3>
                       <button type="button" onClick={() => addLink('popularCategories')} className="p-1 bg-blue-500/10 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all"><Plus size={16} /></button>
                    </div>
                    <div className="space-y-3">
                      {settings.popularCategories.map((link, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input className="flex-1 bg-slate-800 border-slate-700 text-white rounded-xl px-3 py-2 border text-sm" value={link.label} onChange={e => handleLinkChange('popularCategories', idx, 'label', e.target.value)} />
                          <input className="flex-[2] bg-slate-800 border-slate-700 text-white rounded-xl px-3 py-2 border text-sm" value={link.url} onChange={e => handleLinkChange('popularCategories', idx, 'url', e.target.value)} />
                          <button type="button" onClick={() => removeLink('popularCategories', idx)} className="text-slate-500 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]">
                  <Save size={24} /> সেটিংস সেভ করুন
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'মোট পণ্য', val: products.length, icon: Package, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                { label: 'ক্যাটাগরি', val: categories.length, icon: Layers, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'ব্যানার স্লাইড', val: slides.length, icon: Monitor, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { label: 'ফিচারসমূহ', val: features.length, icon: Smartphone, color: 'text-green-500', bg: 'bg-green-500/10' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all group">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="text-4xl font-bold text-white tracking-tight">{stat.val}</div>
                  <div className="text-sm text-slate-500 mt-2 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">
              <h3 className="text-xl font-bold text-white mb-6">দ্রুত অ্যাকশন</h3>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setActiveTab('products')} className="px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-white font-bold flex items-center gap-3 transition-all">
                  <Package size={20} /> প্রোডাক্ট লিস্ট দেখুন
                </button>
                <button onClick={() => { setActiveTab('products'); setIsAdding(true); }} className="px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white font-bold flex items-center gap-3 transition-all">
                  <Plus size={20} /> নতুন প্রোডাক্ট যোগ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
