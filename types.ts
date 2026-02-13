
import React from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isFlashSale?: boolean;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
  iconName: string;
}

export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  image: string;
  cta: string;
}

export interface SiteSettings {
  logoUrl: string;
  logoText: string;
  useImageLogo: boolean;
  serviceButtonText: string;
  serviceButtonLink: string;
  contactNumber: string;
}
