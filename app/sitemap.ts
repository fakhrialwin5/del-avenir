import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://del-avenir.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/achievement", "/muhadhoroh", "/support"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  return routes;
}
