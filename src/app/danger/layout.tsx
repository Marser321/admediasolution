import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Danger Fernández | Dirección comercial y marketing",
  description:
    "Conoce a Danger Fernández, fundador de AD Media Solution, y su enfoque de dirección comercial, marketing, CRM y sistemas de venta.",
  path: "/danger",
});

export default function DangerLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
