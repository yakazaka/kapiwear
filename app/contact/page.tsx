"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase"; // Supabase'i dahil ettik

export default function Contact() {
  // Formdaki bilgileri tutacağımız hafıza
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false); // Gönderiliyor durumu

  // Gönder Butonuna Basıldığında Çalışacak Fonksiyon
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Supabase'e veriyi gönder
    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      ]);

    if (error) {
      toast.error("Gönderilemedi: " + error.message);
    } else {
      toast.success("Mesajın bize ulaştı reis! En kısa sürede döneceğiz.");
      // Formu temizle
      setFormData({ name: "", email: "", message: "" });
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic text-center">
          BİZE <span className="text-kapi-neon">ULAŞ</span>
        </h1>
        <p className="text-gray-400 text-center mb-12">Sorun mu var? İş birliği mi yapmak istiyorsun? Çekinme, yaz.</p>
        
        <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              required 
              type="text" 
              placeholder="Adın Soyadın" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon outline-none text-white transition-colors" 
            />
            <input 
              required 
              type="email" 
              placeholder="E-Posta Adresin" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon outline-none text-white transition-colors" 
            />
          </div>
          <textarea 
            required 
            placeholder="Mesajın..." 
            rows={5} 
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-kapi-neon outline-none text-white transition-colors"
          ></textarea>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-kapi-neon text-black font-bold py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 flex justify-center items-center"
          >
            {isSubmitting ? "GÖNDERİLİYOR..." : "MESAJI GÖNDER"}
          </button>
        </form>
      </div>
    </main>
  );
}