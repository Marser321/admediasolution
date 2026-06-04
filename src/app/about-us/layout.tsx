import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Sobre AD Media Solution | Historia y dirección comercial",
  description:
    "Historia de AD Media Solution, su evolución y enfoque en dirección de marketing, ventas, CRM, pauta digital y soporte para negocios.",
  path: "/about-us",
});

export default function AboutUsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
