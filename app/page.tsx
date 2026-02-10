import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase"; // Bağlantıyı çağırdık

// Bu fonksiyon sunucuda çalışır ve verileri çeker
async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true) // Sadece vitrin ürünlerini (featured) getir
    .order('created_at', { ascending: false }); // En yeniler üste

  if (error) {
    console.error('Supabase hatası:', error);
    return [];
  }
  return data;
}

export default async function Home() {
  const products = await getProducts(); // Verileri bekle

  return (
    <main className="min-h-screen bg-kapi-black text-white">
      
      {/* HERO SECTION (Sabit Kalabilir) */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1000&auto=format&fit=crop" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-40 hover:scale-105 transition-transform duration-[2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kapi-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 animate-fade-in-up">
            KAPI<span className="text-kapi-neon">WEAR</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
            SOKAĞIN SESİ. <span className="text-kapi-neon font-bold">SENİN TARZIN.</span>
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-10 py-4 font-bold text-lg hover:bg-kapi-neon transition-colors duration-300 skew-x-[-10deg]">
              KOLEKSİYONU GÖR
            </button>
            <Link href="/about" className="border border-white/20 px-10 py-4 font-bold text-lg hover:bg-white/10 transition-colors duration-300 flex items-center justify-center text-white">
               HİKAYEMİZ
            </Link>
          </div>
        </div>
      </section>

      {/* ÜRÜN VİTRİNİ (DATABASE'DEN GELİYOR) */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-2">YENİ GELENLER</h2>
            <p className="text-gray-500">Sınırlı sayıda üretilen parçalar.</p>
          </div>
          <Link href="/collection" className="text-kapi-neon font-bold hover:text-white transition-colors">
            Tümünü Gör →
          </Link>
        </div>

        {/* EĞER ÜRÜN YOKSA UYARI VER */}
        {products?.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>Henüz vitrine ürün eklenmedi.</p>
            <p className="text-xs mt-2">(Supabase'den ürün eklemeyi unutma!)</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.map((item) => (
              <ProductCard 
                key={item.id} 
                product={{
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  category: item.category,
                  image: item.image_url // Veritabanındaki sütun adı image_url
                }} 
              />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}