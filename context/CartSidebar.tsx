"use client";

import { useCart } from "./CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // 1. LINK BİLEŞENİNİ ÇAĞIRDIK

export default function CartSidebar() {
  const { cart, removeFromCart, addToCart, totalPrice, isOpen, toggleCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Arka Karartma Perdesi */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleCart} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md flex flex-col bg-[#0a0a0a] border-l border-white/10 shadow-2xl">
          
          {/* Üst Kısım */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-xl font-black italic tracking-tighter uppercase">SEPETİM</h2>
            <button onClick={toggleCart} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white">
              <X size={24} />
            </button>
          </div>

          {/* Ürün Listesi */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50">
                <ShoppingBag size={64} className="mb-4" />
                <p className="font-bold uppercase tracking-widest">Sepetin Bomboş Reis</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm leading-none">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id, item.size)} className="text-gray-500 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-kapi-neon text-xs font-bold mt-1 uppercase">Beden: {item.size}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                          <button onClick={() => addToCart(item, item.size, -1)} className="hover:text-kapi-neon"><Minus size={14} /></button>
                          <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => addToCart(item, item.size, 1)} className="hover:text-kapi-neon"><Plus size={14} /></button>
                        </div>
                        <span className="font-black text-white">{item.price * item.quantity}₺</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Alt Toplam ve Ödeme */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/5 bg-black/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Toplam Tutar:</span>
                <span className="text-2xl font-black text-kapi-neon tracking-tighter">{totalPrice}₺</span>
              </div>
              
              {/* 2. DÜZELTİLEN BUTON (Tıklayınca ödemeye gider ve sepeti kapatır) */}
              <Link 
                href="/checkout" 
                onClick={toggleCart}
                className="w-full block text-center bg-white text-black font-black py-4 rounded-xl hover:bg-kapi-neon transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest"
              >
                ÖDEMEYE GEÇ
              </Link>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}