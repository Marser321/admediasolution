import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  createRouteMetadata,
  serviceDetailMetadata,
  type ServiceDetailSlug,
} from "@/lib/seo";

interface ServiceDetailLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = serviceDetailMetadata[slug as ServiceDetailSlug];

  if (!item) {
    return createRouteMetadata({
      title: "Servicio no encontrado | AD Media Solution",
      description: "El servicio solicitado no está disponible en AD Media Solution.",
      path: `/servicios/${slug}`,
    });
  }

  return createRouteMetadata(item);
}

export default function ServiceDetailLayout({ children }: Readonly<ServiceDetailLayoutProps>) {
  return children;
}
