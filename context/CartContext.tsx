"use client";
import toast from "react-hot-toast";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Sepetteki ürünün tipi
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, size: string, quantityChange?: number) => void;
  removeFromCart: (id: number, size: string) => void;
  totalPrice: number;
  cartCount: number;
  isOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // 1. LocalStorage'dan sepeti geri yükle
  useEffect(() => {
    const savedCart = localStorage.getItem("kapiCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 2. Sepet her değiştiğinde hafızaya kaydet
  useEffect(() => {
    localStorage.setItem("kapiCart", JSON.stringify(cart));
  }, [cart]);

  const toggleCart = () => setIsOpen((prev) => !prev);

  // Sepete Ekleme Fonksiyonu (GÜNCELLENDİ)
  const addToCart = (product: any, size: string, quantityChange: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id && item.size === size);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityChange;
        if (newQuantity < 1) return prevCart;

        // BİLDİRİM: setTimeout ile render dışına itildi
        if (quantityChange > 0) {
          setTimeout(() => {
            toast.success(`${product.name} eklendi!`);
          }, 0);
        }

        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (quantityChange < 1) return prevCart;
        
        if (quantityChange > 0) setIsOpen(true);

        // BİLDİRİM: setTimeout ile render dışına itildi
        setTimeout(() => {
          toast.success(`${product.name} eklendi!`);
        }, 0);

        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image_url || product.image,
          size: size,
          quantity: quantityChange
        }];
      }
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice, cartCount, isOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}