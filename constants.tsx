
import { Product, Category, Feature, Slide } from './types';

export const INITIAL_FEATURES: Feature[] = [
  {
    id: 'f1',
    title: 'ফ্রি ডেলিভারি',
    subtitle: '৫০০০ টাকার উপরে',
    iconName: 'Truck'
  },
  {
    id: 'f2',
    title: 'নিরাপদ পেমেন্ট',
    subtitle: '১০০% সুরক্ষিত',
    iconName: 'ShieldCheck'
  },
  {
    id: 'f3',
    title: '২৪/৭ সাপোর্ট',
    subtitle: 'সর্বদা সেবায়',
    iconName: 'Headphones'
  },
  {
    id: 'f4',
    title: 'সহজ রিটার্ন',
    subtitle: '৭ দিনের গ্যারান্টি',
    iconName: 'RefreshCcw'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'mobile',
    name: 'Mobile & Tab',
    count: '২৫০+ পণ্য',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    iconName: 'Smartphone'
  },
  {
    id: 'laptop',
    name: 'Laptop & Computer',
    count: '১৮০+ পণ্য',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    iconName: 'Laptop'
  },
  {
    id: 'audio',
    name: 'Audio & Headphone',
    count: '১২০+ পণ্য',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    iconName: 'Speaker'
  },
  {
    id: 'smartwatch',
    name: 'Smartwatch & Gadgets',
    count: '৯৫+ পণ্য',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    iconName: 'Watch'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S24 Ultra',
    price: 135000,
    originalPrice: 155000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
    category: 'Mobile',
    isFlashSale: true,
    rating: 4.9,
    reviews: 128
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    price: 165000,
    originalPrice: 175000,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80',
    category: 'Mobile',
    isFlashSale: true,
    rating: 4.8,
    reviews: 210
  },
  {
    id: '3',
    name: 'MacBook Air M3',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    category: 'Laptop',
    rating: 5.0,
    reviews: 85
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    price: 28000,
    originalPrice: 32000,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    category: 'Audio',
    isFlashSale: true,
    rating: 4.7,
    reviews: 450
  }
];

export const INITIAL_SLIDES: Slide[] = [
  {
    id: 's1',
    title: 'সর্বোচ্চ',
    subtitle: 'আপনার প্রিয় গ্যাজেট এখন আরও সাশ্রয়ী দামে। সেরা মানের স্মার্টফোন পান শুধুমাত্র ভেনজা-তে।',
    highlight: '৫০% ছাড়',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1920&q=80',
    cta: 'এখনই কিনুন'
  }
];

export const BRANDS = [
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Xiaomi', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg' },
  { name: 'OnePlus', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/OnePlus_logo.svg' },
  { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Sony_logo.svg' },
  { name: 'Huawei', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Huawei_logo.svg' }
];
