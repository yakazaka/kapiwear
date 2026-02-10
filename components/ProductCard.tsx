import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductProps {
  id: number;
  name: string;
  price: number; // Supabase'den sayı geldiği için number yaptım
  category: string;
  image: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  return (
    // KRİTİK GÜNCELLEME BURADA:
    // Tüm kartı Link içine aldık. Tıklayınca dinamik olarak /product/ID sayfasına gider.
    <Link 
      href={`/product/${product.id}`} 
      className="group block relative bg-kapi-dark border border-white/5 hover:border-kapi-neon/50 transition-all duration-300 rounded-xl overflow-hidden"
    >
      
      {/* Ürün Görseli */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        
        {/* Hover Efekti ile Gelen Sepet Butonu */}
        <button className="absolute bottom-4 right-4 bg-kapi-neon text-black p-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-bold hover:bg-white z-10 rounded-lg">
          <ShoppingCart size={20} />
        </button>
      </div>

      {/* Ürün Bilgileri */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-kapi-neon transition-colors">
          {product.name}
        </h3>
        <p className="text-kapi-neon font-mono text-xl font-bold">
          {product.price}₺
        </p>
      </div>
    </Link>
  );
} 