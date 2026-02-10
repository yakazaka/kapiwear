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
  // DÜZELTME BURADA YAPILDI: quantityChange parametresini ekledik
  addToCart: (product: any, size: string, quantityChange?: number) => void;
  removeFromCart: (id: number, size: string) => void;
  totalPrice: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Uygulama ilk açıldığında LocalStorage'dan sepeti geri yükle
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

  // Sepete Ekleme Fonksiyonu (Adet artırma/azaltma destekli)
  const addToCart = (product: any, size: string, quantityChange: number = 1) => {
    setCart((prevCart) => {
      // Ürün zaten sepette var mı?
      const existingItem = prevCart.find((item) => item.id === product.id && item.size === size);

      if (existingItem) {
        // Varsa adedini güncelle
        const newQuantity = existingItem.quantity + quantityChange;
        
        // Eğer 1'in altına düşecekse işlem yapma (Silme işlemi çöp kutusuyla yapılır)
        if (newQuantity < 1) return prevCart;

        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Yoksa yeni ekle (Eğer azaltma isteğiyle geldiyse ve ürün yoksa ekleme)
        if (quantityChange < 1) return prevCart;

        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image_url || product.image, // Supabase'den veya sepetten gelen isim uyumu
          size: size,
          quantity: quantityChange
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