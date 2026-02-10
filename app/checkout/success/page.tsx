"use client";

import Link from "next/link";
import { CheckCircle, MoveRight } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { cart } = useCart();

  // Bu sayfaya gelindiğinde, eğer sepet temizleme fonksiyonun varsa burada çağırabilirsin.
  // Ama biz Checkout sayfasında localStorage'ı sildik, o yüzden gerek kalmayabilir.

  return (
    <main className="min-h-screen bg-kapi-black text-white flex flex-col items-center justify-center text-center px-6">
      
      {/* Animasyonlu Tik İşareti */}
      <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <CheckCircle size={64} className="text-green-500" />
      </div>

      <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
        SİPARİŞ ALINDI!
      </h1>
      
      <p className="text-gray-400 text-xl max-w-md mb-12">
        Sokağın ritmine ayak uydurduğun için teşekkürler. Siparişin hazırlanmaya başladı bile.
      </p>

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-12 w-full max-w-md">
        <p className="text-sm text-gray-500 mb-2">TAHMİNİ TESLİMAT</p>
        <p className="text-2xl font-bold text-white">2 - 4 İş Günü</p>
      </div>

      <Link 
        href="/" 
        className="bg-kapi-neon text-black px-10 py-5 rounded-xl font-black text-xl hover:bg-white transition-colors flex items-center gap-3 group"
      >
        ALIŞVERİŞE DÖN
        <MoveRight className="group-hover:translate-x-2 transition-transform" />
      </Link>

    </main>
  );
}