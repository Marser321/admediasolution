import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Agenda una consulta estratégica | AD Media Solution",
  description:
    "Agenda una consulta gratuita para revisar tu situación comercial y entender qué sistema de marketing, CRM, pauta o soporte necesita tu negocio.",
  path: "/planificacion",
});

export default function PlanificacionLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
