"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, MoveLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  // Context'ten (Motordan) verileri ve fonksiyonları çekiyoruz
  const { cart, removeFromCart, addToCart, totalPrice } = useCart();

  // 1. Durum: Sepet Boşsa Gösterilecek Ekran
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white pt-32 pb-12 flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Trash2 size={40} className="text-gray-500" />
        </div>
        <h1 className="text-3xl font-black mb-2">SEPETİN BOŞ</h1>
        <p className="text-gray-400 mb-8">Henüz sokağın ritmini yakalamadın mı?</p>
        <Link 
          href="/" 
          className="bg-kapi-neon text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors flex items-center gap-2"
        >
          <MoveLeft size={20} />
          ALIŞVERİŞE BAŞLA
        </Link>
      </main>
    );
  }

  // 2. Durum: Sepet Doluysa Gösterilecek Ekran
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-black mb-12 tracking-tighter">SEPETİM ({cart.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* SOL TARAF: Ürün Listesi */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-6 p-4 border border-white/10 rounded-2xl bg-white/5 items-center">
                
                {/* Ürün Resmi */}
                <div className="relative w-24 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-800">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                {/* Ürün Bilgileri */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                      <p className="text-gray-400 text-sm">Beden: <span className="text-white font-bold">{item.size}</span></p>
                    </div>
                    {/* Silme Butonu */}
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-gray-500 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    {/* Adet Artırma / Azaltma */}
                    <div className="flex items-center gap-4 bg-black/50 rounded-lg p-1 border border-white/10">
                      <button 
                         // Adet 1'den büyükse azalt (-1 gönderiyoruz)
                         onClick={() => item.quantity > 1 && addToCart({ ...item }, item.size, -1)}
                         className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-gray-400 disabled:opacity-30"
                         disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span className="font-mono font-bold w-6 text-center">{item.quantity}</span>
                      
                      <button 
                        // Adet artır (+1 gönderiyoruz, varsayılan zaten +1'dir)
                        onClick={() => addToCart({ ...item }, item.size, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Toplam Fiyat */}
                    <p className="font-bold text-xl text-kapi-neon">{item.price * item.quantity}₺</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SAĞ TARAF: Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
              <h2 className="text-2xl font-black mb-6">SİPARİŞ ÖZETİ</h2>
              
              <div className="space-y-4 mb-8 text-gray-400">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="text-white">{totalPrice}₺</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo</span>
                  <span className="text-kapi-neon">ÜCRETSİZ</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between text-white text-xl font-bold">
                  <span>TOPLAM</span>
                  <span>{totalPrice}₺</span>
                </div>
              </div>

              {/* ÖDEMEYE GEÇ BUTONU */}
              <Link href="/checkout" className="w-full block">
                <button className="w-full bg-kapi-neon text-black py-4 rounded-xl font-black text-xl hover:bg-white transition-colors flex items-center justify-center gap-2 group">
                  ÖDEMEYE GEÇ
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <p className="text-center text-xs text-gray-500 mt-4">
                🔒 256-bit SSL ile güvenli ödeme
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}