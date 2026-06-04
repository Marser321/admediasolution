import type { ReactNode } from "react";
import { createRouteMetadata, noindexRobots } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Galería interna de logos | AD Media Solution",
  description: "Galería interna para revisión de candidatos de logo de AD Media Solution.",
  path: "/logos",
  robots: noindexRobots,
});

export default function LogosLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
