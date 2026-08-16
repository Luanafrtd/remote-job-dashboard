import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [ROUTES.dashboard, ROUTES.profile, ROUTES.settings],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
