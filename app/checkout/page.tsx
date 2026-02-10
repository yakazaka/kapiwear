"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Next.js Image component

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // Kartın dönme durumu

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cardName: "",
    cardNumber: "",
    cardMonth: "Ay",
    cardYear: "Yıl",
    cardCvc: "",
  });

  // Input değişimlerini yakala ve formatla
  const handleChange = (e: any) => {
    let { name, value } = e.target;

    // Kart numarası formatlama (0000 0000 0000 0000)
    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16); // Sadece rakam ve max 16 hane
      value = value.replace(/(\d{4})/g, "$1 ").trim(); // 4'lü boşluk
    }
    
    // CVC sadece rakam ve 3 hane
    if (name === "cardCvc") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData({ ...formData, [name]: value });
  };

  // CVC'ye odaklanınca kartı çevir
  const handleFocus = (e: any) => {
    if (e.target.name === "cardCvc") {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  };

  // SİPARİŞİ TAMAMLA
  const handleOrder = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Basit Validasyon
    if (!formData.name || !formData.address || formData.cardNumber.length < 19 || !formData.cardCvc) {
      alert("Lütfen tüm alanları eksiksiz doldurun.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('orders').insert([
      {
        customer_name: formData.name,
        address: formData.address,
        total_price: totalPrice,
        items: cart,
        status: 'siparis_alindi'
      }
    ]);

    if (error) {
      alert("Hata: " + error.message);
      setLoading(false);
    } else {
      localStorage.removeItem("kapiCart");
      window.location.href = "/checkout/success";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* SOL TARAF: FORM VE KART ALANI */}
        <div>
          <h1 className="text-4xl font-black mb-12 tracking-tighter">ÖDEME EKRANI</h1>

          {/* --- CANLI KART GÖRSELİ (CodePen Uyarlaması) --- */}
          <div className="relative w-full max-w-sm mx-auto h-56 mb-12 perspective-1000 group">
            <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
              
              {/* KART ÖN YÜZ */}
              <div className="absolute w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/10 rounded-2xl p-6 shadow-2xl backface-hidden flex flex-col justify-between overflow-hidden">
                {/* Arkaplan Efekti */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-kapi-neon/20 rounded-full blur-3xl"></div>
                
                <div className="flex justify-between items-start">
                  {/* Çip Resmi */}
                  <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-lg opacity-80 border border-yellow-600 relative overflow-hidden">
                    <div className="absolute top-1/2 w-full h-[1px] bg-black/30"></div>
                    <div className="absolute left-1/2 h-full w-[1px] bg-black/30"></div>
                  </div>
                  <span className="font-bold italic text-white/50 text-xl tracking-widest">VISA</span>
                </div>

                <div className="mt-4">
                  <p className="font-mono text-2xl tracking-widest text-white shadow-black drop-shadow-md">
                    {formData.cardNumber || "#### #### #### ####"}
                  </p>
                </div>

                <div className="flex justify-between items-end text-sm uppercase text-gray-400">
                  <div>
                    <p className="text-[10px] mb-1">Kart Sahibi</p>
                    <p className="text-white font-bold tracking-wider max-w-[180px] truncate">
                      {formData.cardName || "İSİM SOYİSİM"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] mb-1 text-right">SKT</p>
                    <p className="text-white font-bold tracking-wider">
                      {formData.cardMonth} / {formData.cardYear.slice(-2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* KART ARKA YÜZ */}
              <div className="absolute w-full h-full bg-gradient-to-bl from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl backface-hidden rotate-y-180 overflow-hidden">
                 <div className="w-full h-12 bg-black mt-6 opacity-80"></div>
                 <div className="p-6">
                    <p className="text-right text-xs text-gray-400 mb-1">CVC</p>
                    <div className="w-full bg-white text-black font-mono font-bold text-right pr-3 py-2 rounded">
                      {formData.cardCvc || "***"}
                    </div>
                    <div className="mt-8 flex justify-center opacity-50">
                        <span className="text-4xl font-black italic text-white/20">KAPIWEAR</span>
                    </div>
                 </div>
              </div>

            </div>
          </div>
          {/* --- KART BİTİŞ --- */}


          {/* FORM ALANI */}
          <form onSubmit={handleOrder} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
            
            {/* Kişisel Bilgiler */}
            <div className="space-y-4">
              <h3 className="text-sm text-kapi-neon font-bold uppercase tracking-widest mb-4">Teslimat Bilgileri</h3>
              <div className="grid grid-cols-1 gap-4">
                <input 
                  name="name" required onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon focus:outline-none text-white placeholder:text-gray-600" 
                  placeholder="Ad Soyad"
                />
                <textarea 
                  name="address" required onChange={handleChange} rows={2}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon focus:outline-none text-white placeholder:text-gray-600" 
                  placeholder="Teslimat Adresi"
                />
              </div>
            </div>

            {/* Kart Bilgileri */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-sm text-kapi-neon font-bold uppercase tracking-widest mb-4">Kart Bilgileri</h3>
              
              <input 
                name="cardNumber" maxLength={19} required onChange={handleChange} onFocus={handleFocus}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon focus:outline-none font-mono text-lg" 
                placeholder="Kart Numarası"
              />

              <input 
                name="cardName" required onChange={handleChange} onFocus={handleFocus}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon focus:outline-none uppercase" 
                placeholder="Kart Üzerindeki İsim"
              />

              <div className="flex gap-4">
                <div className="w-1/2 flex gap-2">
                  <select name="cardMonth" onChange={handleChange} onFocus={handleFocus} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon outline-none cursor-pointer">
                    <option value="" disabled>Ay</option>
                    {[...Array(12)].map((_, i) => <option key={i} value={i + 1 < 10 ? `0${i+1}` : i+1}>{i + 1 < 10 ? `0${i+1}` : i+1}</option>)}
                  </select>
                  <select name="cardYear" onChange={handleChange} onFocus={handleFocus} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon outline-none cursor-pointer">
                    <option value="" disabled>Yıl</option>
                    {[...Array(10)].map((_, i) => <option key={i} value={2024 + i}>{2024 + i}</option>)}
                  </select>
                </div>
                
                <input 
                  name="cardCvc" maxLength={3} required onChange={handleChange} onFocus={handleFocus}
                  className="w-1/2 bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon focus:outline-none font-mono text-center tracking-widest" 
                  placeholder="CVC"
                />
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-kapi-neon text-black py-4 rounded-xl font-black text-xl hover:bg-white transition-colors flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "İŞLENİYOR..." : `ÖDEMEYİ TAMAMLA (${totalPrice}₺)`}
            </button>
          </form>
        </div>

        {/* SAĞ TARAF: SEPET ÖZETİ */}
        <div className="hidden lg:block bg-white/5 p-8 rounded-3xl border border-white/10 sticky top-32">
          <h3 className="font-bold text-xl mb-6 flex justify-between items-center">
            <span>SEPETİM</span>
            <span className="text-sm bg-white/10 px-3 py-1 rounded-full">{cart.length} Ürün</span>
          </h3>
          
          <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center bg-black/40 p-3 rounded-xl border border-white/5">
                <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold leading-tight">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">Beden: {item.size}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">{item.quantity} Adet</span>
                    <span className="font-bold text-kapi-neon">{item.price * item.quantity}₺</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 space-y-2">
            <div className="flex justify-between text-gray-400">
              <span>Ara Toplam</span>
              <span>{totalPrice}₺</span>
            </div>
            <div className="flex justify-between text-kapi-neon">
              <span>Kargo</span>
              <span>ÜCRETSİZ</span>
            </div>
            <div className="flex justify-between text-2xl font-black text-white pt-4">
              <span>TOPLAM</span>
              <span>{totalPrice}₺</span>
            </div>
          </div>
        </div>

      </div>

      {/* CSS Helper for 3D Transform (Sayfa altına ekleyebilirsin veya global.css'e) */}
      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </main>
  );
}