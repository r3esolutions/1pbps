import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jangir.in",
      lastModified: new Date(),
    },
    {
      url: "https://jangir.in/dedicated-servers",
      lastModified: new Date(),
    },
    {
      url: "https://jangir.in/locations",
      lastModified: new Date(),
    },
    {
      url: "https://jangir.in/usa-dedicated-servers",
      lastModified: new Date(),
    },
    {
      url: "https://jangir.in/germany-dedicated-servers",
      lastModified: new Date(),
    }
  ];
}
