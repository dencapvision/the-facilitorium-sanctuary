import { MetadataRoute } from "next";

const BASE_URL = "https://facilitorium.denmasterfa.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/lms", "/tools", "/community", "/membership", "/join"],
        disallow: ["/admin", "/dashboard", "/api/", "/success"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
