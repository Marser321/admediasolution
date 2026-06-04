import type { Metadata } from "next";

export const SITE_URL = "https://admediasolution.com";

const defaultOgImage = {
  url: "/brand/logo-full.png",
  width: 1200,
  height: 630,
  alt: "AD Media Solution",
};

type RobotsConfig = NonNullable<Metadata["robots"]>;

interface RouteMetadataInput {
  title: string;
  description: string;
  path: string;
  robots?: RobotsConfig;
}

export const defaultRobots: RobotsConfig = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const noindexRobots: RobotsConfig = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function createRouteMetadata({
  title,
  description,
  path,
  robots = defaultRobots,
}: RouteMetadataInput): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AD Media Solution",
      locale: "es_US",
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
    robots,
  };
}

export const serviceDetailMetadata = {
  "embudos-neurales": {
    title: "AD Media CRM y soporte | Sistema de ventas a medida",
    description:
      "CRM personalizado para centralizar clientes, automatizar seguimiento, organizar citas y dar soporte al sistema comercial de tu negocio.",
    path: "/servicios/embudos-neurales",
  },
  "contenido-generativo": {
    title: "Dirección de marketing y pauta digital | AD Media Solution",
    description:
      "Dirección de marketing para coordinar Meta Ads, Google Ads, redes sociales y contenido con una estrategia comercial clara y medible.",
    path: "/servicios/contenido-generativo",
  },
  "ads-autopilot": {
    title: "Soporte y mantenimiento comercial | AD Media Solution",
    description:
      "Soporte y mantenimiento para CRM, web, campañas y sistemas comerciales, con seguimiento operativo para que el negocio no pierda continuidad.",
    path: "/servicios/ads-autopilot",
  },
} as const;

export type ServiceDetailSlug = keyof typeof serviceDetailMetadata;
