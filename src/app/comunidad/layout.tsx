import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Comunidad y workshops | AD Media Solution",
  description:
    "Comunidad, workshops y recursos para negocios que quieren aprender sobre CRM, pauta digital, contenido y sistemas comerciales.",
  path: "/comunidad",
});

export default function ComunidadLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
