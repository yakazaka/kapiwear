"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Star, Check } from "lucide-react";
import { useCart } from "@/context/CartContext"; // <-- MOTORU BAĞLADIK

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  sizes: string[] | null;
}

export default function ProductView({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false); // Eklendi animasyonu için
  
  // Sepet motorunu çağırdık
  const { addToCart } = useCart();

  const availableSizes = Array.isArray(product.sizes) && product.sizes.length > 0
    ? product.sizes
    : ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Lütfen önce bir beden seçin! ⚠️");
      return;
    }

    // 1. Ürünü sepete fırlat
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    }, selectedSize);

    // 2. "Eklendi" animasyonunu tetikle
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // 2 saniye sonra normale dön
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      
      {/* SOL: Ürün Görseli */}
      <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 group">
        <Image 
          src={product.image_url} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute top-4 left-4 bg-kapi-black/80 backdrop-blur px-4 py-2 rounded-full border border-white/10">
          <span className="text-kapi-neon text-sm font-bold uppercase tracking-widest">
            {product.category}
          </span>
        </div>
      </div>

      {/* SAĞ: Detaylar */}
      <div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase leading-none">
          {product.name}
        </h1>
        
        <div className="flex items-center gap-4 mb-8">
          <span className="text-3xl font-bold text-kapi-neon">
            {product.price}₺
          </span>
          <div className="flex items-center gap-1 text-yellow-400 bg-white/5 px-3 py-1 rounded-lg">
            <Star size={16} fill="currentColor" />
            <span className="text-white font-bold text-sm">4.9</span>
          </div>
        </div>

        <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l-2 border-kapi-neon/50 pl-6">
          {product.description || "Açıklama yükleniyor..."}
        </p>

        {/* BEDEN SEÇİMİ */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-white">BEDEN SEÇ: <span className="text-kapi-neon ml-2">{selectedSize}</span></span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {availableSizes.map((size) => (
              <button 
                key={size} 
                onClick={() => setSelectedSize(size)}
                className={`min-w-[3.5rem] h-14 px-4 border rounded-xl flex items-center justify-center font-bold transition-all
                  ${selectedSize === size 
                    ? "bg-kapi-neon text-black border-kapi-neon scale-110 shadow-[0_0_15px_rgba(204,255,0,0.4)]" 
                    : "border-white/20 hover:border-kapi-neon hover:text-kapi-neon hover:bg-white/5"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sepete Ekle Butonu (Animasyonlu) */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full py-4 rounded-xl font-black text-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95
            ${isAdded 
              ? "bg-green-500 text-white cursor-default" 
              : "bg-white text-black hover:bg-kapi-neon hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            }`}
        >
          {isAdded ? (
            <>
              <Check size={24} />
              SEPETE EKLENDİ!
            </>
          ) : (
            <>
              <ShoppingBag size={22} />
              {selectedSize ? "SEPETE EKLE" : "BEDEN SEÇİNİZ"}
            </>
          )}
        </button>
        
        <p className="text-center text-gray-500 text-xs mt-6">
          🚚 Aynı gün kargo | 🛡️ Güvenli Ödeme
        </p>
      </div>
    </div>
  );
}