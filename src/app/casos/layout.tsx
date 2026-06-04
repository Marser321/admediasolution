import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Casos y resultados | AD Media Solution",
  description:
    "Explora casos y ejemplos de sistemas comerciales, CRM, pauta y soporte trabajados por AD Media Solution.",
  path: "/casos",
});

export default function CasosLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
