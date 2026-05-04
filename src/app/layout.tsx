import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

// Inter — Optimizada para lectura en pantalla
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://admediasolution.com"),
  title: "AD Media Solution | Arquitectura de Ingresos y CRM Experto",
  description:
    "Especialistas en ingeniería de ingresos para negocios de alto impacto. Combinamos IA avanzada con supervisión experta para escalar tu facturación.",
  keywords: [
    "marketing de resultados",
    "CRM automation",
    "GoHighLevel",
    "ingeniería de ingresos",
    "AD Media Solution",
    "Danger Fernandez",
    "automatización de ventas",
  ],
  authors: [{ name: "Danger Fernandez", url: "https://admediasolution.com" }],
  creator: "AD Media Solution",
  publisher: "AD Media Solution",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AD Media Solution | Arquitectura de Ingresos y CRM",
    description:
      "Transformamos tu infraestructura comercial con ingeniería de vanguardia. Resultados medibles, escalabilidad real.",
    url: "https://admediasolution.com",
    siteName: "AD Media Solution",
    locale: "es_US",
    type: "website",
    images: [
      {
        url: "/brand/logo-full.png",
        width: 1200,
        height: 630,
        alt: "AD Media Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AD Media Solution | Arquitectura de Ingresos",
    description: "Ingeniería de ingresos y automatización CRM para el mercado hispano en EE.UU.",
    images: ["/brand/logo-full.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="preload" href="/brand/logo-full-white.png" as="image" />
        <link rel="preload" href="/team/ceo.png" as="image" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/30 selection:text-white relative`}
      >
        <div className="bg-noise" />
        <CustomCursor />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
