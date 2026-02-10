"use client"; // Hook kullandığımız için client component olmalı

import Link from "next/link";
import { ShoppingBag, User, Search, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Motoru çağırdık

export default function Navbar() {
  // Sepette kaç ürün var bilgisini çekiyoruz
  const { cartCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter italic">
          KAPI<span className="text-kapi-neon">WEAR</span>
        </Link>

        {/* Menü Linkleri (Masaüstü) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wider">
          <Link href="/" className="hover:text-kapi-neon transition-colors">KOLEKSİYON</Link>
          <Link href="/" className="hover:text-kapi-neon transition-colors">HİKAYEMİZ</Link>
          <Link href="/" className="hover:text-kapi-neon transition-colors">İLETİŞİM</Link>
        </div>

        {/* İkonlar */}
        <div className="flex items-center gap-6">
          <button className="hover:text-kapi-neon transition-colors">
            <Search size={22} />
          </button>
          
          <button className="hover:text-kapi-neon transition-colors">
            <User size={22} />
          </button>

          {/* Sepet İkonu ve Sayaç */}
          <Link href="/cart" className="relative group">
            <ShoppingBag size={22} className="group-hover:text-kapi-neon transition-colors" />
            
            {/* Eğer sepette ürün varsa bu kırmızı topu göster */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-kapi-neon text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobil Menü Butonu */}
          <button className="md:hidden hover:text-kapi-neon transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}