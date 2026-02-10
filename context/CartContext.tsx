"use client";

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
  addToCart: (product: any, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  totalPrice: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Uygulama ilk açıldığında LocalStorage'dan (hafızadan) sepeti geri yükle
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

  // Sepete Ekleme Fonksiyonu
  const addToCart = (product: any, size: string) => {
    setCart((prevCart) => {
      // Ürün zaten sepette var mı? (Aynı ID ve Aynı Beden)
      const existingItem = prevCart.find((item) => item.id === product.id && item.size === size);

      if (existingItem) {
        // Varsa sadece adedini artır
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Yoksa yeni ekle
        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image_url, // Supabase'den gelen isim
          size: size,
          quantity: 1
        }];
      }
    });
  };

  // Sepetten Silme Fonksiyonu
  const removeFromCart = (id: number, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
  };

  // Toplam Tutar ve Ürün Sayısı
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Kolay kullanım için hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}