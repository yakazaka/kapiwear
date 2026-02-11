"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tümü");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = [
    "Tümü", 
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))
  ];

  const filteredProducts = activeCategory === "Tümü" 
    ? products 
    : products.filter((p) => p.category === activeCategory);

  // Butona basınca ürünlere kaydırma fonksiyonu
  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      
      {/* --- 1. VİTRİN (HERO) BÖLÜMÜ (Geri Geldi!) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Arka Plan Görseli */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1551488852-7dd86cd96da2?q=80&w=2000&auto=format&fit=crop" 
            alt="Kapiwear Hero"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black z-10"></div>
        </div>

        {/* Vitrin Yazıları */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic">
            Sokağın <br/>
            <span className="text-kapi-neon">Ritmini</span> Yakala.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
            Karanlık, iddialı ve sadece kuralları kendi koyanlar için tasarlandı. Yeni sezon koleksiyonunu şimdi keşfet.
          </p>
          <button 
            onClick={scrollToProducts}
            className="bg-kapi-neon text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
          >
            KOLEKSİYONU KEŞFET
          </button>
        </div>
      </section>


      {/* --- 2. ÜRÜNLER VE KATEGORİ BÖLÜMÜ --- */}
      <section id="products-section" className="max-w-7xl mx-auto px-6 pt-24">
        
        {/* Başlık ve Filtreler Yan Yana */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            YENİ <span className="text-kapi-neon italic">SEZON</span>
          </h2>

          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-kapi-neon text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]" 
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Ürün Listesi */}
        {loading ? (
          <div className="text-center text-gray-500 animate-pulse mt-20 font-bold tracking-widest">
            SOKAĞIN RİTMİ YÜKLENİYOR...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
                
                {/* Resim Kutusu */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 mb-4 border border-white/5 group-hover:border-kapi-neon/50 transition-colors">
                  {product.image_url ? (
                    <Image 
                      src={product.image_url} 
                      alt={product.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">Görsel Yok</div>
                  )}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                    {product.category}
                  </div>
                </div>
                
                {/* İsim ve Fiyat */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-kapi-neon transition-colors line-clamp-1">{product.name}</h3>
                  </div>
                  <p className="text-xl font-black text-white">{product.price}₺</p>
                </div>
              </Link>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500">
                <p className="text-xl font-bold mb-2">Bu kategoride henüz ürün yok.</p>
                <button onClick={() => setActiveCategory("Tümü")} className="text-kapi-neon underline">
                  Tüm ürünlere dön
                </button>
              </div>
            )}
          </div>
        )}
      </section>

    </main>
  );
}