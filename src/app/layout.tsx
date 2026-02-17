import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

// Nexa se carga via CDNFonts en globals.css (Bold + Light)

// Inter — Limpia, legible, para body
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ad Media Solution | Estrategia y Tecnología",
  description:
    "Combinamos inteligencia artificial con supervisión experta para escalar tu negocio. Resultados reales, personas reales.",
  keywords: ["marketing", "IA", "estrategia", "publicidad", "agencia", "ad media solution"],
  openGraph: {
    title: "Ad Media Solution | Estrategia y Tecnología",
    description:
      "Combinamos inteligencia artificial con supervisión experta para escalar tu negocio. Resultados reales, personas reales.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-bg-deep text-text-primary selection:bg-accent-warm/30 selection:text-white`}
      >
        <div className="bg-noise" />
        <CustomCursor />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
