"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Package, ShoppingBag, Trash2, Plus, CheckCircle, Clock, Lock, Upload, MessageSquare, Reply } from "lucide-react";
import toast from "react-hot-toast"; // Bildirimleri ekledik

export default function AdminPage() {
  const ADMIN_PASSWORD = "kapi"; 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "messages">("orders");
  
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); 

  // --- YANITLAMA (MAIL) STATE'LERİ ---
  const [replyingTo, setReplyingTo] = useState<any | null>(null); // Hangi mesaja cevap veriliyor?
  const [replyText, setReplyText] = useState(""); // Yazılan cevap
  const [isSendingMail, setIsSendingMail] = useState(false); // Mail gönderiliyor mu?

  const [newProduct, setNewProduct] = useState({
    name: "", description: "", price: "", category: "", sizes: "S, M, L, XL"
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      toast.error("Yanlış şifre reis! 🛑");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const { data: ordersData } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (ordersData) setOrders(ordersData);

    const { data: productsData } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (productsData) setProducts(productsData);

    const { data: messagesData } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (messagesData) setMessages(messagesData);
    
    setLoading(false);
  };

  // --- MAİL GÖNDERME FONKSİYONU ---
  const handleSendReply = async () => {
    if (!replyText.trim()) return toast.error("Boş mesaj gönderemezsin reis!");
    setIsSendingMail(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: replyingTo.email,
          subject: `KAPIWEAR - İletişim Mesajına Yanıt`,
          text: `Merhaba ${replyingTo.name},\n\nBize yazdığın mesaja istinaden:\n"${replyingTo.message}"\n\nYanıtımız:\n${replyText}\n\nSevgiler,\nKAPIWEAR Ekibi`,
        }),
      });

      if (!res.ok) throw new Error("Mail gönderilemedi. Sunucu ayarlarını (App Password) kontrol et.");

      toast.success("Cevap başarıyla mail olarak iletildi! 🚀");
      setReplyingTo(null); // Cevap kutusunu kapat
      setReplyText(""); // Yazıyı temizle
    } catch (error: any) {
      toast.error("Hata: " + error.message);
    } finally {
      setIsSendingMail(false);
    }
  };


  const handleAddProduct = async (e: any) => { /* Ürün Ekleme Kodları Birebir Aynı */ 
    e.preventDefault();
    if (!imageFile) return toast.error("Reis bir ürün görseli seçmelisin!");
    setUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, imageFile);
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(filePath);
      const sizesArray = newProduct.sizes.split(",").map(s => s.trim());
      const { error: dbError } = await supabase.from("products").insert([{
        name: newProduct.name, description: newProduct.description, price: Number(newProduct.price),
        image_url: publicUrlData.publicUrl, category: newProduct.category, sizes: sizesArray, is_featured: true
      }]);
      if (dbError) throw dbError;
      toast.success("Ürün eklendi! 🚀");
      setNewProduct({ name: "", description: "", price: "", category: "", sizes: "S, M, L, XL" });
      setImageFile(null);
      fetchData();
    } catch (error: any) { toast.error("Hata: " + error.message); } 
    finally { setUploading(false); }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Bu ürünü silmek istediğine emin misin?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error("Hata: " + error.message); else fetchData();
  };

  const handleUpdateOrderStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", id);
    if (error) toast.error("Hata: " + error.message); else fetchData();
  };

  const handleDeleteMessage = async (id: number) => {
    if (!window.confirm("Bu mesajı silmek istediğine emin misin?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast.error("Hata: " + error.message); else fetchData();
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-3xl border border-white/10 w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-kapi-neon/20 text-kapi-neon rounded-full flex items-center justify-center mx-auto mb-6"><Lock size={32} /></div>
          <h1 className="text-2xl font-black text-white mb-6 tracking-widest uppercase">Admin Girişi</h1>
          <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-center text-white mb-4 focus:border-kapi-neon outline-none" placeholder="Şifreyi giriniz" />
          <button type="submit" className="w-full bg-kapi-neon text-black py-4 rounded-xl font-bold hover:bg-white transition-colors">GİRİŞ YAP</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 overflow-x-auto pb-4 custom-scrollbar">
          <h1 className="text-4xl font-black tracking-tighter italic">KAPI<span className="text-kapi-neon">ADMIN</span></h1>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 min-w-max">
            <button onClick={() => setActiveTab("orders")} className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${activeTab === "orders" ? "bg-kapi-neon text-black" : "text-gray-400 hover:text-white"}`}><ShoppingBag size={20} /> SİPARİŞLER</button>
            <button onClick={() => setActiveTab("products")} className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${activeTab === "products" ? "bg-kapi-neon text-black" : "text-gray-400 hover:text-white"}`}><Package size={20} /> ÜRÜNLER</button>
            <button onClick={() => setActiveTab("messages")} className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${activeTab === "messages" ? "bg-kapi-neon text-black" : "text-gray-400 hover:text-white"}`}><MessageSquare size={20} /> MESAJLAR</button>
          </div>
        </div>

        {loading ? (<div className="text-center text-gray-500 mt-20 animate-pulse">Veriler yükleniyor reis...</div>) : (
          <>
            {activeTab === "orders" && ( /* SİPARİŞLER KISMI AYNEN DURUYOR */
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-black text-kapi-neon">#{order.id}</span>
                        <span className="text-lg font-bold">{order.customer_name}</span>
                        {order.status === 'kargolandi' ? (<span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={14}/> Kargolandı</span>) : (<span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={14}/> Bekliyor</span>)}
                      </div>
                      <p className="text-gray-400 text-sm max-w-md mb-3">📍 {order.address}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {order.items?.map((item: any, i: number) => (<span key={i} className="bg-black/50 px-3 py-1 rounded-lg text-xs border border-white/5">{item.quantity}x {item.name} ({item.size})</span>))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4 min-w-[150px]">
                      <span className="text-2xl font-black">{order.total_price}₺</span>
                      {order.status !== 'kargolandi' && (<button onClick={() => handleUpdateOrderStatus(order.id, 'kargolandi')} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-kapi-neon transition-colors w-full">Kargolandı İşaretle</button>)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "products" && ( /* ÜRÜNLER KISMI AYNEN DURUYOR */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.map((p) => (
                      <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 group">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-black border border-white/5"><Image src={p.image_url} alt={p.name} fill className="object-cover" /></div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm line-clamp-1 group-hover:text-kapi-neon transition-colors">{p.name}</h3>
                          <p className="text-gray-400 font-bold text-sm mt-1">{p.price}₺</p>
                        </div>
                        <button onClick={() => handleDeleteProduct(p.id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors"><Trash2 size={20} /></button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <form onSubmit={handleAddProduct} className="bg-white/5 border border-white/10 p-6 rounded-3xl sticky top-32">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-kapi-neon"><Plus size={24} /> Yeni Ürün Ekle</h2>
                    <div className="space-y-4">
                      <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 border-dashed relative overflow-hidden group hover:border-kapi-neon/50 transition-colors">
                        <Upload size={24} className="text-gray-400 group-hover:text-kapi-neon transition-colors" />
                        <span className="text-sm text-gray-400 font-bold group-hover:text-white">Görsel Seç</span>
                        <input id="imageUpload" type="file" accept="image/*" required onChange={(e) => { if (e.target.files && e.target.files.length > 0) setImageFile(e.target.files[0]); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        {imageFile && <span className="text-xs text-kapi-neon mt-2">{imageFile.name}</span>}
                      </div>
                      <input required placeholder="Ürün Adı" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-kapi-neon outline-none text-sm" />
                      <input required type="number" placeholder="Fiyat (₺)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-kapi-neon outline-none text-sm" />
                      <input required placeholder="Kategori" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-kapi-neon outline-none text-sm" />
                      <input required placeholder="Bedenler" value={newProduct.sizes} onChange={e => setNewProduct({...newProduct, sizes: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-kapi-neon outline-none text-sm" />
                      <textarea required placeholder="Açıklama" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-kapi-neon outline-none text-sm" />
                      <button type="submit" disabled={uploading} className="w-full bg-kapi-neon text-black font-bold py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50">{uploading ? "YÜKLENİYOR..." : "ÜRÜNÜ KAYDET"}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* --- MESAJLAR SEKMESİ (GÜNCELLENDİ) --- */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group hover:border-white/20 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-kapi-neon">{msg.name}</h3>
                          <a href={`mailto:${msg.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">{msg.email}</a>
                        </div>
                        <span className="text-xs text-gray-500 font-medium bg-black/50 px-2 py-1 rounded-md">
                          {new Date(msg.created_at).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm bg-black/50 p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed mb-4">
                        {msg.message}
                      </p>
                      
                      {/* CEVAPLA VE SİL BUTONLARI */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setReplyingTo(replyingTo?.id === msg.id ? null : msg)}
                          className="flex items-center gap-2 bg-white/10 hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                        >
                          <Reply size={16} /> Cevapla
                        </button>
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)} 
                          className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* YANITLAMA KUTUSU (Tıklanınca Açılır) */}
                      {replyingTo?.id === msg.id && (
                        <div className="mt-4 bg-black/50 p-4 rounded-xl border border-kapi-neon/50">
                          <textarea 
                            autoFocus
                            placeholder={`${msg.name} kişisine mail yanıtı yaz...`}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={4}
                            className="w-full bg-transparent border-none outline-none text-sm text-white resize-none mb-3"
                          />
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setReplyingTo(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">İptal</button>
                            <button 
                              onClick={handleSendReply}
                              disabled={isSendingMail}
                              className="px-6 py-2 bg-kapi-neon text-black font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                            >
                              {isSendingMail ? "Gönderiliyor..." : "Maili Gönder"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {messages.length === 0 && (
                    <div className="col-span-full text-center py-20 text-gray-500 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                      <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="text-xl font-bold mb-2">Gelen Kutusu Boş</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}