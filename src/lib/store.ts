// Enhanced store for cart management and product catalog
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Import AI-generated shoe images
import mensAthleticWhite from '@/assets/mens-athletic-white.jpg';
import mensAthleticBlack from '@/assets/mens-athletic-black.jpg';
import mensCasualNavy from '@/assets/mens-casual-navy.jpg';
import mensCasualWhite from '@/assets/mens-casual-white.jpg';
import mensBasketballBlack from '@/assets/mens-basketball-black.jpg';
import mensBasketballRed from '@/assets/mens-basketball-red.jpg';
import womensRunningPink from '@/assets/womens-running-pink.jpg';
import womensRunningBlack from '@/assets/womens-running-black.jpg';
import womensCasualBeige from '@/assets/womens-casual-beige.jpg';
import womensCasualWhite from '@/assets/womens-casual-white.jpg';
import womensFashionPurple from '@/assets/womens-fashion-purple.jpg';
import womensFashionBlack from '@/assets/womens-fashion-black.jpg';

export interface ProductColor {
  name: string;
  value: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // For sale items
  image: string;
  category: string;
  sizes: string[];
  colors: ProductColor[];
  description: string;
  useCases?: string[];
  gender: 'men' | 'women' | 'unisex';
  isNewArrival?: boolean;
  isOnSale?: boolean;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor) => void;
  removeFromCart: (id: string, size: string, color: ProductColor) => void;
  updateQuantity: (id: string, size: string, color: ProductColor, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  getProductsByGender: (gender: 'men' | 'women') => Product[];
  getNewArrivals: () => Product[];
  getSaleProducts: () => Product[];
}

// Enhanced product catalog with AI-generated images
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Urban Athletic Pro',
    price: 299,
    image: mensAthleticWhite,
    category: 'Athletic',
    gender: 'men',
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    colors: [
      {
        name: 'White/Gray',
        value: '#F8F9FA',
        images: [mensAthleticWhite, mensAthleticWhite]
      },
      {
        name: 'Black/Gray', 
        value: '#212529',
        images: [mensAthleticBlack, mensAthleticBlack]
      }
    ],
    description: 'Premium athletic sneaker engineered for peak performance',
    useCases: ['Running', 'Training', 'Casual wear', 'Gym workouts'],
    isNewArrival: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Classic Street',
    price: 199,
    originalPrice: 249,
    image: mensCasualNavy,
    category: 'Casual',
    gender: 'men',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      {
        name: 'Navy/White',
        value: '#1B365D',
        images: [mensCasualNavy, mensCasualNavy]
      },
      {
        name: 'White/Gray',
        value: '#FFFFFF',
        images: [mensCasualWhite, mensCasualWhite]
      }
    ],
    description: 'Timeless casual sneaker with modern comfort technology',
    useCases: ['Daily wear', 'Weekend outings', 'Travel', 'Casual office'],
    isOnSale: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Elite Court Pro',
    price: 349,
    image: mensBasketballBlack,
    category: 'Basketball',
    gender: 'men',
    sizes: ['8', '9', '10', '11', '12', '13', '14'],
    colors: [
      {
        name: 'Black/Gold',
        value: '#000000',
        images: [mensBasketballBlack, mensBasketballBlack]
      },
      {
        name: 'Red/White',
        value: '#DC3545',
        images: [mensBasketballRed, mensBasketballRed]
      }
    ],
    description: 'Professional basketball shoe with superior court performance',
    useCases: ['Basketball', 'Indoor sports', 'Athletic training', 'Street ball'],
    featured: true,
  },
  {
    id: '4',
    name: 'Velocity Runner',
    price: 279,
    image: womensRunningPink,
    category: 'Running',
    gender: 'women',
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: [
      {
        name: 'Pink/White',
        value: '#E91E63',
        images: [womensRunningPink, womensRunningPink]
      },
      {
        name: 'Black/White',
        value: '#000000',
        images: [womensRunningBlack, womensRunningBlack]
      }
    ],
    description: 'Lightweight running shoe designed for women athletes',
    useCases: ['Running', 'Jogging', 'Cardio', 'Marathon training'],
    isNewArrival: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Minimalist Chic',
    price: 159,
    originalPrice: 199,
    image: womensCasualBeige,
    category: 'Casual',
    gender: 'women',
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: [
      {
        name: 'Beige/Cream',
        value: '#D2B48C',
        images: [womensCasualBeige, womensCasualBeige]
      },
      {
        name: 'White/Gray',
        value: '#FFFFFF',
        images: [womensCasualWhite, womensCasualWhite]
      }
    ],
    description: 'Minimalist design meets all-day comfort',
    useCases: ['Daily wear', 'Work', 'Shopping', 'Casual dining'],
    isOnSale: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Fashion Forward',
    price: 259,
    image: womensFashionPurple,
    category: 'Fashion',
    gender: 'women',
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: [
      {
        name: 'Lavender/White',
        value: '#E6E6FA',
        images: [womensFashionPurple, womensFashionPurple]
      },
      {
        name: 'Black/Gold',
        value: '#000000',
        images: [womensFashionBlack, womensFashionBlack]
      }
    ],
    description: 'Statement sneaker that elevates any outfit',
    useCases: ['Fashion', 'Night out', 'Social events', 'Street style'],
    featured: true,
  },
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      cart: [],
      
      addToCart: (product, size, color) => {
        const existingItem = get().cart.find(
          item => item.id === product.id && item.selectedSize === size && item.selectedColor.name === color.name
        );
        
        if (existingItem) {
          set(state => ({
            cart: state.cart.map(item =>
              item.id === product.id && item.selectedSize === size && item.selectedColor.name === color.name
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }));
        } else {
          set(state => ({
            cart: [...state.cart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]
          }));
        }
      },
      
      removeFromCart: (id, size, color) => {
        set(state => ({
          cart: state.cart.filter(
            item => !(item.id === id && item.selectedSize === size && item.selectedColor.name === color.name)
          )
        }));
      },
      
      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id, size, color);
          return;
        }
        
        set(state => ({
          cart: state.cart.map(item =>
            item.id === id && item.selectedSize === size && item.selectedColor.name === color.name
              ? { ...item, quantity }
              : item
          )
        }));
      },
      
      clearCart: () => set({ cart: [] }),
      
      cartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      cartCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      getProductsByGender: (gender) => {
        return get().products.filter(product => product.gender === gender);
      },

      getNewArrivals: () => {
        return get().products.filter(product => product.isNewArrival);
      },

      getSaleProducts: () => {
        return get().products.filter(product => product.isOnSale);
      },
    }),
    {
      name: 'sneakhaus-store',
    }
  )
);