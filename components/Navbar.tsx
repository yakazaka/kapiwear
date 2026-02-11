"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const { cartCount, toggleCart } = useCart();
  
  // Mobil menünün açık/kapalı durumunu tuttuğumuz hafıza
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* 1. LOGO (Her zaman solda kalır) */}
        <Link href="/" className="text-2xl font-black tracking-tighter italic z-[60]">
          KAPI<span className="text-kapi-neon">WEAR</span>
        </Link>

        {/* 2. MASAÜSTÜ MENÜ (Telefonda "hidden" ile gizlenir, sadece bilgisayarda "md:flex" ile görünür) */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-300">
          <Link href="/" className="hover:text-kapi-neon transition-colors">Tüm Ürünler</Link>
          <Link href="/about" className="hover:text-kapi-neon transition-colors">Hikayemiz</Link>
          <Link href="/contact" className="hover:text-kapi-neon transition-colors">İletişim</Link>
        </div>

        {/* 3. SAĞ KISIM: Sepet ve Mobil Buton */}
        <div className="flex items-center gap-4 z-[60]">
          
          {/* Sepet Butonu (Her ekranda görünür) */}
          <button 
            onClick={toggleCart} 
            className="relative p-2 text-white hover:text-kapi-neon transition-colors"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-kapi-neon text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger / Çarpı Butonu (Sadece telefonda "md:hidden" ile görünür) */}
          <button 
            className="md:hidden p-2 text-white hover:text-kapi-neon transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- 4. MOBİL MENÜ EKRANI (Açıldığında tüm ekranı kaplar) --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-[55] flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-8 text-3xl font-black uppercase tracking-widest mt-10">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} // Tıklanınca menüyü kapat
              className="text-white hover:text-kapi-neon transition-colors"
            >
              Tüm Ürünler
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-kapi-neon transition-colors"
            >
              Hikayemiz
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-kapi-neon transition-colors"
            >
              İletişim
            </Link>
          </div>
          
          {/* Menü Alt Süsleme */}
          <div className="absolute bottom-12 text-gray-500 text-sm font-bold tracking-widest text-center">
            <span className="text-kapi-neon">Sokağın</span> Ritmini Yakala.
          </div>
        </div>
      )}
    </nav>
  );
}