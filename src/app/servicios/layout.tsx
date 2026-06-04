import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Servicios de marketing, CRM y ventas | AD Media Solution",
  description:
    "Conoce los servicios de AD Media Solution: CRM personalizado, soporte, Meta y Google Ads, redes sociales, producción, desarrollo web y mantenimiento.",
  path: "/servicios",
});

export default function ServiciosLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
