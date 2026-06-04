import type { MetadataRoute } from "next";
import { absoluteUrl, serviceDetailMetadata } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/servicios",
  "/planificacion",
  "/danger",
  "/casos",
  "/equipo",
  "/comunidad",
  "/about-us",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const serviceRoutes = Object.values(serviceDetailMetadata).map((item) => item.path);

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/planificacion" ? 0.9 : 0.7,
  }));
}
