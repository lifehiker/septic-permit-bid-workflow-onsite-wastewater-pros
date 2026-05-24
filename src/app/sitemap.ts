import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const routes = ["", "pricing", "login", "signup", ...Object.keys(seoPages)];
  return routes.map((route) => ({ url: `${base}/${route}`, lastModified: new Date() }));
}
