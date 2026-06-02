import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sirve AVIF/WebP automáticamente: las fotos (ej. CEO) bajan mucho de peso
  // sin tocar el JSX. Visualmente idéntico, carga más rápido.
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75, 90],
  },
  compress: true,
  // Tree-shaking agresivo de barrels (lucide-react importa decenas de íconos).
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
