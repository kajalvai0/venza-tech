
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
  iconName: string; // Changed to string to store icon name for persistence simulation
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
