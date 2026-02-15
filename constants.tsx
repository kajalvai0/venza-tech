
import { Product, Category, Feature, Slide, SiteSettings } from './types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  logoUrl: 'https://cdn-icons-png.flaticon.com/512/3507/3507102.png',
  logoText: 'VENZA TECH',
  useImageLogo: false,
  serviceButtonText: 'এক্সচেঞ্জ অফার',
  serviceButtonLink: '#',
  contactNumber: '+৮৮০ ১৭৪৮-১২৩৪৫৬',
  footerAbout: 'ভেনজা (Venza) বাংলাদেশের অন্যতম একটি প্রিমিয়াম গ্যাজেট শপ। আমাদের মূল লক্ষ্য সুলভ মূল্যে সর্বোচ্চ মানের পণ্য এবং সেবা নিশ্চিত করা।',
  address: 'বদলগাছী, নওগাঁ, রাজশাহী, বাংলাদেশ',
  email: 'support@venza.com.bd',
  facebookUrl: '#',
  instagramUrl: '#',
  youtubeUrl: '#',
  twitterUrl: '#',
  importantLinks: [
    { label: 'আমাদের সম্পর্কে', url: '#' },
    { label: 'প্রাইভেসি পলিসি', url: '#' },
    { label: 'রিটার্ন ও রিফান্ড', url: '#' },
    { label: 'শর্তাবলী', url: '#' },
    { label: 'ব্লগ', url: '#' }
  ],
  popularCategories: [
    { label: 'স্মার্টফোন', url: '#' },
    { label: 'ল্যাপটপ', url: '#' },
    { label: 'হেডফোন', url: '#' },
    { label: 'স্মার্টওয়াচ', url: '#' },
    { label: 'ক্যামেরা', url: '#' }
  ],
  // Founder Default Data
  founderName: 'Md. Sahidul Islam',
  founderRole: 'Founder & CEO, Venza Tech',
  founderBio: 'ভেনজা টেক-এর যাত্রা শুরু হয়েছে গ্রাহকদের হাতে সেরা টেকনোলজি পৌঁছে দেওয়ার স্বপ্ন নিয়ে। আমরা বিশ্বাস করি প্রযুক্তির সঠিক ব্যবহার জীবনকে সহজ এবং সুন্দর করে তোলে। আমাদের সাথে থাকার জন্য ধন্যবাদ।',
  founderImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', // Replace with user provided image path in production
  showFounder: true
};

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
    title: 'সহ সহজ রিটার্ন',
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
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }
];
