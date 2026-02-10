import Link from "next/link";
import { Instagram, Twitter, Facebook, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-kapi-black border-t border-white/10 pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* 1. KOLON: Marka & Slogan */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-3xl font-black tracking-tighter text-white block mb-6">
            KAPI<span className="text-kapi-neon">WEAR</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Sokak kültürünün global temsilcisi. 
            Sınırlı üretim, sınırsız özgürlük. 
            Est. 2026
          </p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-kapi-neon hover:text-black transition-all">
              <Instagram size={18} />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-kapi-neon hover:text-black transition-all">
              <Twitter size={18} />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-kapi-neon hover:text-black transition-all">
              <Facebook size={18} />
            </Link>
          </div>
        </div>

        {/* 2. KOLON: Hızlı Linkler */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">KOLEKSİYON</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-kapi-neon transition-colors">Yeni Gelenler</Link></li>
            <li><Link href="#" className="hover:text-kapi-neon transition-colors">Best Sellers</Link></li>
            <li><Link href="#" className="hover:text-kapi-neon transition-colors">Aksesuarlar</Link></li>
            <li><Link href="#" className="hover:text-kapi-neon transition-colors">İndirim</Link></li>
          </ul>
        </div>

        {/* 3. KOLON: Yardım */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">DESTEK</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-kapi-neon transition-colors">Sipariş Takibi</Link></li>
            <li><Link href="#" className="hover:text-kapi-neon transition-colors">İade & Değişim</Link></li>
            <li><Link href="#" className="hover:text-kapi-neon transition-colors">Beden Tablosu</Link></li>
            <li><Link href="#" className="hover:text-kapi-neon transition-colors">İletişim</Link></li>
          </ul>
        </div>

        {/* 4. KOLON: Bülten (Newsletter) */}
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">HABERDAR OL</h4>
          <p className="text-gray-400 text-sm mb-4">Yeni droplardan ilk senin haberin olsun.</p>
          <div className="flex relative">
            <input 
              type="email" 
              placeholder="E-posta adresin" 
              className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white focus:outline-none focus:border-kapi-neon transition-colors text-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-kapi-neon">
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Alt Çizgi: Telif Hakkı */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">
          © 2026 Kapıwear Inc. Tüm hakları saklıdır.
        </p>
        <div className="flex gap-6 text-xs text-gray-500">
          <Link href="#" className="hover:text-white">Gizlilik Politikası</Link>
          <Link href="#" className="hover:text-white">Kullanım Şartları</Link>
        </div>
      </div>
    </footer>
  );
}