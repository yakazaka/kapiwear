import { notFound } from "next/navigation";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ProductView from "@/components/ProductView"; // Yeni bileşeni çağırıyoruz

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { id } = await params;

  // Veriyi Supabase'den çek (Server tarafında)
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-kapi-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Geri Dön Butonu */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <MoveLeft size={20} />
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Tüm interaktif işleri bu bileşen yapacak */}
        <ProductView product={product} />

      </div>
    </main>
  );
}