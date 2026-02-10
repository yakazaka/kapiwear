import Image from "next/image";
import Link from "next/link";
import { MoveRight, Zap, Heart, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-kapi-black text-white pt-24 pb-12">
      
      {/* 1. HERO BÖLÜMÜ: Başlık ve Giriş */}
      <section className="relative px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-kapi-neon font-mono text-sm tracking-widest mb-4 uppercase">
            // Since 2026
          </p>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            BİZİM <span className="text-transparent bg-clip-text bg-gradient-to-r from-kapi-neon to-white">SOKAĞIMIZ.</span><br />
            BİZİM KURALLARIMIZ.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Kapıwear, plazalarda kravat düzeltenlerin değil, arka sokaklarda hayal kuranların markasıdır. 
          </p>
        </div>
      </section>

      {/* 2. HİKAYE BÖLÜMÜ (Sıla Balı Dokunuşu) */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
          <Image 
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1000&auto=format&fit=crop" 
            alt="Kapıwear Atölye" 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Neon Çerçeve Efekti */}
          <div className="absolute inset-0 border-2 border-kapi-neon/0 group-hover:border-kapi-neon/50 transition-all duration-500 rounded-2xl m-4" />
        </div>
        
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">DOĞAL. SAMİMİ. <br /><span className="text-kapi-neon">FİLTRESİZ.</span></h2>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            Her şey küçük bir odada, büyük hayallerle başladı. Biz modayı sadece giyinmek olarak görmüyoruz. Bizim için stil, sokağın gürültüsünde kendi sesini duyurma biçimidir.
          </p>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed border-l-4 border-kapi-neon pl-6 italic">
            "Ürünlerimiz fabrikasyon soğukluğunu değil, el emeğinin sıcaklığını taşır. Tıpkı Sıla Balı gibi; katkısız, doğal ve olduğu gibi. Yapmacık trendlere inat, gerçek olanın peşindeyiz."
          </p>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white">15K+</span>
              <span className="text-gray-500 text-sm">Mutlu Müşteri</span>
            </div>
            <div className="w-px bg-white/20 mx-4"></div>
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white">%100</span>
              <span className="text-gray-500 text-sm">Sokak Stili</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEĞERLERİMİZ */}
      <section className="bg-white/5 py-20 px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kart 1 */}
            <div className="bg-kapi-black p-8 border border-white/10 hover:border-kapi-neon transition-colors group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-kapi-neon mb-6 group-hover:bg-kapi-neon group-hover:text-black transition-colors">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Cesur Tasarımlar</h3>
              <p className="text-gray-400">Sıradan olana alerjimiz var. Her parça, kalabalıkta fark edilmen için tasarlandı.</p>
            </div>
            {/* Kart 2 */}
            <div className="bg-kapi-black p-8 border border-white/10 hover:border-kapi-neon transition-colors group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-kapi-neon mb-6 group-hover:bg-kapi-neon group-hover:text-black transition-colors">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Topluluk Odaklı</h3>
              <p className="text-gray-400">Biz sadece satıcı değiliz, aynı müziği dinleyen, aynı sokaklarda yürüyen bir aileyiz.</p>
            </div>
            {/* Kart 3 */}
            <div className="bg-kapi-black p-8 border border-white/10 hover:border-kapi-neon transition-colors group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-kapi-neon mb-6 group-hover:bg-kapi-neon group-hover:text-black transition-colors">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Tutku ve Kalite</h3>
              <p className="text-gray-400">Kumaşın dokusundan dikişin sağlamlığına kadar her detayda tutkumuz var.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION (Harekete Geçirici Mesaj) */}
      <section className="text-center px-6">
        <h2 className="text-4xl font-black mb-8">KAPIYI ARALA, İÇERİ GİR.</h2>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-kapi-neon text-black px-8 py-4 font-bold text-lg hover:bg-white transition-colors"
        >
          ALIŞVERİŞE BAŞLA <MoveRight />
        </Link>
      </section>

    </main>
  );
}