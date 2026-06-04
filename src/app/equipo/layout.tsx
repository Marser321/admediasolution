import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Equipo de marketing, CRM y producción | AD Media Solution",
  description:
    "Conoce el equipo y las áreas de AD Media Solution: dirección, marketing, CRM, desarrollo web, producción audiovisual y soporte comercial.",
  path: "/equipo",
});

export default function EquipoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
