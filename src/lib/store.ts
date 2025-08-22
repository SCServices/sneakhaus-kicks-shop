// Simple store for cart management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import brownBootsImage from '@/assets/brown-leather-boots.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Apex High-Top',
    price: 299,
    image: '/placeholder.svg',
    category: 'High-Top',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Gold'],
    description: 'Premium leather high-top sneaker with gold accents',
    featured: true,
  },
  {
    id: '2',
    name: 'Urban Runner',
    price: 249,
    image: '/placeholder.svg',
    category: 'Athletic',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Navy'],
    description: 'Lightweight running shoe perfect for city streets',
    featured: true,
  },
  {
    id: '3',
    name: 'Classic Low',
    price: 199,
    image: '/placeholder.svg',
    category: 'Low-Top',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Gray'],
    description: 'Timeless low-top design with modern comfort',
    featured: true,
  },
  {
    id: '4',
    name: 'Elite Court',
    price: 349,
    image: '/placeholder.svg',
    category: 'Basketball',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Gold', 'Red'],
    description: 'Professional basketball shoe with premium materials',
    featured: true,
  },
  {
    id: '5',
    name: 'Heritage Leather Boots',
    price: 399,
    image: brownBootsImage,
    category: 'Boots',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black'],
    description: 'Premium leather boots with rugged construction and timeless style',
    featured: true,
  },
  {
    id: '6',
    name: 'Street Walker',
    price: 229,
    image: '/placeholder.svg',
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Beige'],
    description: 'Comfortable everyday sneaker with minimalist design',
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
          item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
        );
        
        if (existingItem) {
          set(state => ({
            cart: state.cart.map(item =>
              item.id === product.id && item.selectedSize === size && item.selectedColor === color
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
            item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
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
            item.id === id && item.selectedSize === size && item.selectedColor === color
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
    }),
    {
      name: 'sneakhaus-store',
    }
  )
);