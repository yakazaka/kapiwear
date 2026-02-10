"use client";

import { X, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const { isOpen, toggleCart } = useCart();

  // Örnek Sepet Ürünü (Şimdilik sabit görüntü)
  const cartItem = {
    id: 1,
    name: "Oversize Neon Hoodie",
    price: "1.250",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1000&auto=format&fit=crop",
    size: "L"
  };

  return (
    <>
      {/* 1. KARARTMA PERDESİ (Overlay) */}
      {/* Sepet açıksa ekrana siyah perde iner, tıklayınca kapanır */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={toggleCart}
      />

      {/* 2. ÇEKMECE (Sidebar) */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-kapi-dark border-l border-white/10 z-[70] shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Başlık ve Kapat Butonu */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-black tracking-tighter text-white">SEPETİM (1)</h2>
          <button onClick={toggleCart} className="text-gray-400 hover:text-kapi-neon transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Ürün Listesi */}
        <div className="p-6 flex-1 overflow-y-auto h-[calc(100vh-250px)]">
          {/* Tekil Ürün Kartı */}
          <div className="flex gap-4 mb-6">
            <div className="relative w-20 h-24 bg-gray-900 rounded overflow-hidden flex-shrink-0">
              <Image src={cartItem.image} alt={cartItem.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-white font-bold text-sm">{cartItem.name}</h3>
                <button className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Beden: {cartItem.size}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-kapi-neon font-mono">{cartItem.price}₺</span>
                <div className="flex items-center border border-white/10 rounded">
                  <button className="px-2 py-1 text-gray-400 hover:text-white">-</button>
                  <span className="text-xs px-1">1</span>
                  <button className="px-2 py-1 text-gray-400 hover:text-white">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Kısım (Toplam ve Ödeme) */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-kapi-black border-t border-white/10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 uppercase text-xs tracking-wider">Ara Toplam</span>
            <span className="text-white font-bold text-xl">1.250₺</span>
          </div>
          <button className="w-full bg-kapi-neon text-black font-black py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors">
            ÖDEMEYE GEÇ <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </>
  );
}