import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Senkronize çalışan Context ve Bileşenlerimiz
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/context/CartSidebar"; 
import Footer from "@/components/Footer"; // YENİ EKLENDİ: Footer Bileşeni
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KAPIWEAR | Streetwear Culture",
  description: "Sokağın ritmini yakala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      {/* Footer'ın sayfa kısayken bile en altta kalması için flex ve min-h-screen ekledik */}
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <CartProvider>
          {/* BİLDİRİM MOTORU */}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0a0a0a',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontWeight: 'bold',
              },
              success: {
                iconTheme: {
                  primary: '#ccff00', 
                  secondary: '#000',
                },
              },
            }}
          />
          
          {/* SİTE ANA BİLEŞENLERİ */}
          <Navbar />
          <CartSidebar />
          
          {/* Sayfa İçerikleri: flex-grow vererek kalan tüm boşluğu kaplamasını ve Footer'ı en alta itmesini sağladık */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* FOOTER EN ALTA EKLENDİ */}
          <Footer />

        </CartProvider>
      </body>
    </html>
  );
}